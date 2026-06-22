from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.db.database import Base


class Team(Base):
    __tablename__ = "teams"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    code = Column(String(3), unique=True, nullable=False, index=True)
    fifa_ranking = Column(Integer, nullable=True)
    elo_rating = Column(Integer, nullable=True)
    confederation = Column(String(10), nullable=True)
    flag_url = Column(String(255), nullable=True)
    group_letter = Column(String(1), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    
    def __repr__(self):
        return f"<Team(id={self.id}, name='{self.name}', code='{self.code}')>"
