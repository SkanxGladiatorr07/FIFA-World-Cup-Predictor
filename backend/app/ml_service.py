"""
ML Model Service for FIFA World Cup Predictions
This module provides functions to load and use the trained ML models for match predictions
"""

import joblib
import pandas as pd
import numpy as np
import os
from typing import Dict, Tuple, Optional
from pathlib import Path

# Get the base directory
BASE_DIR = Path(__file__).resolve().parent.parent
ML_MODELS_DIR = BASE_DIR / "ml_models"

# Global variables to store loaded models
_model = None
_team_db = None
_models_loaded = False

# Default stats for teams not in database
DEFAULT_STATS = {
    "matches": 1,
    "wins": 0,
    "gf": 1.2,
    "ga": 1.2
}


def load_models():
    """Load ML models and team database"""
    global _model, _team_db, _models_loaded
    
    if _models_loaded:
        return
    
    try:
        model_path = ML_MODELS_DIR / "match_predictor.joblib"
        team_db_path = ML_MODELS_DIR / "team_database.joblib"
        
        if not model_path.exists():
            print(f"Warning: Model file not found at {model_path}")
            return
        
        if not team_db_path.exists():
            print(f"Warning: Team database not found at {team_db_path}")
            return
        
        _model = joblib.load(str(model_path))
        _team_db = joblib.load(str(team_db_path))
        _models_loaded = True
        
        print("ML models loaded successfully!")
        print(f"Team database contains {len(_team_db)} teams")
        
    except Exception as e:
        print(f"Error loading ML models: {e}")
        _models_loaded = False


def get_team_stats(team_name: str) -> Dict:
    """Get team statistics from database"""
    if not _models_loaded:
        load_models()
    
    if _team_db is None:
        return DEFAULT_STATS
    
    return _team_db.get(team_name, DEFAULT_STATS)


def predict_match(home_team_name: str, away_team_name: str) -> Dict:
    """
    Predict match outcome probabilities and expected goals
    
    Args:
        home_team_name: Name of the home team
        away_team_name: Name of the away team
    
    Returns:
        Dictionary containing:
        - home_win_prob: Probability of home team winning (%)
        - draw_prob: Probability of draw (%)
        - away_win_prob: Probability of away team winning (%)
        - home_xg: Expected goals for home team
        - away_xg: Expected goals for away team
        - predicted_home_score: Most likely home team score
        - predicted_away_score: Most likely away team score
    """
    if not _models_loaded:
        load_models()
    
    if _model is None:
        # Fallback to simple probabilities if model not loaded
        return {
            "home_win_prob": 40.0,
            "draw_prob": 30.0,
            "away_win_prob": 30.0,
            "home_xg": 1.5,
            "away_xg": 1.2,
            "predicted_home_score": 1,
            "predicted_away_score": 1
        }
    
    try:
        # Get team stats
        home_stats = get_team_stats(home_team_name)
        away_stats = get_team_stats(away_team_name)
        
        # Calculate features
        home_win_rate = home_stats["wins"] / home_stats["matches"]
        away_win_rate = away_stats["wins"] / away_stats["matches"]
        home_gf = home_stats["gf"] / home_stats["matches"]
        away_gf = away_stats["gf"] / away_stats["matches"]
        home_ga = home_stats["ga"] / home_stats["matches"]
        away_ga = away_stats["ga"] / away_stats["matches"]
        
        # Create feature vector
        X = pd.DataFrame([[
            home_win_rate,
            away_win_rate,
            home_gf,
            away_gf,
            home_ga,
            away_ga
        ]], columns=[
            "home_win_rate",
            "away_win_rate",
            "home_gf",
            "away_gf",
            "home_ga",
            "away_ga"
        ])
        
        # Get probabilities
        probs = _model.predict_proba(X)[0]
        away_win_prob = probs[0] * 100
        draw_prob = probs[1] * 100
        home_win_prob = probs[2] * 100
        
        # Calculate expected goals
        home_attack = home_gf
        away_attack = away_gf
        home_defense = home_ga
        away_defense = away_ga
        
        home_xg = (home_attack + away_defense) / 2
        away_xg = (away_attack + home_defense) / 2
        
        # Adjust xG based on win probability
        if home_win_prob > 60:
            home_xg *= 1.25
            away_xg *= 0.85
        elif away_win_prob > 60:
            away_xg *= 1.25
            home_xg *= 0.85
        
        # Ensure minimum xG
        home_xg = max(0.3, home_xg)
        away_xg = max(0.3, away_xg)
        
        # Get predicted class
        pred_class = _model.predict(X)[0]
        
        # Generate predicted scoreline using Monte Carlo with frequency tracking
        score_counter = Counter()
        
        for _ in range(10000):
            home_score = np.random.poisson(home_xg)
            away_score = np.random.poisson(away_xg)
            
            if pred_class == 2 and home_score > away_score:
                score_counter[f"{home_score}-{away_score}"] += 1
            elif pred_class == 0 and away_score > home_score:
                score_counter[f"{home_score}-{away_score}"] += 1
            elif pred_class == 1 and home_score == away_score:
                score_counter[f"{home_score}-{away_score}"] += 1
        
        # Get most common (most likely) score
        if score_counter:
            most_likely_score_str = score_counter.most_common(1)[0][0]
            predicted_home_score, predicted_away_score = map(int, most_likely_score_str.split('-'))
        else:
            # Fallback if no valid scores found
            predicted_home_score = int(round(home_xg))
            predicted_away_score = int(round(away_xg))
        
        return {
            "home_win_prob": round(home_win_prob, 1),
            "draw_prob": round(draw_prob, 1),
            "away_win_prob": round(away_win_prob, 1),
            "home_xg": round(home_xg, 2),
            "away_xg": round(away_xg, 2),
            "predicted_home_score": int(predicted_home_score),
            "predicted_away_score": int(predicted_away_score)
        }
        
    except Exception as e:
        print(f"Error in predict_match: {e}")
        # Fallback to simple probabilities
        return {
            "home_win_prob": 40.0,
            "draw_prob": 30.0,
            "away_win_prob": 30.0,
            "home_xg": 1.5,
            "away_xg": 1.2,
            "predicted_home_score": 1,
            "predicted_away_score": 1
        }


def simulate_single_match(home_team_name: str, away_team_name: str, randomness: float = 0.15) -> Tuple[str, int, int]:
    """
    Simulate a single match and return the winner
    
    Args:
        home_team_name: Name of the home team
        away_team_name: Name of the away team
        randomness: Randomness factor (0.0 to 0.5)
    
    Returns:
        Tuple of (winner_name, home_score, away_score)
    """
    if not _models_loaded:
        load_models()
    
    if _model is None:
        # Simple fallback
        home_score = np.random.poisson(1.5)
        away_score = np.random.poisson(1.2)
        winner = home_team_name if home_score > away_score else (away_team_name if away_score > home_score else "DRAW")
        return winner, home_score, away_score
    
    try:
        # Get prediction
        prediction = predict_match(home_team_name, away_team_name)
        
        # Add randomness to xG
        home_xg = prediction["home_xg"] * (1 + np.random.uniform(-randomness, randomness))
        away_xg = prediction["away_xg"] * (1 + np.random.uniform(-randomness, randomness))
        
        # Generate scores
        home_score = np.random.poisson(max(0.3, home_xg))
        away_score = np.random.poisson(max(0.3, away_xg))
        
        # Determine winner (if draw, use probabilities to pick winner for knockout)
        if home_score > away_score:
            winner = home_team_name
        elif away_score > home_score:
            winner = away_team_name
        else:
            # For draws in knockout, use win probabilities
            rand = np.random.random() * 100
            if rand < prediction["home_win_prob"]:
                winner = home_team_name
            else:
                winner = away_team_name
        
        return winner, int(home_score), int(away_score)
        
    except Exception as e:
        print(f"Error in simulate_single_match: {e}")
        # Fallback
        home_score = np.random.poisson(1.5)
        away_score = np.random.poisson(1.2)
        winner = home_team_name if home_score > away_score else away_team_name
        return winner, home_score, away_score


# Initialize models on import
load_models()
