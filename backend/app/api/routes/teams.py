from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.team import Team
from app.schemas.team import TeamResponse

router = APIRouter(prefix="/teams", tags=["Teams"])


@router.get("", response_model=List[TeamResponse])
async def get_all_teams(
    group: str = None,
    db: Session = Depends(get_db)
):
    """
    Get all teams, optionally filtered by group
    """
    query = db.query(Team)
    
    if group:
        query = query.filter(Team.group_letter == group.upper())
    
    teams = query.order_by(Team.fifa_ranking).all()
    return teams


@router.get("/{team_id}", response_model=TeamResponse)
async def get_team(
    team_id: int,
    db: Session = Depends(get_db)
):
    """
    Get a specific team by ID
    """
    team = db.query(Team).filter(Team.id == team_id).first()
    
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")
    
    return team
