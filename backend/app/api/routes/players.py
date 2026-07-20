from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.database import get_db
from app.models.player import Player
from app.models.team import Team
from app.models.prediction import GoldenBootPrediction, GoldenGlovePrediction
from app.models.user import User
from app.schemas.player import (
    PlayerResponse,
    PlayerWithTeam,
    GoldenBootPredictionCreate,
    GoldenBootPredictionResponse,
    GoldenGlovePredictionCreate,
    GoldenGlovePredictionResponse,
    PlayerStats
)
from app.api.dependencies import get_current_user


router = APIRouter(prefix="/players", tags=["Players"])


@router.get("/", response_model=List[PlayerWithTeam])
async def get_players(
    position: Optional[str] = Query(None, description="Filter by position (Forward, Midfielder, Defender, Goalkeeper)"),
    team_id: Optional[int] = Query(None, description="Filter by team ID"),
    limit: Optional[int] = Query(50, ge=1, le=200, description="Number of players to return"),
    offset: Optional[int] = Query(0, ge=0, description="Number of players to skip"),
    db: Session = Depends(get_db)
):
    """Get all players with optional filters"""
    query = db.query(Player)
    
    if position:
        query = query.filter(Player.position == position)
    
    if team_id:
        query = query.filter(Player.team_id == team_id)
    
    players = query.offset(offset).limit(limit).all()
    
    # Add team details
    result = []
    for player in players:
        team = db.query(Team).filter(Team.id == player.team_id).first()
        player_dict = {
            "id": player.id,
            "name": player.name,
            "team_id": player.team_id,
            "position": player.position,
            "age": player.age,
            "club": player.club,
            "goals_per_90": player.goals_per_90,
            "xg_season": player.xg_season,
            "shots_per_game": player.shots_per_game,
            "save_percentage": player.save_percentage,
            "xg_prevented": player.xg_prevented,
            "clean_sheet_percentage": player.clean_sheet_percentage,
            "team_name": team.name if team else None,
            "team_code": team.code if team else None,
            "flag_url": team.flag_url if team else None
        }
        result.append(PlayerWithTeam(**player_dict))
    
    return result


@router.get("/forwards", response_model=List[PlayerStats])
async def get_top_forwards(
    limit: int = Query(20, ge=1, le=50, description="Number of forwards to return"),
    db: Session = Depends(get_db)
):
    """Get top forwards for Golden Boot prediction"""
    forwards = db.query(Player).filter(
        Player.position == "Forward"
    ).order_by(
        Player.goals_per_90.desc().nullslast()
    ).limit(limit).all()
    
    result = []
    for player in forwards:
        team = db.query(Team).filter(Team.id == player.team_id).first()
        player_with_team = PlayerWithTeam(
            id=player.id,
            name=player.name,
            team_id=player.team_id,
            position=player.position,
            age=player.age,
            club=player.club,
            goals_per_90=player.goals_per_90,
            xg_season=player.xg_season,
            shots_per_game=player.shots_per_game,
            save_percentage=player.save_percentage,
            xg_prevented=player.xg_prevented,
            clean_sheet_percentage=player.clean_sheet_percentage,
            team_name=team.name if team else None,
            team_code=team.code if team else None,
            flag_url=team.flag_url if team else None
        )
        
        # Mock prediction (replace with ML model later)
        predicted_goals = player.goals_per_90 * 7 if player.goals_per_90 else 3.5  # Assume 7 matches
        confidence = min(95.0, (player.goals_per_90 or 0.5) * 100)
        
        result.append(PlayerStats(
            player=player_with_team,
            predicted_goals=round(predicted_goals, 1),
            prediction_confidence=round(confidence, 1)
        ))
    
    return result


@router.get("/goalkeepers", response_model=List[PlayerStats])
async def get_top_goalkeepers(
    limit: int = Query(20, ge=1, le=50, description="Number of goalkeepers to return"),
    db: Session = Depends(get_db)
):
    """Get top goalkeepers for Golden Glove prediction"""
    goalkeepers = db.query(Player).filter(
        Player.position == "Goalkeeper"
    ).order_by(
        Player.save_percentage.desc().nullslast()
    ).limit(limit).all()
    
    result = []
    for player in goalkeepers:
        team = db.query(Team).filter(Team.id == player.team_id).first()
        player_with_team = PlayerWithTeam(
            id=player.id,
            name=player.name,
            team_id=player.team_id,
            position=player.position,
            age=player.age,
            club=player.club,
            goals_per_90=player.goals_per_90,
            xg_season=player.xg_season,
            shots_per_game=player.shots_per_game,
            save_percentage=player.save_percentage,
            xg_prevented=player.xg_prevented,
            clean_sheet_percentage=player.clean_sheet_percentage,
            team_name=team.name if team else None,
            team_code=team.code if team else None,
            flag_url=team.flag_url if team else None
        )
        
        # Mock prediction (replace with ML model later)
        predicted_saves = float(player.save_percentage or 70.0) * 0.5  # Mock calculation
        confidence = min(95.0, float(player.save_percentage or 70.0))
        
        result.append(PlayerStats(
            player=player_with_team,
            predicted_saves=round(predicted_saves, 1),
            prediction_confidence=round(confidence, 1)
        ))
    
    return result


@router.post("/golden-boot/predict", response_model=GoldenBootPredictionResponse, status_code=status.HTTP_201_CREATED)
async def predict_golden_boot(
    prediction_data: GoldenBootPredictionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create or update Golden Boot prediction"""
    # Verify player exists and is a forward
    player = db.query(Player).filter(Player.id == prediction_data.player_id).first()
    if not player:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Player not found"
        )
    
    if player.position != "Forward":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Selected player must be a forward"
        )
    
    # Check if prediction already exists
    existing = db.query(GoldenBootPrediction).filter(
        GoldenBootPrediction.user_id == current_user.id
    ).first()
    
    if existing:
        existing.player_id = prediction_data.player_id
        db.commit()
        db.refresh(existing)
        prediction = existing
    else:
        new_prediction = GoldenBootPrediction(
            user_id=current_user.id,
            player_id=prediction_data.player_id
        )
        db.add(new_prediction)
        db.commit()
        db.refresh(new_prediction)
        prediction = new_prediction
    
    # Get team info
    team = db.query(Team).filter(Team.id == player.team_id).first()
    
    return GoldenBootPredictionResponse(
        id=prediction.id,
        user_id=prediction.user_id,
        player_id=prediction.player_id,
        player_name=player.name,
        team_name=team.name if team else None,
        created_at=prediction.created_at,
        updated_at=prediction.updated_at
    )


@router.post("/golden-glove/predict", response_model=GoldenGlovePredictionResponse, status_code=status.HTTP_201_CREATED)
async def predict_golden_glove(
    prediction_data: GoldenGlovePredictionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create or update Golden Glove prediction"""
    # Verify player exists and is a goalkeeper
    player = db.query(Player).filter(Player.id == prediction_data.player_id).first()
    if not player:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Player not found"
        )
    
    if player.position != "Goalkeeper":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Selected player must be a goalkeeper"
        )
    
    # Check if prediction already exists
    existing = db.query(GoldenGlovePrediction).filter(
        GoldenGlovePrediction.user_id == current_user.id
    ).first()
    
    if existing:
        existing.player_id = prediction_data.player_id
        db.commit()
        db.refresh(existing)
        prediction = existing
    else:
        new_prediction = GoldenGlovePrediction(
            user_id=current_user.id,
            player_id=prediction_data.player_id
        )
        db.add(new_prediction)
        db.commit()
        db.refresh(new_prediction)
        prediction = new_prediction
    
    # Get team info
    team = db.query(Team).filter(Team.id == player.team_id).first()
    
    return GoldenGlovePredictionResponse(
        id=prediction.id,
        user_id=prediction.user_id,
        player_id=prediction.player_id,
        player_name=player.name,
        team_name=team.name if team else None,
        created_at=prediction.created_at,
        updated_at=prediction.updated_at
    )


@router.get("/golden-boot/my-prediction", response_model=Optional[GoldenBootPredictionResponse])
async def get_my_golden_boot_prediction(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get current user's Golden Boot prediction"""
    prediction = db.query(GoldenBootPrediction).filter(
        GoldenBootPrediction.user_id == current_user.id
    ).first()
    
    if not prediction:
        return None
    
    player = db.query(Player).filter(Player.id == prediction.player_id).first()
    team = db.query(Team).filter(Team.id == player.team_id).first() if player else None
    
    return GoldenBootPredictionResponse(
        id=prediction.id,
        user_id=prediction.user_id,
        player_id=prediction.player_id,
        player_name=player.name if player else None,
        team_name=team.name if team else None,
        created_at=prediction.created_at,
        updated_at=prediction.updated_at
    )


@router.get("/golden-glove/my-prediction", response_model=Optional[GoldenGlovePredictionResponse])
async def get_my_golden_glove_prediction(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get current user's Golden Glove prediction"""
    prediction = db.query(GoldenGlovePrediction).filter(
        GoldenGlovePrediction.user_id == current_user.id
    ).first()
    
    if not prediction:
        return None
    
    player = db.query(Player).filter(Player.id == prediction.player_id).first()
    team = db.query(Team).filter(Team.id == player.team_id).first() if player else None
    
    return GoldenGlovePredictionResponse(
        id=prediction.id,
        user_id=prediction.user_id,
        player_id=prediction.player_id,
        player_name=player.name if player else None,
        team_name=team.name if team else None,
        created_at=prediction.created_at,
        updated_at=prediction.updated_at
    )
