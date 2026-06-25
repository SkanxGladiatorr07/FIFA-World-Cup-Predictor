"""
Seed FIFA World Cup 2026 matches with complete schedule
Based on official match schedule with venues and dates
Run with: python -m datasets.seed_matches_2026
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.db.database import SessionLocal
from app.models.team import Team
from app.models.match import Match
from datetime import datetime


def seed_world_cup_2026_matches():
    """Seed all World Cup 2026 matches with venues and dates"""
    db = SessionLocal()
    
    # Get all teams
    teams = {team.code: team.id for team in db.query(Team).all()}
    
    if len(teams) != 48:
        print(f"❌ Error: Expected 48 teams, found {len(teams)}")
        db.close()
        return
    
    print(f"✅ Found {len(teams)} teams")
    
    # Clear existing matches
    print("🗑️  Clearing existing matches...")
    db.query(Match).delete()
    db.commit()
    
    # Group Stage Matches (72 matches total: 6 matches per group × 12 groups)
    # Format: (match_num, date (M/D), home, away, venue, group)
    
    group_matches = [
        # GROUP A
        (1, "6/11", "MEX", "RSA", "Los Angeles", "A"),
        (2, "6/11", "KOR", "CZE", "Guadalajara", "A"),
        (17, "6/16", "RSA", "CZE", "Seattle", "A"),
        (18, "6/16", "KOR", "MEX", "Guadalajara", "A"),
        (33, "6/21", "MEX", "CZE", "Los Angeles", "A"),
        (34, "6/21", "RSA", "KOR", "Seattle", "A"),
        
        # GROUP B
        (3, "6/12", "CAN", "BIH", "Vancouver", "B"),
        (4, "6/12", "QAT", "SUI", "San Francisco Bay Area", "B"),
        (19, "6/17", "BIH", "SUI", "Seattle", "B"),
        (20, "6/17", "QAT", "CAN", "Vancouver", "B"),
        (35, "6/22", "CAN", "SUI", "Vancouver", "B"),
        (36, "6/22", "BIH", "QAT", "Seattle", "B"),
        
        # GROUP C
        (5, "6/12", "BRA", "MAR", "Los Angeles", "C"),
        (6, "6/13", "HAI", "SCO", "Houston", "C"),
        (21, "6/17", "MAR", "SCO", "Houston", "C"),
        (22, "6/17", "HAI", "BRA", "Los Angeles", "C"),
        (37, "6/22", "BRA", "SCO", "Los Angeles", "C"),
        (38, "6/22", "MAR", "HAI", "Houston", "C"),
        
        # GROUP D
        (7, "6/13", "USA", "PAR", "Los Angeles", "D"),
        (8, "6/13", "AUS", "TUR", "San Francisco Bay Area", "D"),
        (23, "6/18", "PAR", "TUR", "San Francisco Bay Area", "D"),
        (24, "6/18", "AUS", "USA", "Los Angeles", "D"),
        (39, "6/23", "USA", "TUR", "Los Angeles", "D"),
        (40, "6/23", "PAR", "AUS", "San Francisco Bay Area", "D"),
        
        # GROUP E
        (9, "6/14", "GER", "CUW", "Seattle", "E"),
        (10, "6/14", "CIV", "ECU", "Houston", "E"),
        (25, "6/19", "CUW", "ECU", "Houston", "E"),
        (26, "6/19", "CIV", "GER", "Seattle", "E"),
        (41, "6/24", "GER", "ECU", "Seattle", "E"),
        (42, "6/24", "CUW", "CIV", "Houston", "E"),
        
        # GROUP F
        (11, "6/14", "NED", "JAP", "Dallas", "F"),
        (12, "6/15", "SWE", "TUN", "Monterrey", "F"),
        (27, "6/19", "JAP", "TUN", "Monterrey", "F"),
        (28, "6/19", "SWE", "NED", "Dallas", "F"),
        (43, "6/24", "NED", "TUN", "Dallas", "F"),
        (44, "6/24", "JAP", "SWE", "Monterrey", "F"),
        
        # GROUP G
        (13, "6/15", "BEL", "EGY", "Kansas City", "G"),
        (14, "6/15", "IRN", "NZL", "Boston", "G"),
        (29, "6/20", "EGY", "NZL", "Boston", "G"),
        (30, "6/20", "IRN", "BEL", "Kansas City", "G"),
        (45, "6/25", "BEL", "NZL", "Kansas City", "G"),
        (46, "6/25", "EGY", "IRN", "Boston", "G"),
        
        # GROUP H
        (15, "6/15", "ESP", "CPV", "Miami", "H"),
        (16, "6/16", "KSA", "URU", "Dallas", "H"),
        (31, "6/20", "CPV", "URU", "Dallas", "H"),
        (32, "6/20", "KSA", "ESP", "Miami", "H"),
        (47, "6/25", "ESP", "URU", "Miami", "H"),
        (48, "6/25", "CPV", "KSA", "Dallas", "H"),
        
        # GROUP I
        (49, "6/16", "FRA", "SEN", "New York New Jersey", "I"),
        (50, "6/16", "IRQ", "NOR", "Boston", "I"),
        (65, "6/21", "SEN", "NOR", "Boston", "I"),
        (66, "6/21", "IRQ", "FRA", "New York New Jersey", "I"),
        (81, "6/26", "FRA", "NOR", "New York New Jersey", "I"),
        (82, "6/26", "SEN", "IRQ", "Boston", "I"),
        
        # GROUP J
        (51, "6/17", "ARG", "ALG", "New York New Jersey", "J"),
        (52, "6/17", "AUT", "JOR", "San Francisco Bay Area", "J"),
        (67, "6/22", "ALG", "JOR", "San Francisco Bay Area", "J"),
        (68, "6/22", "AUT", "ARG", "New York New Jersey", "J"),
        (83, "6/27", "ARG", "JOR", "New York New Jersey", "J"),
        (84, "6/27", "ALG", "AUT", "San Francisco Bay Area", "J"),
        
        # GROUP K
        (53, "6/18", "POR", "DRC", "Atlanta", "K"),
        (54, "6/18", "UZB", "COL", "Mexico City", "K"),
        (69, "6/23", "DRC", "COL", "Mexico City", "K"),
        (70, "6/23", "UZB", "POR", "Atlanta", "K"),
        (85, "6/28", "POR", "COL", "Atlanta", "K"),
        (86, "6/28", "DRC", "UZB", "Mexico City", "K"),
        
        # GROUP L
        (55, "6/18", "ENG", "CRO", "New York New Jersey", "L"),
        (56, "6/19", "GHA", "PAN", "Toronto", "L"),
        (71, "6/23", "CRO", "PAN", "Toronto", "L"),
        (72, "6/24", "GHA", "ENG", "New York New Jersey", "L"),
        (87, "6/28", "ENG", "PAN", "New York New Jersey", "L"),
        (88, "6/28", "CRO", "GHA", "Toronto", "L"),
    ]
    
    matches_to_add = []
    
    for match_num, date_str, home_code, away_code, venue, group in group_matches:
        if home_code not in teams or away_code not in teams:
            print(f"⚠️  Warning: Match {match_num} - Team not found: {home_code} vs {away_code}")
            continue
        
        # Parse date (assuming 2026)
        month, day = map(int, date_str.split('/'))
        match_date = datetime(2026, month, day, 12, 0)  # Default to noon
        
        match = Match(
            match_number=match_num,
            home_team_id=teams[home_code],
            away_team_id=teams[away_code],
            match_date=match_date,
            venue=venue,
            match_stage="GROUP",
            group_letter=group
        )
        matches_to_add.append(match)
    
    # Add knockout stage placeholder matches (32 matches)
    # Round of 32 (16 matches) - June 29 to July 2
    knockout_venues = [
        "Los Angeles", "New York New Jersey", "Dallas", "Miami", "Seattle", 
        "Atlanta", "Houston", "Kansas City", "Philadelphia", "San Francisco Bay Area",
        "Boston", "Toronto", "Vancouver", "Guadalajara", "Mexico City", "Monterrey"
    ]
    
    match_num = 89
    
    # Round of 32 (16 matches)
    print("Adding Round of 32 matches...")
    knockout_dates = [
        datetime(2026, 6, 29, 12, 0),
        datetime(2026, 6, 29, 15, 0),
        datetime(2026, 6, 29, 18, 0),
        datetime(2026, 6, 29, 21, 0),
        datetime(2026, 6, 30, 12, 0),
        datetime(2026, 6, 30, 15, 0),
        datetime(2026, 6, 30, 18, 0),
        datetime(2026, 6, 30, 21, 0),
        datetime(2026, 7, 1, 12, 0),
        datetime(2026, 7, 1, 15, 0),
        datetime(2026, 7, 1, 18, 0),
        datetime(2026, 7, 1, 21, 0),
        datetime(2026, 7, 2, 12, 0),
        datetime(2026, 7, 2, 15, 0),
        datetime(2026, 7, 2, 18, 0),
        datetime(2026, 7, 2, 21, 0),
    ]
    for i in range(16):
        match = Match(
            match_number=match_num,
            home_team_id=None,  # TBD
            away_team_id=None,  # TBD
            match_date=knockout_dates[i],
            venue=knockout_venues[i],
            match_stage="ROUND_OF_32",
            group_letter=None
        )
        matches_to_add.append(match)
        match_num += 1
    
    # Round of 16 (8 matches) - July 4-6
    print("Adding Round of 16 matches...")
    for i in range(8):
        match = Match(
            match_number=match_num,
            home_team_id=None,
            away_team_id=None,
            match_date=datetime(2026, 7, 4 + (i // 3), 12, 0),
            venue=knockout_venues[i],
            match_stage="ROUND_OF_16",
            group_letter=None
        )
        matches_to_add.append(match)
        match_num += 1
    
    # Quarter-finals (4 matches) - July 9-10
    print("Adding Quarter-final matches...")
    for i in range(4):
        match = Match(
            match_number=match_num,
            home_team_id=None,
            away_team_id=None,
            match_date=datetime(2026, 7, 9 + (i // 2), 12, 0),
            venue=knockout_venues[i * 2],
            match_stage="QUARTER_FINAL",
            group_letter=None
        )
        matches_to_add.append(match)
        match_num += 1
    
    # Semi-finals (2 matches) - July 14-15
    print("Adding Semi-final matches...")
    for i in range(2):
        match = Match(
            match_number=match_num,
            home_team_id=None,
            away_team_id=None,
            match_date=datetime(2026, 7, 14 + i, 18, 0),
            venue="Dallas" if i == 0 else "Atlanta",
            match_stage="SEMI_FINAL",
            group_letter=None
        )
        matches_to_add.append(match)
        match_num += 1
    
    # Third place playoff - July 18
    print("Adding Third Place match...")
    match = Match(
        match_number=match_num,
        home_team_id=None,
        away_team_id=None,
        match_date=datetime(2026, 7, 18, 18, 0),
        venue="Miami",
        match_stage="THIRD_PLACE",
        group_letter=None
    )
    matches_to_add.append(match)
    match_num += 1
    
    # Final - July 19
    print("Adding Final match...")
    match = Match(
        match_number=match_num,
        home_team_id=None,
        away_team_id=None,
        match_date=datetime(2026, 7, 19, 18, 0),
        venue="New York New Jersey",
        match_stage="FINAL",
        group_letter=None
    )
    matches_to_add.append(match)
    
    # Add all matches to database
    db.add_all(matches_to_add)
    db.commit()
    
    print(f"\n✅ Successfully seeded {len(matches_to_add)} matches!")
    print(f"   - Group Stage: 72 matches")
    print(f"   - Round of 32: 16 matches")
    print(f"   - Round of 16: 8 matches")
    print(f"   - Quarter-finals: 4 matches")
    print(f"   - Semi-finals: 2 matches")
    print(f"   - Third Place: 1 match")
    print(f"   - Final: 1 match")
    print(f"   Total: {len(matches_to_add)} matches")
    
    db.close()


if __name__ == "__main__":
    print("🌱 Seeding FIFA World Cup 2026 Matches...")
    print("=" * 60)
    seed_world_cup_2026_matches()
    print("=" * 60)
    print("✅ Match seeding completed!")
