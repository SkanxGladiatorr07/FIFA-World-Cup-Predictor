"""
Seed ALL 104 World Cup 2026 matches
Run with: docker exec -it worldcup_backend python -m datasets.seed_all_matches
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.db.database import SessionLocal
from app.models.team import Team
from app.models.match import Match
from datasets.worldcup_matches import WORLD_CUP_MATCHES
from datetime import datetime


def seed_all_matches():
    """Seed all 104 World Cup 2026 matches"""
    db = SessionLocal()
    
    try:
        # Check if matches already exist
        existing_matches = db.query(Match).count()
        if existing_matches >= 104:
            print(f"✅ Matches already seeded ({existing_matches} matches found). Skipping...")
            return
        
        # Clear existing matches if less than 104 (partial seed)
        if existing_matches > 0:
            print(f"⚠️  Found {existing_matches} matches. Clearing to reseed all 104...")
            db.query(Match).delete()
            db.commit()
        
        # Get all teams for mapping
        teams = {team.name: team.id for team in db.query(Team).all()}
        
        matches_created = 0
        matches_skipped = 0
        
        for match_data in WORLD_CUP_MATCHES:
            try:
                # For TBD matches (knockout stages), create placeholder entries
                if match_data["home_team"] == "TBD":
                    # Create with NULL team IDs for now (will be updated after group stage)
                    match = Match(
                        match_number=match_data["match_number"],
                        home_team_id=None,  # Will be determined after group stage
                        away_team_id=None,  # Will be determined after group stage
                        match_date=datetime.strptime(match_data["date"], "%Y-%m-%d %H:%M:%S"),
                        venue=match_data["venue"],
                        match_stage=match_data["stage"],
                        group_letter=match_data["group"]
                    )
                else:
                    # Group stage matches with actual teams
                    home_team_id = teams.get(match_data["home_team"])
                    away_team_id = teams.get(match_data["away_team"])
                    
                    if not home_team_id or not away_team_id:
                        print(f"⚠️  Skipping match {match_data['match_number']}: Team not found ({match_data['home_team']} vs {match_data['away_team']})")
                        matches_skipped += 1
                        continue
                    
                    match = Match(
                        match_number=match_data["match_number"],
                        home_team_id=home_team_id,
                        away_team_id=away_team_id,
                        match_date=datetime.strptime(match_data["date"], "%Y-%m-%d %H:%M:%S"),
                        venue=match_data["venue"],
                        match_stage=match_data["stage"],
                        group_letter=match_data["group"]
                    )
                
                db.add(match)
                matches_created += 1
                
            except Exception as e:
                print(f"❌ Error creating match {match_data['match_number']}: {str(e)}")
                matches_skipped += 1
        
        db.commit()
        
        print("\n" + "="*60)
        print(f"✅ Successfully seeded {matches_created} matches!")
        print(f"⚠️  Skipped {matches_skipped} matches")
        print("="*60)
        
        # Show breakdown
        group_matches = db.query(Match).filter(Match.match_stage == "Group").count()
        r16_matches = db.query(Match).filter(Match.match_stage == "Round of 16").count()
        qf_matches = db.query(Match).filter(Match.match_stage == "Quarter-Final").count()
        sf_matches = db.query(Match).filter(Match.match_stage == "Semi-Final").count()
        final_matches = db.query(Match).filter(Match.match_stage.in_(["Third Place", "Final"])).count()
        
        print(f"\n📊 Match Breakdown:")
        print(f"   Group Stage: {group_matches} matches")
        print(f"   Round of 16: {r16_matches} matches")
        print(f"   Quarter-Finals: {qf_matches} matches")
        print(f"   Semi-Finals: {sf_matches} matches")
        print(f"   Finals: {final_matches} matches")
        print(f"   TOTAL: {group_matches + r16_matches + qf_matches + sf_matches + final_matches} matches\n")
        
    except Exception as e:
        print(f"❌ Error seeding matches: {str(e)}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    print("🌱 Seeding all 104 World Cup 2026 matches...")
    print("-" * 60)
    seed_all_matches()
    print("\n✅ Match seeding completed!")
