"""
Seed knockout bracket matches with the exact structure from the bracket image
This creates the Round of 32 matches that feed into Round of 16, then Quarter-finals, Semi-finals, and Final

Run with: python -m datasets.seed_knockout_bracket_2026
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.db.database import SessionLocal
from app.models.team import Team
from app.models.match import Match
from datetime import datetime


def seed_knockout_bracket():
    """
    Seed knockout bracket matches following the exact structure from the image
    Round of 32 → Round of 16 → Quarter-finals → Semi-finals → Final
    """
    db = SessionLocal()
    
    # Get all teams
    teams = {team.code: team.id for team in db.query(Team).all()}
    
    print(f"✅ Found {len(teams)} teams")
    
    # Delete existing knockout matches (keep group stage)
    print("🗑️  Clearing existing knockout matches...")
    db.query(Match).filter(Match.match_stage != "GROUP").delete()
    db.commit()
    
    matches_to_add = []
    match_num = 89  # Start after 88 group stage matches
    
    # Define knockout venues
    venues_r32 = [
        "Los Angeles", "Seattle", "San Francisco Bay Area", "Dallas",
        "Miami", "Atlanta", "Houston", "Kansas City",
        "Philadelphia", "Boston", "New York New Jersey", "Toronto",
        "Vancouver", "Guadalajara", "Mexico City", "Monterrey"
    ]
    
    venues_r16 = [
        "Los Angeles", "Miami", "Dallas", "Atlanta",
        "Kansas City", "Boston", "Philadelphia", "Seattle"
    ]
    
    # ROUND OF 32 MATCHES (16 matches) - June 29 to July 2, 2026
    # Following the bracket structure from left to right, top to bottom
    
    print("\n📋 Creating Round of 32 matches...")
    
    round_of_32_matchups = [
        # Top half of bracket
        ("GERMANY", "PARAGUAY"),      # Match 89
        ("FRANCE", "SWEDEN"),         # Match 90
        ("SOUTH AFRICA", "CANADA"),   # Match 91
        ("NETHERLANDS", "MOROCCO"),   # Match 92
        ("PORTUGAL", "CROATIA"),      # Match 93
        ("SPAIN", "AUSTRIA"),         # Match 94
        ("USA", "BIH"),               # Match 95 (Bosnia and Herzegovina)
        ("BELGIUM", "SENEGAL"),       # Match 96
        
        # Bottom half of bracket
        ("BRAZIL", "JAPAN"),          # Match 97
        ("COTE D'IVOIRE", "NORWAY"),  # Match 98 (Côte d'Ivoire)
        ("MEXICO", "ECUADOR"),        # Match 99
        ("ENGLAND", "CONGO DR"),      # Match 100 (Congo DR)
        ("ARGENTINA", "CABO VERDE"),  # Match 101
        ("AUSTRALIA", "EGYPT"),       # Match 102
        ("SWITZERLAND", "ALGERIA"),   # Match 103
        ("COLOMBIA", "GHANA"),        # Match 104
    ]
    
    # Map country names to team codes
    country_to_code = {
        "GERMANY": "GER",
        "PARAGUAY": "PAR",
        "FRANCE": "FRA",
        "SWEDEN": "SWE",
        "SOUTH AFRICA": "RSA",
        "CANADA": "CAN",
        "NETHERLANDS": "NED",
        "MOROCCO": "MAR",
        "PORTUGAL": "POR",
        "CROATIA": "CRO",
        "SPAIN": "ESP",
        "AUSTRIA": "AUT",
        "USA": "USA",
        "BIH": "BIH",
        "BELGIUM": "BEL",
        "SENEGAL": "SEN",
        "BRAZIL": "BRA",
        "JAPAN": "JAP",
        "COTE D'IVOIRE": "CIV",
        "NORWAY": "NOR",
        "MEXICO": "MEX",
        "ECUADOR": "ECU",
        "ENGLAND": "ENG",
        "CONGO DR": "DRC",
        "ARGENTINA": "ARG",
        "CABO VERDE": "CPV",
        "AUSTRALIA": "AUS",
        "EGYPT": "EGY",
        "SWITZERLAND": "SUI",
        "ALGERIA": "ALG",
        "COLOMBIA": "COL",
        "GHANA": "GHA",
    }
    
    # Create Round of 32 matches with dates spread over 4 days
    date_index = 0
    dates_r32 = []
    for day in range(4):  # June 29, 30, July 1, 2
        for time_slot in [15, 19]:  # 3pm and 7pm each day
            dates_r32.append(datetime(2026, 6, 29 + day, time_slot, 0))
    
    for i, (home_country, away_country) in enumerate(round_of_32_matchups):
        home_code = country_to_code[home_country]
        away_code = country_to_code[away_country]
        
        if home_code not in teams or away_code not in teams:
            print(f"⚠️  Warning: Team not found: {home_code} or {away_code}")
            continue
        
        match = Match(
            match_number=match_num,
            home_team_id=teams[home_code],
            away_team_id=teams[away_code],
            match_date=dates_r32[i],
            venue=venues_r32[i],
            match_stage="ROUND_OF_32",
            group_letter=None
        )
        matches_to_add.append(match)
        print(f"   Match {match_num}: {home_country} vs {away_country} - {venues_r32[i]}")
        match_num += 1
    
    # ROUND OF 16 MATCHES (8 matches) - July 4-6, 2026
    # These will be TBD until Round of 32 completes
    
    print("\n📋 Creating Round of 16 matches (TBD teams)...")
    
    dates_r16 = []
    for day in range(3):  # July 4, 5, 6
        for time_slot in [15, 19]:  # 3pm and 7pm
            if len(dates_r16) < 8:
                dates_r16.append(datetime(2026, 7, 4 + day, time_slot, 0))
    
    for i in range(8):
        match = Match(
            match_number=match_num,
            home_team_id=None,  # TBD - winner from Round of 32
            away_team_id=None,  # TBD - winner from Round of 32
            match_date=dates_r16[i],
            venue=venues_r16[i],
            match_stage="ROUND_OF_16",
            group_letter=None
        )
        matches_to_add.append(match)
        print(f"   Match {match_num}: TBD vs TBD - {venues_r16[i]}")
        match_num += 1
    
    # QUARTER-FINALS (4 matches) - July 9-10, 2026
    
    print("\n📋 Creating Quarter-final matches (TBD teams)...")
    
    dates_qf = [
        datetime(2026, 7, 9, 15, 0),
        datetime(2026, 7, 9, 19, 0),
        datetime(2026, 7, 10, 15, 0),
        datetime(2026, 7, 10, 19, 0),
    ]
    
    venues_qf = ["Los Angeles", "Kansas City", "Miami", "Boston"]
    
    for i in range(4):
        match = Match(
            match_number=match_num,
            home_team_id=None,  # TBD
            away_team_id=None,  # TBD
            match_date=dates_qf[i],
            venue=venues_qf[i],
            match_stage="QUARTER_FINAL",
            group_letter=None
        )
        matches_to_add.append(match)
        print(f"   Match {match_num}: TBD vs TBD - {venues_qf[i]}")
        match_num += 1
    
    # SEMI-FINALS (2 matches) - July 14-15, 2026
    
    print("\n📋 Creating Semi-final matches (TBD teams)...")
    
    dates_sf = [
        datetime(2026, 7, 14, 19, 0),
        datetime(2026, 7, 15, 19, 0),
    ]
    
    venues_sf = ["Dallas", "Atlanta"]
    
    for i in range(2):
        match = Match(
            match_number=match_num,
            home_team_id=None,  # TBD
            away_team_id=None,  # TBD
            match_date=dates_sf[i],
            venue=venues_sf[i],
            match_stage="SEMI_FINAL",
            group_letter=None
        )
        matches_to_add.append(match)
        print(f"   Match {match_num}: TBD vs TBD - {venues_sf[i]}")
        match_num += 1
    
    # THIRD PLACE PLAYOFF - July 18, 2026
    
    print("\n📋 Creating Third Place match (TBD teams)...")
    
    match = Match(
        match_number=match_num,
        home_team_id=None,  # TBD - loser from semi-final 1
        away_team_id=None,  # TBD - loser from semi-final 2
        match_date=datetime(2026, 7, 18, 15, 0),
        venue="Miami",
        match_stage="THIRD_PLACE",
        group_letter=None
    )
    matches_to_add.append(match)
    print(f"   Match {match_num}: TBD vs TBD - Miami")
    match_num += 1
    
    # FINAL - July 19, 2026
    
    print("\n📋 Creating Final match (TBD teams)...")
    
    match = Match(
        match_number=match_num,
        home_team_id=None,  # TBD - winner from semi-final 1
        away_team_id=None,  # TBD - winner from semi-final 2
        match_date=datetime(2026, 7, 19, 18, 0),
        venue="New York New Jersey",
        match_stage="FINAL",
        group_letter=None
    )
    matches_to_add.append(match)
    print(f"   Match {match_num}: TBD vs TBD - New York New Jersey")
    
    # Add all matches to database
    db.add_all(matches_to_add)
    db.commit()
    
    print(f"\n✅ Successfully seeded {len(matches_to_add)} knockout matches!")
    print(f"   - Round of 32: 16 matches (with teams)")
    print(f"   - Round of 16: 8 matches (TBD)")
    print(f"   - Quarter-finals: 4 matches (TBD)")
    print(f"   - Semi-finals: 2 matches (TBD)")
    print(f"   - Third Place: 1 match (TBD)")
    print(f"   - Final: 1 match (TBD)")
    
    db.close()


if __name__ == "__main__":
    print("🌱 Seeding FIFA World Cup 2026 Knockout Bracket...")
    print("=" * 60)
    seed_knockout_bracket()
    print("=" * 60)
    print("✅ Knockout bracket seeding completed!")
