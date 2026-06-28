"""
Helper script to update knockout matches with winning teams
Usage: python -m datasets.update_knockout_match <match_number> <home_team_code> <away_team_code>

Example:
    python -m datasets.update_knockout_match 105 GER FRA
    This sets Match 105 to Germany vs France
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.db.database import SessionLocal
from app.models.team import Team
from app.models.match import Match


def update_knockout_match(match_number: int, home_code: str = None, away_code: str = None):
    """Update a knockout match with team codes"""
    db = SessionLocal()
    
    # Get the match
    match = db.query(Match).filter(Match.match_number == match_number).first()
    
    if not match:
        print(f"❌ Match number {match_number} not found!")
        db.close()
        return
    
    if match.match_stage == "GROUP":
        print(f"❌ Cannot modify group stage matches!")
        db.close()
        return
    
    # Get teams
    teams = {team.code: team for team in db.query(Team).all()}
    
    original_home = None
    original_away = None
    
    if match.home_team_id:
        original_home = db.query(Team).filter(Team.id == match.home_team_id).first()
    if match.away_team_id:
        original_away = db.query(Team).filter(Team.id == match.away_team_id).first()
    
    print(f"\n📋 Match {match_number} ({match.match_stage})")
    print(f"   Current: {original_home.name if original_home else 'TBD'} vs {original_away.name if original_away else 'TBD'}")
    
    # Update home team
    if home_code:
        home_code = home_code.upper()
        if home_code not in teams:
            print(f"❌ Home team code '{home_code}' not found!")
            db.close()
            return
        match.home_team_id = teams[home_code].id
    
    # Update away team
    if away_code:
        away_code = away_code.upper()
        if away_code not in teams:
            print(f"❌ Away team code '{away_code}' not found!")
            db.close()
            return
        match.away_team_id = teams[away_code].id
    
    db.commit()
    db.refresh(match)
    
    # Get updated teams
    new_home = db.query(Team).filter(Team.id == match.home_team_id).first() if match.home_team_id else None
    new_away = db.query(Team).filter(Team.id == match.away_team_id).first() if match.away_team_id else None
    
    print(f"   Updated: {new_home.name if new_home else 'TBD'} vs {new_away.name if new_away else 'TBD'}")
    print(f"✅ Match updated successfully!")
    
    db.close()


def list_knockout_matches():
    """List all knockout matches with their current status"""
    db = SessionLocal()
    
    stages = ["ROUND_OF_32", "ROUND_OF_16", "QUARTER_FINAL", "SEMI_FINAL", "THIRD_PLACE", "FINAL"]
    
    for stage in stages:
        matches = db.query(Match).filter(Match.match_stage == stage).order_by(Match.match_number).all()
        
        if not matches:
            continue
        
        print(f"\n{'='*80}")
        print(f"{stage.replace('_', ' ')}")
        print(f"{'='*80}")
        
        for match in matches:
            home_team = db.query(Team).filter(Team.id == match.home_team_id).first() if match.home_team_id else None
            away_team = db.query(Team).filter(Team.id == match.away_team_id).first() if match.away_team_id else None
            
            home_name = f"{home_team.name} ({home_team.code})" if home_team else "TBD"
            away_name = f"{away_team.name} ({away_team.code})" if away_team else "TBD"
            
            date_str = match.match_date.strftime("%b %d, %Y %I:%M %p")
            
            print(f"Match {match.match_number:3d}: {home_name:30s} vs {away_name:30s}")
            print(f"             {date_str} - {match.venue}")
    
    db.close()


def show_usage():
    """Show usage instructions"""
    print("\n" + "="*80)
    print("KNOCKOUT BRACKET UPDATER - FIFA World Cup 2026")
    print("="*80)
    print("\nUsage:")
    print("  List all knockout matches:")
    print("    python -m datasets.update_knockout_match list")
    print("\n  Update a specific match:")
    print("    python -m datasets.update_knockout_match <match_number> <home_code> <away_code>")
    print("\n  Update only home team:")
    print("    python -m datasets.update_knockout_match <match_number> <home_code>")
    print("\n  Update only away team:")
    print("    python -m datasets.update_knockout_match <match_number> - <away_code>")
    print("\nExamples:")
    print("  python -m datasets.update_knockout_match list")
    print("  python -m datasets.update_knockout_match 105 GER FRA")
    print("  python -m datasets.update_knockout_match 105 BRA")
    print("  python -m datasets.update_knockout_match 105 - ARG")
    print("\nAvailable Team Codes:")
    
    db = SessionLocal()
    teams = db.query(Team).order_by(Team.name).all()
    
    for i in range(0, len(teams), 4):
        row_teams = teams[i:i+4]
        print("  " + "  ".join([f"{t.code:3s} = {t.name:20s}" for t in row_teams]))
    
    db.close()


if __name__ == "__main__":
    if len(sys.argv) < 2:
        show_usage()
        sys.exit(0)
    
    command = sys.argv[1].lower()
    
    if command == "list":
        list_knockout_matches()
    elif command in ["help", "-h", "--help"]:
        show_usage()
    else:
        try:
            match_num = int(sys.argv[1])
            home_code = sys.argv[2] if len(sys.argv) > 2 and sys.argv[2] != "-" else None
            away_code = sys.argv[3] if len(sys.argv) > 3 else None
            
            update_knockout_match(match_num, home_code, away_code)
        except ValueError:
            print("❌ Invalid match number!")
            show_usage()
        except IndexError:
            print("❌ Missing arguments!")
            show_usage()
