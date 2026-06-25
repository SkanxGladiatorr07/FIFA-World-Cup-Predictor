"""
Seed database with FIFA World Cup 2026 teams based on actual draw
Run with: python -m datasets.seed_teams_2026
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.db.database import SessionLocal
from app.models.team import Team


def seed_world_cup_2026_teams():
    """Seed World Cup 2026 teams with correct groups from official draw"""
    db = SessionLocal()
    
    # Import models
    from app.models.match import Match
    from app.models.player import Player
    from app.models.prediction import MatchPrediction, GoldenBootPrediction, GoldenGlovePrediction, Simulation
    
    # Clear in correct order (child tables first due to foreign keys)
    print("🗑️  Clearing existing data...")
    db.query(Simulation).delete()
    db.query(GoldenBootPrediction).delete()
    db.query(GoldenGlovePrediction).delete()
    db.query(MatchPrediction).delete()
    db.query(Match).delete()
    db.query(Player).delete()
    db.query(Team).delete()
    db.commit()
    print("✅ Existing data cleared")
    
    teams_data = [
        # Group A
        {"name": "Mexico", "code": "MEX", "fifa_ranking": 14, "elo_rating": 1648, "confederation": "CONCACAF", "group_letter": "A"},
        {"name": "South Africa", "code": "RSA", "fifa_ranking": 59, "elo_rating": 1478, "confederation": "CAF", "group_letter": "A"},
        {"name": "South Korea", "code": "KOR", "fifa_ranking": 23, "elo_rating": 1602, "confederation": "AFC", "group_letter": "A"},
        {"name": "Czech Republic", "code": "CZE", "fifa_ranking": 35, "elo_rating": 1552, "confederation": "UEFA", "group_letter": "A"},
        
        # Group B
        {"name": "Canada", "code": "CAN", "fifa_ranking": 38, "elo_rating": 1541, "confederation": "CONCACAF", "group_letter": "B"},
        {"name": "Bosnia and Herzegovina", "code": "BIH", "fifa_ranking": 64, "elo_rating": 1458, "confederation": "UEFA", "group_letter": "B"},
        {"name": "Qatar", "code": "QAT", "fifa_ranking": 58, "elo_rating": 1476, "confederation": "AFC", "group_letter": "B"},
        {"name": "Switzerland", "code": "SUI", "fifa_ranking": 19, "elo_rating": 1621, "confederation": "UEFA", "group_letter": "B"},
        
        # Group C
        {"name": "Brazil", "code": "BRA", "fifa_ranking": 4, "elo_rating": 1837, "confederation": "CONMEBOL", "group_letter": "C"},
        {"name": "Morocco", "code": "MAR", "fifa_ranking": 13, "elo_rating": 1658, "confederation": "CAF", "group_letter": "C"},
        {"name": "Haiti", "code": "HAI", "fifa_ranking": 83, "elo_rating": 1421, "confederation": "CONCACAF", "group_letter": "C"},
        {"name": "Scotland", "code": "SCO", "fifa_ranking": 39, "elo_rating": 1538, "confederation": "UEFA", "group_letter": "C"},
        
        # Group D
        {"name": "United States", "code": "USA", "fifa_ranking": 16, "elo_rating": 1642, "confederation": "CONCACAF", "group_letter": "D"},
        {"name": "Paraguay", "code": "PAR", "fifa_ranking": 62, "elo_rating": 1461, "confederation": "CONMEBOL", "group_letter": "D"},
        {"name": "Australia", "code": "AUS", "fifa_ranking": 24, "elo_rating": 1598, "confederation": "AFC", "group_letter": "D"},
        {"name": "Turkey", "code": "TUR", "fifa_ranking": 36, "elo_rating": 1549, "confederation": "UEFA", "group_letter": "D"},
        
        # Group E
        {"name": "Germany", "code": "GER", "fifa_ranking": 15, "elo_rating": 1665, "confederation": "UEFA", "group_letter": "E"},
        {"name": "Curaçao", "code": "CUW", "fifa_ranking": 91, "elo_rating": 1395, "confederation": "CONCACAF", "group_letter": "E"},
        {"name": "Ivory Coast", "code": "CIV", "fifa_ranking": 39, "elo_rating": 1538, "confederation": "CAF", "group_letter": "E"},
        {"name": "Ecuador", "code": "ECU", "fifa_ranking": 30, "elo_rating": 1574, "confederation": "CONMEBOL", "group_letter": "E"},
        
        # Group F
        {"name": "Netherlands", "code": "NED", "fifa_ranking": 7, "elo_rating": 1731, "confederation": "UEFA", "group_letter": "F"},
        {"name": "Japan", "code": "JAP", "fifa_ranking": 17, "elo_rating": 1635, "confederation": "AFC", "group_letter": "F"},
        {"name": "Sweden", "code": "SWE", "fifa_ranking": 25, "elo_rating": 1591, "confederation": "UEFA", "group_letter": "F"},
        {"name": "Tunisia", "code": "TUN", "fifa_ranking": 41, "elo_rating": 1527, "confederation": "CAF", "group_letter": "F"},
        
        # Group G
        {"name": "Belgium", "code": "BEL", "fifa_ranking": 5, "elo_rating": 1759, "confederation": "UEFA", "group_letter": "G"},
        {"name": "Egypt", "code": "EGY", "fifa_ranking": 31, "elo_rating": 1565, "confederation": "CAF", "group_letter": "G"},
        {"name": "Iran", "code": "IRN", "fifa_ranking": 22, "elo_rating": 1615, "confederation": "AFC", "group_letter": "G"},
        {"name": "New Zealand", "code": "NZL", "fifa_ranking": 94, "elo_rating": 1365, "confederation": "OFC", "group_letter": "G"},
        
        # Group H
        {"name": "Spain", "code": "ESP", "fifa_ranking": 8, "elo_rating": 1716, "confederation": "UEFA", "group_letter": "H"},
        {"name": "Cape Verde", "code": "CPV", "fifa_ranking": 66, "elo_rating": 1445, "confederation": "CAF", "group_letter": "H"},
        {"name": "Saudi Arabia", "code": "KSA", "fifa_ranking": 54, "elo_rating": 1488, "confederation": "AFC", "group_letter": "H"},
        {"name": "Uruguay", "code": "URU", "fifa_ranking": 11, "elo_rating": 1668, "confederation": "CONMEBOL", "group_letter": "H"},
        
        # Group I
        {"name": "France", "code": "FRA", "fifa_ranking": 2, "elo_rating": 1792, "confederation": "UEFA", "group_letter": "I"},
        {"name": "Senegal", "code": "SEN", "fifa_ranking": 18, "elo_rating": 1628, "confederation": "CAF", "group_letter": "I"},
        {"name": "Iraq", "code": "IRQ", "fifa_ranking": 68, "elo_rating": 1438, "confederation": "AFC", "group_letter": "I"},
        {"name": "Norway", "code": "NOR", "fifa_ranking": 42, "elo_rating": 1535, "confederation": "UEFA", "group_letter": "I"},
        
        # Group J
        {"name": "Argentina", "code": "ARG", "fifa_ranking": 1, "elo_rating": 1773, "confederation": "CONMEBOL", "group_letter": "J"},
        {"name": "Algeria", "code": "ALG", "fifa_ranking": 37, "elo_rating": 1545, "confederation": "CAF", "group_letter": "J"},
        {"name": "Austria", "code": "AUT", "fifa_ranking": 26, "elo_rating": 1587, "confederation": "UEFA", "group_letter": "J"},
        {"name": "Jordan", "code": "JOR", "fifa_ranking": 87, "elo_rating": 1408, "confederation": "AFC", "group_letter": "J"},
        
        # Group K
        {"name": "Portugal", "code": "POR", "fifa_ranking": 6, "elo_rating": 1748, "confederation": "UEFA", "group_letter": "K"},
        {"name": "DR Congo", "code": "DRC", "fifa_ranking": 61, "elo_rating": 1463, "confederation": "CAF", "group_letter": "K"},
        {"name": "Uzbekistan", "code": "UZB", "fifa_ranking": 60, "elo_rating": 1468, "confederation": "AFC", "group_letter": "K"},
        {"name": "Colombia", "code": "COL", "fifa_ranking": 12, "elo_rating": 1652, "confederation": "CONMEBOL", "group_letter": "K"},
        
        # Group L
        {"name": "England", "code": "ENG", "fifa_ranking": 3, "elo_rating": 1764, "confederation": "UEFA", "group_letter": "L"},
        {"name": "Croatia", "code": "CRO", "fifa_ranking": 10, "elo_rating": 1695, "confederation": "UEFA", "group_letter": "L"},
        {"name": "Ghana", "code": "GHA", "fifa_ranking": 64, "elo_rating": 1456, "confederation": "CAF", "group_letter": "L"},
        {"name": "Panama", "code": "PAN", "fifa_ranking": 55, "elo_rating": 1481, "confederation": "CONCACAF", "group_letter": "L"},
    ]
    
    teams = [Team(**team_data) for team_data in teams_data]
    db.add_all(teams)
    db.commit()
    
    print(f"✅ Successfully seeded {len(teams)} teams for World Cup 2026")
    
    # Print groups
    print("\n📋 Groups Overview:")
    print("-" * 60)
    for group in "ABCDEFGHIJKL":
        group_teams = [t for t in teams_data if t["group_letter"] == group]
        print(f"Group {group}: {', '.join([t['code'] for t in group_teams])}")
    
    db.close()


if __name__ == "__main__":
    print("🌱 Seeding FIFA World Cup 2026 Teams...")
    print("=" * 60)
    seed_world_cup_2026_teams()
    print("=" * 60)
    print("✅ Seeding completed!")
