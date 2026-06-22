from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
from app.db.database import get_db
from app.models.match import Match
from app.models.team import Team
from app.models.prediction import MatchPrediction
from app.models.user import User
from app.schemas.match import (
    MatchResponse,
    MatchWithTeams,
    MatchWithPrediction,
    MatchPredictionCreate,
    MatchPredictionResponse,
    PredictionProbabilities,
    TeamBase
)
from app.api.dependencies import get_current_user
import random


router = APIRouter(prefix="/matches", tags=["Matches"])


def calculate_mock_probabilities(home_team_id: Optional[int], away_team_id: Optional[int], db: Session) -> PredictionProbabilities:
    """
    Calculate mock prediction probabilities
    TODO: Replace with actual ML model predictions
    """
    if not home_team_id or not away_team_id:
        # TBD matches - equal probabilities
        return PredictionProbabilities(home_win=33.3, draw=33.3, away_win=33.4)
    
    # Get team rankings
    home_team = db.query(Team).filter(Team.id == home_team_id).first()
    away_team = db.query(Team).filter(Team.id == away_team_id).first()
    
    if not home_team or not away_team:
        return PredictionProbabilities(home_win=40.0, draw=30.0, away_win=30.0)
    
    # Simple probability based on FIFA ranking (lower ranking = stronger team)
    home_strength = 100 - (home_team.fifa_ranking if home_team.fifa_ranking else 50)
    away_strength = 100 - (away_team.fifa_ranking if away_team.fifa_ranking else 50)
    
    # Add home advantage
    home_strength += 5
    
    total_strength = home_strength + away_strength
    
    if total_strength == 0:
        return PredictionProbabilities(home_win=40.0, draw=30.0, away_win=30.0)
    
    # Calculate base probabilities
    home_prob = (home_strength / total_strength) * 70  # 70% allocated to win probabilities
    away_prob = (away_strength / total_strength) * 70
    draw_prob = 100 - home_prob - away_prob
    
    # Ensure draw probability is reasonable (15-35%)
    if draw_prob < 15:
        adjustment = 15 - draw_prob
        home_prob -= adjustment / 2
        away_prob -= adjustment / 2
        draw_prob = 15
    elif draw_prob > 35:
        adjustment = draw_prob - 35
        home_prob += adjustment / 2
        away_prob += adjustment / 2
        draw_prob = 35
    
    # Add small random variation for realism
    variation = random.uniform(-3, 3)
    home_prob += variation
    away_prob -= variation
    
    # Ensure probabilities sum to 100 and are within bounds
    total = home_prob + draw_prob + away_prob
    home_prob = max(5, min(80, (home_prob / total) * 100))
    draw_prob = max(10, min(40, (draw_prob / total) * 100))
    away_prob = 100 - home_prob - draw_prob
    
    # Round to 1 decimal place
    return PredictionProbabilities(
        home_win=round(home_prob, 1),
        draw=round(draw_prob, 1),
        away_win=round(away_prob, 1)
    )


@router.get("/", response_model=List[MatchWithTeams])
async def get_matches(
    stage: Optional[str] = Query(None, description="Filter by match stage (Group, Round of 16, Quarter-Final, etc.)"),
    group: Optional[str] = Query(None, description="Filter by group letter (A-L)"),
    team_id: Optional[int] = Query(None, description="Filter by team ID"),
    limit: Optional[int] = Query(100, ge=1, le=200, description="Number of matches to return"),
    offset: Optional[int] = Query(0, ge=0, description="Number of matches to skip"),
    db: Session = Depends(get_db)
):
    """
    Get all matches with optional filters
    """
    query = db.query(Match)
    
    # Apply filters
    if stage:
        query = query.filter(Match.match_stage == stage)
    
    if group:
        query = query.filter(Match.group_letter == group.upper())
    
    if team_id:
        query = query.filter(
            (Match.home_team_id == team_id) | (Match.away_team_id == team_id)
        )
    
    # Order by match date (chronological) and apply pagination
    matches = query.order_by(Match.match_date).offset(offset).limit(limit).all()
    
    # Build response with team details
    result = []
    for match in matches:
        # Get team details
        home_team = None
        away_team = None
        
        if match.home_team_id:
            home_team_obj = db.query(Team).filter(Team.id == match.home_team_id).first()
            if home_team_obj:
                home_team = TeamBase.from_orm(home_team_obj)
        
        if match.away_team_id:
            away_team_obj = db.query(Team).filter(Team.id == match.away_team_id).first()
            if away_team_obj:
                away_team = TeamBase.from_orm(away_team_obj)
        
        # For TBD matches, create placeholder teams
        if not home_team:
            home_team = TeamBase(id=0, name="TBD", code="TBD", flag_url=None, primary_color="#808080")
        if not away_team:
            away_team = TeamBase(id=0, name="TBD", code="TBD", flag_url=None, primary_color="#808080")
        
        match_dict = {
            "id": match.id,
            "match_number": match.match_number,
            "home_team_id": match.home_team_id or 0,
            "away_team_id": match.away_team_id or 0,
            "match_date": match.match_date,
            "venue": match.venue,
            "match_stage": match.match_stage,
            "group_letter": match.group_letter,
            "home_score": match.home_score,
            "away_score": match.away_score,
            "is_completed": match.is_completed,
            "created_at": match.created_at,
            "home_team": home_team,
            "away_team": away_team
        }
        
        result.append(MatchWithTeams(**match_dict))
    
    return result


@router.get("/{match_id}", response_model=MatchWithPrediction)
async def get_match(
    match_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get a specific match with AI probabilities and user's prediction (if logged in)
    """
    match = db.query(Match).filter(Match.id == match_id).first()
    
    if not match:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Match not found"
        )
    
    # Get team details
    home_team = None
    away_team = None
    
    if match.home_team_id:
        home_team_obj = db.query(Team).filter(Team.id == match.home_team_id).first()
        if home_team_obj:
            home_team = TeamBase.from_orm(home_team_obj)
    
    if match.away_team_id:
        away_team_obj = db.query(Team).filter(Team.id == match.away_team_id).first()
        if away_team_obj:
            away_team = TeamBase.from_orm(away_team_obj)
    
    # For TBD matches, create placeholder teams
    if not home_team:
        home_team = TeamBase(id=0, name="TBD", code="TBD", flag_url=None, primary_color="#808080")
    if not away_team:
        away_team = TeamBase(id=0, name="TBD", code="TBD", flag_url=None, primary_color="#808080")
    
    # Get user's prediction if exists
    user_prediction = None
    if current_user:
        prediction = db.query(MatchPrediction).filter(
            MatchPrediction.user_id == current_user.id,
            MatchPrediction.match_id == match_id
        ).first()
        
        if prediction:
            user_prediction = MatchPredictionResponse.from_orm(prediction)
    
    # Calculate AI probabilities
    ai_probabilities = calculate_mock_probabilities(match.home_team_id, match.away_team_id, db)
    
    match_dict = {
        "id": match.id,
        "match_number": match.match_number,
        "home_team_id": match.home_team_id or 0,
        "away_team_id": match.away_team_id or 0,
        "match_date": match.match_date,
        "venue": match.venue,
        "match_stage": match.match_stage,
        "group_letter": match.group_letter,
        "home_score": match.home_score,
        "away_score": match.away_score,
        "is_completed": match.is_completed,
        "created_at": match.created_at,
        "home_team": home_team,
        "away_team": away_team,
        "user_prediction": user_prediction,
        "ai_probabilities": ai_probabilities
    }
    
    return MatchWithPrediction(**match_dict)


@router.post("/{match_id}/predict", response_model=MatchPredictionResponse, status_code=status.HTTP_201_CREATED)
async def create_or_update_prediction(
    match_id: int,
    prediction_data: MatchPredictionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create or update a match prediction for the current user
    """
    # Verify match exists
    match = db.query(Match).filter(Match.id == match_id).first()
    if not match:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Match not found"
        )
    
    # Check if match has already started (can't predict after kickoff)
    # TODO: Uncomment when we want to enforce this
    # from datetime import datetime
    # if match.match_date < datetime.utcnow():
    #     raise HTTPException(
    #         status_code=status.HTTP_400_BAD_REQUEST,
    #         detail="Cannot predict a match that has already started"
    #     )
    
    # Check if prediction already exists
    existing_prediction = db.query(MatchPrediction).filter(
        MatchPrediction.user_id == current_user.id,
        MatchPrediction.match_id == match_id
    ).first()
    
    if existing_prediction:
        # Update existing prediction
        existing_prediction.predicted_home_score = prediction_data.predicted_home_score
        existing_prediction.predicted_away_score = prediction_data.predicted_away_score
        db.commit()
        db.refresh(existing_prediction)
        return MatchPredictionResponse.from_orm(existing_prediction)
    else:
        # Create new prediction
        new_prediction = MatchPrediction(
            user_id=current_user.id,
            match_id=match_id,
            predicted_home_score=prediction_data.predicted_home_score,
            predicted_away_score=prediction_data.predicted_away_score
        )
        db.add(new_prediction)
        db.commit()
        db.refresh(new_prediction)
        return MatchPredictionResponse.from_orm(new_prediction)


@router.get("/stages/available", response_model=List[str])
async def get_available_stages(db: Session = Depends(get_db)):
    """
    Get list of all available match stages
    """
    stages = db.query(Match.match_stage).distinct().all()
    return [stage[0] for stage in stages if stage[0]]


@router.get("/groups/available", response_model=List[str])
async def get_available_groups(db: Session = Depends(get_db)):
    """
    Get list of all available groups
    """
    groups = db.query(Match.group_letter).distinct().filter(Match.group_letter.isnot(None)).all()
    return sorted([group[0] for group in groups if group[0]])
