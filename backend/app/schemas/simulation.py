from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime


class SimulationCreate(BaseModel):
    """Schema for creating a new simulation"""
    simulation_name: Optional[str] = Field(None, max_length=150, description="Optional name for the simulation")
    num_simulations: int = Field(1000, ge=100, le=10000, description="Number of simulations to run (100-10000)")
    randomness_factor: float = Field(0.15, ge=0.0, le=1.0, description="Randomness factor for simulation (0.0-1.0)")


class SimulationResult(BaseModel):
    """Schema for simulation results"""
    winner_team_id: Optional[int] = None
    winner_team_name: Optional[str] = None
    winner_probability: Optional[float] = None
    results_json: Dict[str, Any]  # Contains detailed simulation results
    
    class Config:
        json_schema_extra = {
            "example": {
                "winner_team_id": 1,
                "winner_team_name": "Brazil",
                "winner_probability": 23.5,
                "results_json": {
                    "winner_probabilities": {"Brazil": 23.5, "Argentina": 18.2},
                    "top_4_probabilities": {"Brazil": 45.0, "Argentina": 42.0},
                    "simulations_run": 1000
                }
            }
        }


class SimulationResponse(BaseModel):
    """Schema for simulation response"""
    id: int
    user_id: int
    simulation_name: Optional[str] = None
    num_simulations: int
    randomness_factor: Optional[float] = None
    winner_team_id: Optional[int] = None
    results_json: Optional[Dict[str, Any]] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


class MatchSimulationRequest(BaseModel):
    """Schema for simulating a single match"""
    match_id: int
    num_simulations: int = Field(1000, ge=10, le=10000, description="Number of simulations to run")


class MatchSimulationResult(BaseModel):
    """Schema for single match simulation results"""
    match_id: int
    home_win_probability: float
    draw_probability: float
    away_win_probability: float
    most_likely_score: Dict[str, int]  # {"home": 2, "away": 1}
    score_probabilities: Dict[str, float]  # {"2-1": 15.3, "1-1": 12.5, ...}
    
    class Config:
        json_schema_extra = {
            "example": {
                "match_id": 1,
                "home_win_probability": 45.5,
                "draw_probability": 25.0,
                "away_win_probability": 29.5,
                "most_likely_score": {"home": 2, "away": 1},
                "score_probabilities": {
                    "2-1": 15.3,
                    "1-1": 12.5,
                    "2-0": 10.8
                }
            }
        }
