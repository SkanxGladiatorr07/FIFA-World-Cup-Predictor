"""
Seed FIFA World Cup 2026 Knockout Stage with ACTUAL results
Based on the complete tournament results provided

Run with: python -m datasets.seed_2026_knockout_results
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.db.database import SessionLocal
from app.models.team import Team
from app.models.match import Match
from datetime import datetime


def seed_knockout_results():
    """Seed all knockout matches with actual results from World Cup 2026"""
    db = SessionLocal()
    
    # Get all teams
    teams = {team.code: team.id for team in db.query(Team).all()}
    
    print(f"✅ Found {len(teams)} teams")
    
    # Clear existing knockout matches (keep group stage)
    print("🗑️  Clearing existing knockout matches...")
    db.query(Match).filter(Match.match_stage != "GROUP").delete()
    db.commit()
    
    matches_to_add = []
    match_num = 89
    
    # Country name to team code mapping
    country_map = {
        "South Africa": "RSA", "Canada": "CAN", "Brazil": "BRA", "Japan": "JAP",
        "Germany": "GER", "Paraguay": "PAR", "Netherlands": "NED", "Morocco": "MAR",
        "Ivory Coast": "CIV", "Norway": "NOR", "France": "FRA", "Sweden": "SWE",
        "Mexico": "MEX", "Ecuador": "ECU", "England": "ENG", "DR Congo": "DRC",
        "Belgium": "BEL", "Senegal": "SEN", "United States": "USA", 
        "Bosnia & Herzegovina": "BIH", "Spain": "ESP", "Austria": "AUT",
        "Portugal": "POR", "Croatia": "CRO", "Switzerland": "SUI", "Algeria": "ALG",
        "Australia": "AUS", "Egypt": "EGY", "Argentina": "ARG", "Cape Verde": "CPV",
        "Colombia": "COL", "Ghana": "GHA"
    }
    
    print("\n📋 ROUND OF 32")
    print("=" * 80)
    
    # ROUND OF 32 MATCHES
    round_of_32 = [
        # (date, home, away, home_score, away_score, venue)
        (datetime(2026, 6, 28, 19, 0), "South Africa", "Canada", 0, 1, "Toronto"),
        (datetime(2026, 6, 29, 15, 0), "Brazil", "Japan", 2, 1, "Miami Gardens"),
        (datetime(2026, 6, 29, 19, 0), "Germany", "Paraguay", 1, 1, "Atlanta"),  # Paraguay won on pens
        (datetime(2026, 6, 29, 19, 0), "Netherlands", "Morocco", 1, 1, "Los Angeles"),  # Morocco won on pens
        (datetime(2026, 6, 30, 15, 0), "Ivory Coast", "Norway", 1, 2, "San Francisco Bay Area"),
        (datetime(2026, 6, 30, 19, 0), "France", "Sweden", 3, 0, "Dallas"),
        (datetime(2026, 6, 30, 19, 0), "Mexico", "Ecuador", 2, 0, "Mexico City"),
        (datetime(2026, 7, 1, 15, 0), "England", "DR Congo", 2, 1, "Vancouver"),
        (datetime(2026, 7, 1, 19, 0), "Belgium", "Senegal", 3, 2, "Houston"),
        (datetime(2026, 7, 1, 19, 0), "United States", "Bosnia & Herzegovina", 2, 0, "Philadelphia"),
        (datetime(2026, 7, 2, 15, 0), "Spain", "Austria", 3, 0, "Seattle"),
        (datetime(2026, 7, 2, 19, 0), "Portugal", "Croatia", 2, 1, "Toronto"),
        (datetime(2026, 7, 2, 19, 0), "Switzerland", "Algeria", 2, 0, "Mexico City"),
        (datetime(2026, 7, 3, 15, 0), "Australia", "Egypt", 1, 1, "Boston"),  # Egypt won on pens
        (datetime(2026, 7, 3, 19, 0), "Argentina", "Cape Verde", 3, 2, "Miami Gardens"),
        (datetime(2026, 7, 3, 19, 0), "Colombia", "Ghana", 1, 0, "Kansas City"),
    ]
    
    for date, home, away, home_score, away_score, venue in round_of_32:
        home_code = country_map[home]
        away_code = country_map[away]
        
        match = Match(
            match_number=match_num,
            home_team_id=teams[home_code],
            away_team_id=teams[away_code],
            match_date=date,
            venue=venue,
            match_stage="ROUND_OF_32",
            home_score=home_score,
            away_score=away_score,
            is_completed=True,
            group_letter=None
        )
        matches_to_add.append(match)
        print(f"Match {match_num:3d}: {home:25s} {home_score}-{away_score} {away:25s} - {venue}")
        match_num += 1
    
    print("\n📋 ROUND OF 16")
    print("=" * 80)
    
    # ROUND OF 16 MATCHES
    round_of_16 = [
        (datetime(2026, 7, 4, 19, 0), "Canada", "Morocco", 0, 3, "Los Angeles"),
        (datetime(2026, 7, 4, 19, 0), "Paraguay", "France", 0, 1, "Atlanta"),
        (datetime(2026, 7, 5, 15, 0), "Brazil", "Norway", 1, 2, "Dallas"),
        (datetime(2026, 7, 5, 19, 0), "Mexico", "England", 2, 3, "Mexico City"),
        (datetime(2026, 7, 6, 15, 0), "Portugal", "Spain", 0, 1, "Toronto"),
        (datetime(2026, 7, 6, 19, 0), "United States", "Belgium", 1, 4, "Houston"),
        (datetime(2026, 7, 7, 15, 0), "Argentina", "Egypt", 3, 2, "Miami Gardens"),
        (datetime(2026, 7, 7, 19, 0), "Switzerland", "Colombia", 0, 0, "Kansas City"),  # Switzerland won on pens
    ]
    
    for date, home, away, home_score, away_score, venue in round_of_16:
        home_code = country_map[home]
        away_code = country_map[away]
        
        match = Match(
            match_number=match_num,
            home_team_id=teams[home_code],
            away_team_id=teams[away_code],
            match_date=date,
            venue=venue,
            match_stage="ROUND_OF_16",
            home_score=home_score,
            away_score=away_score,
            is_completed=True,
            group_letter=None
        )
        matches_to_add.append(match)
        print(f"Match {match_num:3d}: {home:25s} {home_score}-{away_score} {away:25s} - {venue}")
        match_num += 1
    
    print("\n📋 QUARTER-FINALS")
    print("=" * 80)
    
    # QUARTER-FINALS
    quarter_finals = [
        (datetime(2026, 7, 9, 19, 0), "France", "Morocco", 2, 0, "Boston"),
        (datetime(2026, 7, 10, 19, 0), "Spain", "Belgium", 2, 1, "Los Angeles"),
        (datetime(2026, 7, 11, 15, 0), "Norway", "England", 1, 2, "Miami Gardens"),
        (datetime(2026, 7, 11, 19, 0), "Argentina", "Switzerland", 3, 1, "Kansas City"),
    ]
    
    for date, home, away, home_score, away_score, venue in quarter_finals:
        home_code = country_map[home]
        away_code = country_map[away]
        
        match = Match(
            match_number=match_num,
            home_team_id=teams[home_code],
            away_team_id=teams[away_code],
            match_date=date,
            venue=venue,
            match_stage="QUARTER_FINAL",
            home_score=home_score,
            away_score=away_score,
            is_completed=True,
            group_letter=None
        )
        matches_to_add.append(match)
        print(f"Match {match_num:3d}: {home:25s} {home_score}-{away_score} {away:25s} - {venue}")
        match_num += 1
    
    print("\n📋 SEMI-FINALS")
    print("=" * 80)
    
    # SEMI-FINALS
    semi_finals = [
        (datetime(2026, 7, 14, 19, 0), "France", "Spain", 0, 2, "Dallas"),
        (datetime(2026, 7, 15, 19, 0), "England", "Argentina", 1, 2, "Atlanta"),
    ]
    
    for date, home, away, home_score, away_score, venue in semi_finals:
        home_code = country_map[home]
        away_code = country_map[away]
        
        match = Match(
            match_number=match_num,
            home_team_id=teams[home_code],
            away_team_id=teams[away_code],
            match_date=date,
            venue=venue,
            match_stage="SEMI_FINAL",
            home_score=home_score,
            away_score=away_score,
            is_completed=True,
            group_letter=None
        )
        matches_to_add.append(match)
        print(f"Match {match_num:3d}: {home:25s} {home_score}-{away_score} {away:25s} - {venue}")
        match_num += 1
    
    print("\n📋 THIRD PLACE")
    print("=" * 80)
    
    # THIRD PLACE
    match = Match(
        match_number=match_num,
        home_team_id=teams["FRA"],
        away_team_id=teams["ENG"],
        match_date=datetime(2026, 7, 18, 15, 0),
        venue="Miami Gardens",
        match_stage="THIRD_PLACE",
        home_score=4,
        away_score=6,
        is_completed=True,
        group_letter=None
    )
    matches_to_add.append(match)
    print(f"Match {match_num:3d}: {'France':25s} 4-6 {'England':25s} - Miami Gardens")
    match_num += 1
    
    print("\n📋 FINAL")
    print("=" * 80)
    
    # FINAL
    match = Match(
        match_number=match_num,
        home_team_id=teams["ESP"],
        away_team_id=teams["ARG"],
        match_date=datetime(2026, 7, 19, 18, 0),
        venue="New York New Jersey",
        match_stage="FINAL",
        home_score=1,
        away_score=0,
        is_completed=True,
        group_letter=None
    )
    matches_to_add.append(match)
    print(f"Match {match_num:3d}: {'Spain':25s} 1-0 {'Argentina':25s} - New York New Jersey")
    
    # Add all matches to database
    db.add_all(matches_to_add)
    db.commit()
    
    print("\n" + "=" * 80)
    print(f"✅ Successfully seeded {len(matches_to_add)} knockout matches!")
    print(f"   - Round of 32: 16 matches")
    print(f"   - Round of 16: 8 matches")
    print(f"   - Quarter-finals: 4 matches")
    print(f"   - Semi-finals: 2 matches")
    print(f"   - Third Place: 1 match")
    print(f"   - Final: 1 match")
    print("\n🏆 FIFA World Cup 2026 Champion: SPAIN")
    print("🥈 Runner-up: Argentina")
    print("🥉 Third Place: England")
    print("   Fourth Place: France")
    
    db.close()


if __name__ == "__main__":
    print("🌱 Seeding FIFA World Cup 2026 Knockout Results...")
    print("=" * 80)
    seed_knockout_results()
    print("=" * 80)
    print("✅ Knockout seeding completed!")
