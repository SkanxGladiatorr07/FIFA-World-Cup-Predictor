from sqlalchemy import Column, Integer, ForeignKey, DateTime, UniqueConstraint, Numeric, String, JSON
from sqlalchemy.sql import func
from app.db.database import Base


class MatchPrediction(Base):
    __tablename__ = "match_predictions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    match_id = Column(Integer, ForeignKey("matches.id"), nullable=False)
    predicted_home_score = Column(Integer, nullable=False)
    predicted_away_score = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    __table_args__ = (
        UniqueConstraint('user_id', 'match_id', name='uq_user_match_prediction'),
    )
    
    def __repr__(self):
        return f"<MatchPrediction(user_id={self.user_id}, match_id={self.match_id})>"


class GoldenBootPrediction(Base):
    __tablename__ = "golden_boot_predictions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    player_id = Column(Integer, ForeignKey("players.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    __table_args__ = (
        UniqueConstraint('user_id', name='uq_user_golden_boot'),
    )
    
    def __repr__(self):
        return f"<GoldenBootPrediction(user_id={self.user_id}, player_id={self.player_id})>"


class GoldenGlovePrediction(Base):
    __tablename__ = "golden_glove_predictions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    player_id = Column(Integer, ForeignKey("players.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    
    __table_args__ = (
        UniqueConstraint('user_id', name='uq_user_golden_glove'),
    )
    
    def __repr__(self):
        return f"<GoldenGlovePrediction(user_id={self.user_id}, player_id={self.player_id})>"


class Simulation(Base):
    __tablename__ = "simulations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    simulation_name = Column(String(150), nullable=True)
    num_simulations = Column(Integer, nullable=False)
    randomness_factor = Column(Numeric(3, 2), nullable=True)
    winner_team_id = Column(Integer, ForeignKey("teams.id"), nullable=True)
    results_json = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    
    def __repr__(self):
        return f"<Simulation(id={self.id}, user_id={self.user_id}, name='{self.simulation_name}')>"
