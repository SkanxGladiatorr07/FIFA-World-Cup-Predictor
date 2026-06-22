from sqlalchemy import Column, Integer, String, Numeric, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.db.database import Base


class Player(Base):
    __tablename__ = "players"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=True)
    position = Column(String(10), nullable=True)
    age = Column(Integer, nullable=True)
    club = Column(String(100), nullable=True)
    goals_per_90 = Column(Numeric(4, 2), nullable=True)
    xg_season = Column(Numeric(5, 2), nullable=True)
    shots_per_game = Column(Numeric(4, 2), nullable=True)
    save_percentage = Column(Numeric(5, 2), nullable=True)
    xg_prevented = Column(Numeric(5, 2), nullable=True)
    clean_sheet_percentage = Column(Numeric(5, 2), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    
    def __repr__(self):
        return f"<Player(id={self.id}, name='{self.name}', position='{self.position}')>"
