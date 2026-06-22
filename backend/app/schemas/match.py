from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class TeamBase(BaseModel):
    """Base team info for match display"""
    id: int
    name: str
    code: str  # Changed from fifa_code to match the model
    flag_url: Optional[str] = None
    primary_color: Optional[str] = "#1a5490"  # Default FIFA blue color
    
    class Config:
        from_attributes = True


class MatchBase(BaseModel):
    """Base match schema"""
    match_number: int
    home_team_id: int
    away_team_id: int
    match_date: datetime
    venue: Optional[str] = None
    match_stage: Optional[str] = None
    group_letter: Optional[str] = None


class MatchCreate(MatchBase):
    """Schema for creating a new match"""
    pass


class MatchResponse(MatchBase):
    """Schema for match response"""
    id: int
    home_score: Optional[int] = None
    away_score: Optional[int] = None
    is_completed: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class MatchWithTeams(MatchResponse):
    """Match response with full team details"""
    home_team: TeamBase
    away_team: TeamBase
    
    class Config:
        from_attributes = True


class PredictionProbabilities(BaseModel):
    """Match outcome probabilities"""
    home_win: float = Field(..., ge=0, le=100, description="Probability of home team winning (%)")
    draw: float = Field(..., ge=0, le=100, description="Probability of draw (%)")
    away_win: float = Field(..., ge=0, le=100, description="Probability of away team winning (%)")
    
    class Config:
        json_schema_extra = {
            "example": {
                "home_win": 45.5,
                "draw": 25.0,
                "away_win": 29.5
            }
        }


class MatchPredictionCreate(BaseModel):
    """Schema for creating a match prediction"""
    predicted_home_score: int = Field(..., ge=0, le=10, description="Predicted home team score (0-10)")
    predicted_away_score: int = Field(..., ge=0, le=10, description="Predicted away team score (0-10)")


class MatchPredictionResponse(BaseModel):
    """Schema for match prediction response"""
    id: int
    user_id: int
    match_id: int
    predicted_home_score: int
    predicted_away_score: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class MatchWithPrediction(MatchWithTeams):
    """Match with user's prediction and AI probabilities"""
    user_prediction: Optional[MatchPredictionResponse] = None
    ai_probabilities: Optional[PredictionProbabilities] = None
    
    class Config:
        from_attributes = True
