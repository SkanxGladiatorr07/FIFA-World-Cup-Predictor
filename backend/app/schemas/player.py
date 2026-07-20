from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class PlayerBase(BaseModel):
    """Base player schema"""
    name: str
    team_id: int
    position: Optional[str] = None
    age: Optional[int] = None
    club: Optional[str] = None


class PlayerResponse(PlayerBase):
    """Schema for player response"""
    id: int
    goals_per_90: Optional[float] = None
    xg_season: Optional[float] = None
    shots_per_game: Optional[float] = None
    save_percentage: Optional[float] = None
    xg_prevented: Optional[float] = None
    clean_sheet_percentage: Optional[float] = None
    
    class Config:
        from_attributes = True


class PlayerWithTeam(PlayerResponse):
    """Player with team details"""
    team_name: Optional[str] = None
    team_code: Optional[str] = None
    flag_url: Optional[str] = None
    
    class Config:
        from_attributes = True


class GoldenBootPredictionCreate(BaseModel):
    """Schema for creating Golden Boot prediction"""
    player_id: int = Field(..., description="ID of the player predicted to win Golden Boot")


class GoldenBootPredictionResponse(BaseModel):
    """Schema for Golden Boot prediction response"""
    id: int
    user_id: int
    player_id: int
    player_name: Optional[str] = None
    team_name: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class GoldenGlovePredictionCreate(BaseModel):
    """Schema for creating Golden Glove prediction"""
    player_id: int = Field(..., description="ID of the goalkeeper predicted to win Golden Glove")


class GoldenGlovePredictionResponse(BaseModel):
    """Schema for Golden Glove prediction response"""
    id: int
    user_id: int
    player_id: int
    player_name: Optional[str] = None
    team_name: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class PlayerStats(BaseModel):
    """Player statistics for predictions"""
    player: PlayerWithTeam
    predicted_goals: Optional[float] = None  # For forwards
    predicted_saves: Optional[float] = None  # For goalkeepers
    prediction_confidence: Optional[float] = None
