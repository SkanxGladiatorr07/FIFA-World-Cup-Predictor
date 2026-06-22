from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TeamBase(BaseModel):
    name: str
    code: str
    fifa_ranking: Optional[int] = None
    elo_rating: Optional[int] = None
    confederation: Optional[str] = None
    flag_url: Optional[str] = None
    group_letter: Optional[str] = None


class TeamCreate(TeamBase):
    pass


class TeamResponse(TeamBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class TeamListResponse(BaseModel):
    teams: list[TeamResponse]
    total: int
