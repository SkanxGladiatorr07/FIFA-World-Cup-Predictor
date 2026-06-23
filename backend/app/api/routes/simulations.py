from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.db.database import get_db
from app.models.prediction import Simulation
from app.models.match import Match
from app.models.team import Team
from app.models.user import User
from app.schemas.simulation import (
    SimulationCreate,
    SimulationResponse,
    SimulationResult,
    MatchSimulationRequest,
    MatchSimulationResult
)
from app.api.dependencies import get_current_user
from app.ml_service import simulate_single_match, predict_match
import random
from collections import Counter


router = APIRouter(prefix="/simulations", tags=["Simulations"])


def simulate_match_outcome(home_team: Team, away_team: Team, randomness: float = 0.15) -> Dict[str, int]:
    """
    Simulate a single match outcome using ML model
    """
    try:
        winner, home_score, away_score = simulate_single_match(home_team.name, away_team.name, randomness)
        return {"home": home_score, "away": away_score}
    except Exception as e:
        print(f"Error in simulate_match_outcome: {e}")
        # Fallback to simple simulation
        home_strength = 100 - (home_team.fifa_ranking if home_team.fifa_ranking else 50)
        away_strength = 100 - (away_team.fifa_ranking if away_team.fifa_ranking else 50)
        
        home_strength += 5
        home_strength *= (1 + random.uniform(-randomness, randomness))
        away_strength *= (1 + random.uniform(-randomness, randomness))
        
        home_expected_goals = (home_strength / (home_strength + away_strength)) * 3.0
        away_expected_goals = (away_strength / (home_strength + away_strength)) * 3.0
        
        home_score = max(0, int(random.gauss(home_expected_goals, 1.2)))
        away_score = max(0, int(random.gauss(away_expected_goals, 1.2)))
        
        home_score = min(home_score, 7)
        away_score = min(away_score, 7)
        
        return {"home": home_score, "away": away_score}


def simulate_tournament(db: Session, num_simulations: int, randomness: float) -> Dict[str, Any]:
    """
    Simulate the entire World Cup tournament with winner, runner-up, and third place tracking
    """
    # Get all teams
    teams = db.query(Team).all()
    team_dict = {team.id: team for team in teams}
    
    winner_counter = Counter()
    runner_up_counter = Counter()
    third_place_counter = Counter()
    finalist_counter = Counter()
    semifinalist_counter = Counter()
    
    for _ in range(num_simulations):
        # Simulate from group stage (simplified - just use rankings)
        # Top teams more likely to progress
        qualified_teams = sorted(teams, key=lambda t: t.fifa_ranking or 100)[:16]
        
        # Round of 16
        round_of_16_winners = []
        for i in range(0, 16, 2):
            if i + 1 < len(qualified_teams):
                home = qualified_teams[i]
                away = qualified_teams[i + 1]
                result = simulate_match_outcome(home, away, randomness)
                
                if result["home"] > result["away"]:
                    round_of_16_winners.append(home)
                elif result["away"] > result["home"]:
                    round_of_16_winners.append(away)
                else:
                    round_of_16_winners.append(random.choice([home, away]))
        
        # Quarter-finals
        quarter_final_winners = []
        for i in range(0, len(round_of_16_winners), 2):
            if i + 1 < len(round_of_16_winners):
                home = round_of_16_winners[i]
                away = round_of_16_winners[i + 1]
                result = simulate_match_outcome(home, away, randomness)
                
                if result["home"] > result["away"]:
                    quarter_final_winners.append(home)
                elif result["away"] > result["home"]:
                    quarter_final_winners.append(away)
                else:
                    quarter_final_winners.append(random.choice([home, away]))
        
        # Semi-finals - Track losers for third place match
        semi_final_winners = []
        semi_final_losers = []
        for i in range(0, len(quarter_final_winners), 2):
            if i + 1 < len(quarter_final_winners):
                home = quarter_final_winners[i]
                away = quarter_final_winners[i + 1]
                result = simulate_match_outcome(home, away, randomness)
                
                semifinalist_counter[home.name] += 1
                semifinalist_counter[away.name] += 1
                
                if result["home"] > result["away"]:
                    semi_final_winners.append(home)
                    semi_final_losers.append(away)
                elif result["away"] > result["home"]:
                    semi_final_winners.append(away)
                    semi_final_losers.append(home)
                else:
                    winner = random.choice([home, away])
                    loser = away if winner == home else home
                    semi_final_winners.append(winner)
                    semi_final_losers.append(loser)
        
        # Third Place Match
        if len(semi_final_losers) >= 2:
            home = semi_final_losers[0]
            away = semi_final_losers[1]
            result = simulate_match_outcome(home, away, randomness)
            
            if result["home"] > result["away"]:
                third_place_counter[home.name] += 1
            elif result["away"] > result["home"]:
                third_place_counter[away.name] += 1
            else:
                third_place_winner = random.choice([home, away])
                third_place_counter[third_place_winner.name] += 1
        
        # Final
        if len(semi_final_winners) >= 2:
            home = semi_final_winners[0]
            away = semi_final_winners[1]
            result = simulate_match_outcome(home, away, randomness)
            
            finalist_counter[home.name] += 1
            finalist_counter[away.name] += 1
            
            if result["home"] > result["away"]:
                winner_counter[home.name] += 1
                runner_up_counter[away.name] += 1
            elif result["away"] > result["home"]:
                winner_counter[away.name] += 1
                runner_up_counter[home.name] += 1
            else:
                winner = random.choice([home, away])
                loser = away if winner == home else home
                winner_counter[winner.name] += 1
                runner_up_counter[loser.name] += 1
    
    # Calculate probabilities
    winner_probabilities = {
        team: (count / num_simulations) * 100 
        for team, count in winner_counter.most_common(10)
    }
    
    runner_up_probabilities = {
        team: (count / num_simulations) * 100 
        for team, count in runner_up_counter.most_common(10)
    }
    
    third_place_probabilities = {
        team: (count / num_simulations) * 100 
        for team, count in third_place_counter.most_common(10)
    }
    
    finalist_probabilities = {
        team: (count / num_simulations) * 100 
        for team, count in finalist_counter.most_common(10)
    }
    
    semifinalist_probabilities = {
        team: (count / num_simulations) * 100 
        for team, count in semifinalist_counter.most_common(16)
    }
    
    most_likely_winner = winner_counter.most_common(1)[0][0] if winner_counter else None
    most_likely_runner_up = runner_up_counter.most_common(1)[0][0] if runner_up_counter else None
    most_likely_third_place = third_place_counter.most_common(1)[0][0] if third_place_counter else None
    
    return {
        "simulations_run": num_simulations,
        "most_likely_winner": most_likely_winner,
        "most_likely_runner_up": most_likely_runner_up,
        "most_likely_third_place": most_likely_third_place,
        "winner_probabilities": winner_probabilities,
        "runner_up_probabilities": runner_up_probabilities,
        "third_place_probabilities": third_place_probabilities,
        "finalist_probabilities": finalist_probabilities,
        "semifinalist_probabilities": semifinalist_probabilities,
        "randomness_factor": randomness
    }


@router.post("/tournament", response_model=SimulationResponse, status_code=status.HTTP_201_CREATED)
async def simulate_tournament_endpoint(
    simulation_data: SimulationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Run a full tournament simulation
    """
    # Run simulation
    results = simulate_tournament(
        db, 
        simulation_data.num_simulations,
        simulation_data.randomness_factor
    )
    
    # Get winner team ID
    winner_team = None
    if results["most_likely_winner"]:
        winner_team = db.query(Team).filter(Team.name == results["most_likely_winner"]).first()
    
    # Save simulation to database
    new_simulation = Simulation(
        user_id=current_user.id,
        simulation_name=simulation_data.simulation_name,
        num_simulations=simulation_data.num_simulations,
        randomness_factor=simulation_data.randomness_factor,
        winner_team_id=winner_team.id if winner_team else None,
        results_json=results
    )
    
    db.add(new_simulation)
    db.commit()
    db.refresh(new_simulation)
    
    return SimulationResponse.from_orm(new_simulation)


@router.post("/match", response_model=MatchSimulationResult)
async def simulate_match_endpoint(
    simulation_data: MatchSimulationRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Simulate a single match multiple times to get probabilities using ML model
    """
    # Get match
    match = db.query(Match).filter(Match.id == simulation_data.match_id).first()
    if not match:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Match not found"
        )
    
    if not match.home_team_id or not match.away_team_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot simulate match with TBD teams"
        )
    
    # Get teams
    home_team = db.query(Team).filter(Team.id == match.home_team_id).first()
    away_team = db.query(Team).filter(Team.id == match.away_team_id).first()
    
    if not home_team or not away_team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Teams not found"
        )
    
    try:
        # Use ML model for initial prediction
        ml_prediction = predict_match(home_team.name, away_team.name)
        
        # Run Monte Carlo simulations for score distribution
        home_wins = 0
        draws = 0
        away_wins = 0
        score_counter = Counter()
        
        for _ in range(simulation_data.num_simulations):
            result = simulate_match_outcome(home_team, away_team, 0.15)
            score_key = f"{result['home']}-{result['away']}"
            score_counter[score_key] += 1
            
            if result["home"] > result["away"]:
                home_wins += 1
            elif result["away"] > result["home"]:
                away_wins += 1
            else:
                draws += 1
        
        # Calculate probabilities from simulations
        home_win_prob = (home_wins / simulation_data.num_simulations) * 100
        draw_prob = (draws / simulation_data.num_simulations) * 100
        away_win_prob = (away_wins / simulation_data.num_simulations) * 100
        
        # Blend with ML predictions (70% ML, 30% simulation)
        home_win_prob = 0.7 * ml_prediction["home_win_prob"] + 0.3 * home_win_prob
        draw_prob = 0.7 * ml_prediction["draw_prob"] + 0.3 * draw_prob
        away_win_prob = 0.7 * ml_prediction["away_win_prob"] + 0.3 * away_win_prob
        
        # Get most likely score from ML prediction
        most_likely_score = {
            "home": ml_prediction["predicted_home_score"],
            "away": ml_prediction["predicted_away_score"]
        }
        
        # Get score probabilities (top 10)
        score_probabilities = {
            score: (count / simulation_data.num_simulations) * 100
            for score, count in score_counter.most_common(10)
        }
        
        return MatchSimulationResult(
            match_id=match.id,
            home_win_probability=round(home_win_prob, 1),
            draw_probability=round(draw_prob, 1),
            away_win_probability=round(away_win_prob, 1),
            most_likely_score=most_likely_score,
            score_probabilities={k: round(v, 1) for k, v in score_probabilities.items()}
        )
        
    except Exception as e:
        print(f"Error in match simulation: {e}")
        # Fallback to simple simulation
        home_wins = 0
        draws = 0
        away_wins = 0
        score_counter = Counter()
        
        for _ in range(simulation_data.num_simulations):
            result = simulate_match_outcome(home_team, away_team, 0.15)
            score_key = f"{result['home']}-{result['away']}"
            score_counter[score_key] += 1
            
            if result["home"] > result["away"]:
                home_wins += 1
            elif result["away"] > result["home"]:
                away_wins += 1
            else:
                draws += 1
        
        home_win_prob = (home_wins / simulation_data.num_simulations) * 100
        draw_prob = (draws / simulation_data.num_simulations) * 100
        away_win_prob = (away_wins / simulation_data.num_simulations) * 100
        
        most_likely = score_counter.most_common(1)[0][0].split('-')
        most_likely_score = {"home": int(most_likely[0]), "away": int(most_likely[1])}
        
        score_probabilities = {
            score: (count / simulation_data.num_simulations) * 100
            for score, count in score_counter.most_common(10)
        }
        
        return MatchSimulationResult(
            match_id=match.id,
            home_win_probability=round(home_win_prob, 1),
            draw_probability=round(draw_prob, 1),
            away_win_probability=round(away_win_prob, 1),
            most_likely_score=most_likely_score,
            score_probabilities={k: round(v, 1) for k, v in score_probabilities.items()}
        )


@router.get("/my-simulations", response_model=List[SimulationResponse])
async def get_my_simulations(
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get current user's simulation history"""
    simulations = db.query(Simulation).filter(
        Simulation.user_id == current_user.id
    ).order_by(
        Simulation.created_at.desc()
    ).limit(limit).all()
    
    return [SimulationResponse.from_orm(sim) for sim in simulations]


@router.get("/{simulation_id}", response_model=SimulationResponse)
async def get_simulation(
    simulation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific simulation"""
    simulation = db.query(Simulation).filter(
        Simulation.id == simulation_id,
        Simulation.user_id == current_user.id
    ).first()
    
    if not simulation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Simulation not found"
        )
    
    return SimulationResponse.from_orm(simulation)
