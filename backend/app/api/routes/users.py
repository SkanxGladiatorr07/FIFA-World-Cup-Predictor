from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.database import get_db
from app.models.user import User
from app.models.prediction import MatchPrediction, GoldenBootPrediction, GoldenGlovePrediction, Simulation
from app.schemas.user import UserResponse, UserUpdate, UserStats
from app.api.dependencies import get_current_active_user

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_active_user)
):
    """
    Get current user information
    """
    return UserResponse.from_orm(current_user)


@router.get("/me/stats", response_model=UserStats)
async def get_user_stats(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Get current user's prediction statistics
    """
    # Count match predictions
    match_predictions_count = db.query(func.count(MatchPrediction.id))\
        .filter(MatchPrediction.user_id == current_user.id)\
        .scalar()
    
    # Count golden boot predictions (user can only have 1)
    golden_boot_count = db.query(func.count(GoldenBootPrediction.id))\
        .filter(GoldenBootPrediction.user_id == current_user.id)\
        .scalar()
    
    # Count golden glove predictions (user can only have 1)
    golden_glove_count = db.query(func.count(GoldenGlovePrediction.id))\
        .filter(GoldenGlovePrediction.user_id == current_user.id)\
        .scalar()
    
    # Count simulations run
    simulations_count = db.query(func.count(Simulation.id))\
        .filter(Simulation.user_id == current_user.id)\
        .scalar()
    
    player_predictions = golden_boot_count + golden_glove_count
    total_predictions = match_predictions_count + player_predictions
    
    return UserStats(
        total_predictions=total_predictions,
        match_predictions=match_predictions_count,
        player_predictions=player_predictions,
        simulations_run=simulations_count
    )


@router.put("/me", response_model=UserResponse)
async def update_user(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Update current user information
    """
    # Check if email is being updated and if it already exists
    if user_update.email and user_update.email != current_user.email:
        existing_email = db.query(User).filter(User.email == user_update.email).first()
        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already in use"
            )
        current_user.email = user_update.email
    
    # Check if username is being updated and if it already exists
    if user_update.username and user_update.username != current_user.username:
        existing_username = db.query(User).filter(User.username == user_update.username).first()
        if existing_username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )
        current_user.username = user_update.username
    
    db.commit()
    db.refresh(current_user)
    
    return UserResponse.from_orm(current_user)
