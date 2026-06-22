"""
Seed database with sample World Cup 2026 data
Run with: python -m datasets.seed_data
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.db.database import SessionLocal
from app.models.team import Team
from app.models.player import Player
from app.models.match import Match
from datetime import datetime


def seed_teams():
    """Seed teams data (48 teams across 12 groups)"""
    db = SessionLocal()
    
    # Check if teams already exist
    existing_teams = db.query(Team).count()
    if existing_teams > 0:
        print(f"Teams already seeded ({existing_teams} teams found). Skipping...")
        db.close()
        return
    
    teams_data = [
        # Group A
        {"name": "Argentina", "code": "ARG", "fifa_ranking": 3, "elo_rating": 1773, "confederation": "CONMEBOL", "group_letter": "A"},
        {"name": "Canada", "code": "CAN", "fifa_ranking": 38, "elo_rating": 1541, "confederation": "CONCACAF", "group_letter": "A"},
        {"name": "Morocco", "code": "MAR", "fifa_ranking": 13, "elo_rating": 1658, "confederation": "CAF", "group_letter": "A"},
        {"name": "Ecuador", "code": "ECU", "fifa_ranking": 28, "elo_rating": 1574, "confederation": "CONMEBOL", "group_letter": "A"},
        
        # Group B
        {"name": "France", "code": "FRA", "fifa_ranking": 4, "elo_rating": 1764, "confederation": "UEFA", "group_letter": "B"},
        {"name": "Mexico", "code": "MEX", "fifa_ranking": 15, "elo_rating": 1648, "confederation": "CONCACAF", "group_letter": "B"},
        {"name": "Denmark", "code": "DEN", "fifa_ranking": 21, "elo_rating": 1612, "confederation": "UEFA", "group_letter": "B"},
        {"name": "Australia", "code": "AUS", "fifa_ranking": 42, "elo_rating": 1527, "confederation": "AFC", "group_letter": "B"},
        
        # Group C
        {"name": "Brazil", "code": "BRA", "fifa_ranking": 1, "elo_rating": 1837, "confederation": "CONMEBOL", "group_letter": "C"},
        {"name": "Serbia", "code": "SRB", "fifa_ranking": 29, "elo_rating": 1572, "confederation": "UEFA", "group_letter": "C"},
        {"name": "Switzerland", "code": "SUI", "fifa_ranking": 19, "elo_rating": 1621, "confederation": "UEFA", "group_letter": "C"},
        {"name": "Cameroon", "code": "CMR", "fifa_ranking": 33, "elo_rating": 1558, "confederation": "CAF", "group_letter": "C"},
        
        # Group D
        {"name": "England", "code": "ENG", "fifa_ranking": 5, "elo_rating": 1759, "confederation": "UEFA", "group_letter": "D"},
        {"name": "USA", "code": "USA", "fifa_ranking": 11, "elo_rating": 1668, "confederation": "CONCACAF", "group_letter": "D"},
        {"name": "Wales", "code": "WAL", "fifa_ranking": 32, "elo_rating": 1562, "confederation": "UEFA", "group_letter": "D"},
        {"name": "Iran", "code": "IRN", "fifa_ranking": 20, "elo_rating": 1615, "confederation": "AFC", "group_letter": "D"},
        
        # Group E
        {"name": "Spain", "code": "ESP", "fifa_ranking": 8, "elo_rating": 1716, "confederation": "UEFA", "group_letter": "E"},
        {"name": "Germany", "code": "GER", "fifa_ranking": 12, "elo_rating": 1665, "confederation": "UEFA", "group_letter": "E"},
        {"name": "Japan", "code": "JPN", "fifa_ranking": 17, "elo_rating": 1635, "confederation": "AFC", "group_letter": "E"},
        {"name": "Costa Rica", "code": "CRC", "fifa_ranking": 31, "elo_rating": 1565, "confederation": "CONCACAF", "group_letter": "E"},
        
        # Group F
        {"name": "Portugal", "code": "POR", "fifa_ranking": 6, "elo_rating": 1748, "confederation": "UEFA", "group_letter": "F"},
        {"name": "Netherlands", "code": "NED", "fifa_ranking": 7, "elo_rating": 1731, "confederation": "UEFA", "group_letter": "F"},
        {"name": "Uruguay", "code": "URU", "fifa_ranking": 14, "elo_rating": 1652, "confederation": "CONMEBOL", "group_letter": "F"},
        {"name": "South Korea", "code": "KOR", "fifa_ranking": 23, "elo_rating": 1602, "confederation": "AFC", "group_letter": "F"},
        
        # Group G
        {"name": "Belgium", "code": "BEL", "fifa_ranking": 2, "elo_rating": 1792, "confederation": "UEFA", "group_letter": "G"},
        {"name": "Croatia", "code": "CRO", "fifa_ranking": 10, "elo_rating": 1695, "confederation": "UEFA", "group_letter": "G"},
        {"name": "Poland", "code": "POL", "fifa_ranking": 26, "elo_rating": 1587, "confederation": "UEFA", "group_letter": "G"},
        {"name": "Ghana", "code": "GHA", "fifa_ranking": 61, "elo_rating": 1463, "confederation": "CAF", "group_letter": "G"},
        
        # Group H
        {"name": "Italy", "code": "ITA", "fifa_ranking": 9, "elo_rating": 1709, "confederation": "UEFA", "group_letter": "H"},
        {"name": "Colombia", "code": "COL", "fifa_ranking": 16, "elo_rating": 1642, "confederation": "CONMEBOL", "group_letter": "H"},
        {"name": "Sweden", "code": "SWE", "fifa_ranking": 25, "elo_rating": 1591, "confederation": "UEFA", "group_letter": "H"},
        {"name": "Saudi Arabia", "code": "KSA", "fifa_ranking": 53, "elo_rating": 1488, "confederation": "AFC", "group_letter": "H"},
        
        # Group I
        {"name": "Norway", "code": "NOR", "fifa_ranking": 39, "elo_rating": 1538, "confederation": "UEFA", "group_letter": "I"},
        {"name": "Turkey", "code": "TUR", "fifa_ranking": 24, "elo_rating": 1598, "confederation": "UEFA", "group_letter": "I"},
        {"name": "Chile", "code": "CHI", "fifa_ranking": 27, "elo_rating": 1581, "confederation": "CONMEBOL", "group_letter": "I"},
        {"name": "Nigeria", "code": "NGA", "fifa_ranking": 40, "elo_rating": 1535, "confederation": "CAF", "group_letter": "I"},
        
        # Group J
        {"name": "Senegal", "code": "SEN", "fifa_ranking": 18, "elo_rating": 1628, "confederation": "CAF", "group_letter": "J"},
        {"name": "Tunisia", "code": "TUN", "fifa_ranking": 30, "elo_rating": 1569, "confederation": "CAF", "group_letter": "J"},
        {"name": "Peru", "code": "PER", "fifa_ranking": 22, "elo_rating": 1608, "confederation": "CONMEBOL", "group_letter": "J"},
        {"name": "Qatar", "code": "QAT", "fifa_ranking": 58, "elo_rating": 1476, "confederation": "AFC", "group_letter": "J"},
        
        # Group K
        {"name": "Ukraine", "code": "UKR", "fifa_ranking": 35, "elo_rating": 1552, "confederation": "UEFA", "group_letter": "K"},
        {"name": "Egypt", "code": "EGY", "fifa_ranking": 36, "elo_rating": 1549, "confederation": "CAF", "group_letter": "K"},
        {"name": "Algeria", "code": "ALG", "fifa_ranking": 37, "elo_rating": 1545, "confederation": "CAF", "group_letter": "K"},
        {"name": "Panama", "code": "PAN", "fifa_ranking": 56, "elo_rating": 1481, "confederation": "CONCACAF", "group_letter": "K"},
        
        # Group L
        {"name": "Iceland", "code": "ISL", "fifa_ranking": 62, "elo_rating": 1461, "confederation": "UEFA", "group_letter": "L"},
        {"name": "Iraq", "code": "IRQ", "fifa_ranking": 70, "elo_rating": 1438, "confederation": "AFC", "group_letter": "L"},
        {"name": "Mali", "code": "MLI", "fifa_ranking": 51, "elo_rating": 1494, "confederation": "CAF", "group_letter": "L"},
        {"name": "New Zealand", "code": "NZL", "fifa_ranking": 101, "elo_rating": 1365, "confederation": "OFC", "group_letter": "L"},
    ]
    
    teams = [Team(**team_data) for team_data in teams_data]
    db.add_all(teams)
    db.commit()
    
    print(f"✅ Successfully seeded {len(teams)} teams")
    db.close()


def seed_sample_players():
    """Seed sample player data"""
    db = SessionLocal()
    
    # Check if players already exist
    existing_players = db.query(Player).count()
    if existing_players > 0:
        print(f"Players already seeded ({existing_players} players found). Skipping...")
        db.close()
        return
    
    # Get some teams for reference
    teams = db.query(Team).limit(10).all()
    if not teams:
        print("❌ No teams found. Please seed teams first.")
        db.close()
        return
    
    players_data = [
        # Forwards
        {"name": "Kylian Mbappé", "team_id": teams[1].id, "position": "FW", "age": 27, "club": "Real Madrid", 
         "goals_per_90": 0.95, "xg_season": 28.5, "shots_per_game": 4.2},
        {"name": "Lionel Messi", "team_id": teams[0].id, "position": "FW", "age": 38, "club": "Inter Miami", 
         "goals_per_90": 0.78, "xg_season": 21.3, "shots_per_game": 3.8},
        {"name": "Harry Kane", "team_id": teams[0].id, "position": "FW", "age": 32, "club": "Bayern Munich", 
         "goals_per_90": 0.88, "xg_season": 26.7, "shots_per_game": 4.0},
        {"name": "Vinicius Junior", "team_id": teams[2].id, "position": "FW", "age": 25, "club": "Real Madrid", 
         "goals_per_90": 0.72, "xg_season": 19.8, "shots_per_game": 3.5},
        {"name": "Erling Haaland", "team_id": teams[0].id, "position": "FW", "age": 25, "club": "Manchester City", 
         "goals_per_90": 1.12, "xg_season": 32.1, "shots_per_game": 4.8},
        
        # Goalkeepers
        {"name": "Manuel Neuer", "team_id": teams[4].id, "position": "GK", "age": 40, "club": "Bayern Munich",
         "save_percentage": 78.2, "xg_prevented": 2.4, "clean_sheet_percentage": 45.5},
        {"name": "Alisson Becker", "team_id": teams[2].id, "position": "GK", "age": 33, "club": "Liverpool",
         "save_percentage": 76.8, "xg_prevented": 2.1, "clean_sheet_percentage": 43.2},
        {"name": "Thibaut Courtois", "team_id": teams[6].id, "position": "GK", "age": 34, "club": "Real Madrid",
         "save_percentage": 75.5, "xg_prevented": 1.9, "clean_sheet_percentage": 41.8},
        {"name": "Emiliano Martínez", "team_id": teams[0].id, "position": "GK", "age": 33, "club": "Aston Villa",
         "save_percentage": 77.1, "xg_prevented": 2.2, "clean_sheet_percentage": 44.1},
        {"name": "Ederson", "team_id": teams[2].id, "position": "GK", "age": 32, "club": "Manchester City",
         "save_percentage": 74.9, "xg_prevented": 1.7, "clean_sheet_percentage": 42.3},
    ]
    
    players = [Player(**player_data) for player_data in players_data]
    db.add_all(players)
    db.commit()
    
    print(f"✅ Successfully seeded {len(players)} sample players")
    db.close()


def seed_sample_matches():
    """Seed sample match data (first few matches)"""
    db = SessionLocal()
    
    # Check if matches already exist
    existing_matches = db.query(Match).count()
    if existing_matches > 0:
        print(f"Matches already seeded ({existing_matches} matches found). Skipping...")
        db.close()
        return
    
    # Get teams for matches
    teams = {team.code: team.id for team in db.query(Team).all()}
    
    if not teams:
        print("❌ No teams found. Please seed teams first.")
        db.close()
        return
    
    # Sample matches from Group A and B
    matches_data = [
        # Group A
        {"match_number": 1, "home_team_id": teams["ARG"], "away_team_id": teams["CAN"],
         "match_date": datetime(2026, 6, 11, 21, 0), "venue": "Los Angeles", "match_stage": "GROUP", "group_letter": "A"},
        {"match_number": 2, "home_team_id": teams["MAR"], "away_team_id": teams["ECU"],
         "match_date": datetime(2026, 6, 12, 15, 0), "venue": "Toronto", "match_stage": "GROUP", "group_letter": "A"},
        {"match_number": 17, "home_team_id": teams["ARG"], "away_team_id": teams["MAR"],
         "match_date": datetime(2026, 6, 17, 18, 0), "venue": "New York", "match_stage": "GROUP", "group_letter": "A"},
        {"match_number": 18, "home_team_id": teams["CAN"], "away_team_id": teams["ECU"],
         "match_date": datetime(2026, 6, 17, 15, 0), "venue": "Vancouver", "match_stage": "GROUP", "group_letter": "A"},
        {"match_number": 33, "home_team_id": teams["ARG"], "away_team_id": teams["ECU"],
         "match_date": datetime(2026, 6, 22, 21, 0), "venue": "Miami", "match_stage": "GROUP", "group_letter": "A"},
        {"match_number": 34, "home_team_id": teams["CAN"], "away_team_id": teams["MAR"],
         "match_date": datetime(2026, 6, 22, 21, 0), "venue": "Seattle", "match_stage": "GROUP", "group_letter": "A"},
        
        # Group B
        {"match_number": 3, "home_team_id": teams["FRA"], "away_team_id": teams["MEX"],
         "match_date": datetime(2026, 6, 12, 18, 0), "venue": "Dallas", "match_stage": "GROUP", "group_letter": "B"},
        {"match_number": 4, "home_team_id": teams["DEN"], "away_team_id": teams["AUS"],
         "match_date": datetime(2026, 6, 13, 15, 0), "venue": "Boston", "match_stage": "GROUP", "group_letter": "B"},
    ]
    
    matches = [Match(**match_data) for match_data in matches_data]
    db.add_all(matches)
    db.commit()
    
    print(f"✅ Successfully seeded {len(matches)} sample matches")
    db.close()


def main():
    """Run all seed functions"""
    print("🌱 Starting database seeding...")
    print("-" * 50)
    
    seed_teams()
    seed_sample_players()
    seed_sample_matches()
    
    print("-" * 50)
    print("✅ Database seeding completed!")


if __name__ == "__main__":
    main()
