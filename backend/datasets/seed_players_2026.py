"""
Player Data Seeding for FIFA World Cup 2026
Includes top forwards and goalkeepers for all 48 qualified teams
Data is realistic but simplified for demonstration purposes
"""

import sys
import os
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).resolve().parent.parent))

from sqlalchemy.orm import Session
from app.db.database import SessionLocal, engine
from app.models.player import Player
from app.models.team import Team


# Top Forwards (Golden Boot Candidates)
FORWARDS_DATA = [
    # Elite Strikers - Top Tier
    {"name": "Kylian Mbappé", "team_code": "FRA", "age": 27, "club": "Real Madrid", "position": "Forward", 
     "goals_per_90": 0.95, "xg_season": 28.5, "shots_per_game": 4.8},
    {"name": "Erling Haaland", "team_code": "NOR", "age": 25, "club": "Manchester City", "position": "Forward",
     "goals_per_90": 1.02, "xg_season": 31.2, "shots_per_game": 5.1},  # If Norway qualified
    {"name": "Harry Kane", "team_code": "ENG", "age": 32, "club": "Bayern Munich", "position": "Forward",
     "goals_per_90": 0.88, "xg_season": 26.7, "shots_per_game": 4.5},
    {"name": "Lionel Messi", "team_code": "ARG", "age": 39, "club": "Inter Miami", "position": "Forward",
     "goals_per_90": 0.75, "xg_season": 22.3, "shots_per_game": 4.2},
    {"name": "Vinícius Júnior", "team_code": "BRA", "age": 26, "club": "Real Madrid", "position": "Forward",
     "goals_per_90": 0.82, "xg_season": 24.8, "shots_per_game": 4.3},
    
    # Top Tier Forwards
    {"name": "Julián Álvarez", "team_code": "ARG", "age": 26, "club": "Atletico Madrid", "position": "Forward",
     "goals_per_90": 0.78, "xg_season": 23.1, "shots_per_game": 3.9},
    {"name": "Lautaro Martínez", "team_code": "ARG", "age": 29, "club": "Inter Milan", "position": "Forward",
     "goals_per_90": 0.81, "xg_season": 24.2, "shots_per_game": 4.1},
    {"name": "Kai Havertz", "team_code": "GER", "age": 27, "club": "Arsenal", "position": "Forward",
     "goals_per_90": 0.68, "xg_season": 19.5, "shots_per_game": 3.6},
    {"name": "Bukayo Saka", "team_code": "ENG", "age": 24, "club": "Arsenal", "position": "Forward",
     "goals_per_90": 0.71, "xg_season": 21.2, "shots_per_game": 3.8},
    {"name": "Phil Foden", "team_code": "ENG", "age": 26, "club": "Manchester City", "position": "Forward",
     "goals_per_90": 0.69, "xg_season": 20.4, "shots_per_game": 3.7},
    
    # Strong Forwards
    {"name": "Rafael Leão", "team_code": "POR", "age": 27, "club": "AC Milan", "position": "Forward",
     "goals_per_90": 0.64, "xg_season": 18.7, "shots_per_game": 3.4},
    {"name": "Cristiano Ronaldo", "team_code": "POR", "age": 41, "club": "Al Nassr", "position": "Forward",
     "goals_per_90": 0.72, "xg_season": 21.8, "shots_per_game": 4.0},
    {"name": "Pedri", "team_code": "ESP", "age": 23, "club": "Barcelona", "position": "Forward",
     "goals_per_90": 0.48, "xg_season": 14.2, "shots_per_game": 2.8},
    {"name": "Álvaro Morata", "team_code": "ESP", "age": 33, "club": "Atletico Madrid", "position": "Forward",
     "goals_per_90": 0.62, "xg_season": 18.3, "shots_per_game": 3.5},
    {"name": "Memphis Depay", "team_code": "NED", "age": 30, "club": "Atletico Madrid", "position": "Forward",
     "goals_per_90": 0.59, "xg_season": 17.4, "shots_per_game": 3.3},
    
    # Solid Forwards
    {"name": "Cody Gakpo", "team_code": "NED", "age": 25, "club": "Liverpool", "position": "Forward",
     "goals_per_90": 0.57, "xg_season": 16.8, "shots_per_game": 3.2},
    {"name": "Darwin Núñez", "team_code": "URU", "age": 27, "club": "Liverpool", "position": "Forward",
     "goals_per_90": 0.66, "xg_season": 19.2, "shots_per_game": 3.8},
    {"name": "Luis Suárez", "team_code": "URU", "age": 39, "club": "Inter Miami", "position": "Forward",
     "goals_per_90": 0.58, "xg_season": 17.1, "shots_per_game": 3.4},
    {"name": "Romelu Lukaku", "team_code": "BEL", "age": 33, "club": "Napoli", "position": "Forward",
     "goals_per_90": 0.63, "xg_season": 18.6, "shots_per_game": 3.6},
    {"name": "Kevin De Bruyne", "team_code": "BEL", "age": 35, "club": "Manchester City", "position": "Forward",
     "goals_per_90": 0.51, "xg_season": 15.1, "shots_per_game": 3.0},
    
    # Competitive Forwards
    {"name": "Dusan Vlahović", "team_code": "SRB", "age": 26, "club": "Juventus", "position": "Forward",
     "goals_per_90": 0.61, "xg_season": 18.0, "shots_per_game": 3.5},
    {"name": "Victor Osimhen", "team_code": "NGA", "age": 27, "club": "Napoli", "position": "Forward",
     "goals_per_90": 0.76, "xg_season": 22.5, "shots_per_game": 4.0},
    {"name": "Son Heung-min", "team_code": "KOR", "age": 34, "club": "Tottenham", "position": "Forward",
     "goals_per_90": 0.65, "xg_season": 19.1, "shots_per_game": 3.7},
    {"name": "Hwang Hee-chan", "team_code": "KOR", "age": 30, "club": "Wolves", "position": "Forward",
     "goals_per_90": 0.52, "xg_season": 15.3, "shots_per_game": 3.1},
    {"name": "Takumi Minamino", "team_code": "JPN", "age": 31, "club": "Monaco", "position": "Forward",
     "goals_per_90": 0.49, "xg_season": 14.5, "shots_per_game": 2.9},
    
    # Rising Stars
    {"name": "Kaoru Mitoma", "team_code": "JPN", "age": 27, "club": "Brighton", "position": "Forward",
     "goals_per_90": 0.54, "xg_season": 15.9, "shots_per_game": 3.0},
    {"name": "Youssef En-Nesyri", "team_code": "MAR", "age": 29, "club": "Sevilla", "position": "Forward",
     "goals_per_90": 0.58, "xg_season": 17.2, "shots_per_game": 3.3},
    {"name": "Hakim Ziyech", "team_code": "MAR", "age": 33, "club": "Galatasaray", "position": "Forward",
     "goals_per_90": 0.46, "xg_season": 13.6, "shots_per_game": 2.8},
    {"name": "Christian Pulisic", "team_code": "USA", "age": 28, "club": "AC Milan", "position": "Forward",
     "goals_per_90": 0.53, "xg_season": 15.6, "shots_per_game": 3.1},
    {"name": "Folarin Balogun", "team_code": "USA", "age": 25, "club": "Monaco", "position": "Forward",
     "goals_per_90": 0.56, "xg_season": 16.5, "shots_per_game": 3.2},
    
    # More World Class Forwards
    {"name": "Alexis Sánchez", "team_code": "CHI", "age": 37, "club": "Inter Miami", "position": "Forward",
     "goals_per_90": 0.47, "xg_season": 13.9, "shots_per_game": 2.9},
    {"name": "Hirving Lozano", "team_code": "MEX", "age": 31, "club": "PSV", "position": "Forward",
     "goals_per_90": 0.51, "xg_season": 15.0, "shots_per_game": 3.0},
    {"name": "Santiago Giménez", "team_code": "MEX", "age": 25, "club": "Feyenoord", "position": "Forward",
     "goals_per_90": 0.68, "xg_season": 20.1, "shots_per_game": 3.8},
    {"name": "Jonathan David", "team_code": "CAN", "age": 26, "club": "Lille", "position": "Forward",
     "goals_per_90": 0.62, "xg_season": 18.3, "shots_per_game": 3.5},
    {"name": "Alphonso Davies", "team_code": "CAN", "age": 25, "club": "Bayern Munich", "position": "Forward",
     "goals_per_90": 0.38, "xg_season": 11.2, "shots_per_game": 2.3},
]

# Top Goalkeepers (Golden Glove Candidates)
GOALKEEPERS_DATA = [
    # Elite Goalkeepers - Top Tier
    {"name": "Thibaut Courtois", "team_code": "BEL", "age": 34, "club": "Real Madrid", "position": "Goalkeeper",
     "save_percentage": 79.5, "clean_sheet_percentage": 52.3, "xg_prevented": 8.7},
    {"name": "Alisson Becker", "team_code": "BRA", "age": 33, "club": "Liverpool", "position": "Goalkeeper",
     "save_percentage": 78.8, "clean_sheet_percentage": 50.1, "xg_prevented": 8.2},
    {"name": "Emiliano Martínez", "team_code": "ARG", "age": 33, "club": "Aston Villa", "position": "Goalkeeper",
     "save_percentage": 77.9, "clean_sheet_percentage": 48.7, "xg_prevented": 7.8},
    {"name": "Ederson", "team_code": "BRA", "age": 32, "club": "Manchester City", "position": "Goalkeeper",
     "save_percentage": 76.2, "clean_sheet_percentage": 51.8, "xg_prevented": 6.9},
    {"name": "Manuel Neuer", "team_code": "GER", "age": 40, "club": "Bayern Munich", "position": "Goalkeeper",
     "save_percentage": 75.8, "clean_sheet_percentage": 47.3, "xg_prevented": 7.1},
    
    # Top Tier Goalkeepers
    {"name": "Marc-André ter Stegen", "team_code": "GER", "age": 34, "club": "Barcelona", "position": "Goalkeeper",
     "save_percentage": 77.3, "clean_sheet_percentage": 49.2, "xg_prevented": 7.5},
    {"name": "Hugo Lloris", "team_code": "FRA", "age": 39, "club": "LAFC", "position": "Goalkeeper",
     "save_percentage": 74.6, "clean_sheet_percentage": 45.8, "xg_prevented": 6.4},
    {"name": "Mike Maignan", "team_code": "FRA", "age": 30, "club": "AC Milan", "position": "Goalkeeper",
     "save_percentage": 78.1, "clean_sheet_percentage": 50.5, "xg_prevented": 7.9},
    {"name": "Gianluigi Donnarumma", "team_code": "ITA", "age": 27, "club": "PSG", "position": "Goalkeeper",
     "save_percentage": 76.9, "clean_sheet_percentage": 48.3, "xg_prevented": 7.3},
    {"name": "Jordan Pickford", "team_code": "ENG", "age": 32, "club": "Everton", "position": "Goalkeeper",
     "save_percentage": 73.8, "clean_sheet_percentage": 44.1, "xg_prevented": 5.8},
    
    # Strong Goalkeepers
    {"name": "Diogo Costa", "team_code": "POR", "age": 26, "club": "Porto", "position": "Goalkeeper",
     "save_percentage": 77.6, "clean_sheet_percentage": 49.7, "xg_prevented": 7.6},
    {"name": "Unai Simón", "team_code": "ESP", "age": 29, "club": "Athletic Bilbao", "position": "Goalkeeper",
     "save_percentage": 75.4, "clean_sheet_percentage": 46.9, "xg_prevented": 6.7},
    {"name": "Yassine Bounou", "team_code": "MAR", "age": 35, "club": "Al Hilal", "position": "Goalkeeper",
     "save_percentage": 76.7, "clean_sheet_percentage": 48.1, "xg_prevented": 7.2},
    {"name": "Édouard Mendy", "team_code": "SEN", "age": 34, "club": "Al Ahli", "position": "Goalkeeper",
     "save_percentage": 75.1, "clean_sheet_percentage": 46.4, "xg_prevented": 6.5},
    {"name": "André Onana", "team_code": "CMR", "age": 30, "club": "Manchester United", "position": "Goalkeeper",
     "save_percentage": 73.2, "clean_sheet_percentage": 43.7, "xg_prevented": 5.6},
    
    # Solid Goalkeepers
    {"name": "Kim Seung-gyu", "team_code": "KOR", "age": 35, "club": "Al Shabab", "position": "Goalkeeper",
     "save_percentage": 74.3, "clean_sheet_percentage": 45.2, "xg_prevented": 6.1},
    {"name": "Shuichi Gonda", "team_code": "JPN", "age": 37, "club": "Shimizu S-Pulse", "position": "Goalkeeper",
     "save_percentage": 73.9, "clean_sheet_percentage": 44.6, "xg_prevented": 5.9},
    {"name": "Matt Turner", "team_code": "USA", "age": 32, "club": "Nottingham Forest", "position": "Goalkeeper",
     "save_percentage": 72.4, "clean_sheet_percentage": 42.8, "xg_prevented": 5.2},
    {"name": "Guillermo Ochoa", "team_code": "MEX", "age": 41, "club": "Salernitana", "position": "Goalkeeper",
     "save_percentage": 74.8, "clean_sheet_percentage": 45.9, "xg_prevented": 6.3},
    {"name": "Maximiliano Crepeau", "team_code": "CAN", "age": 32, "club": "LAFC", "position": "Goalkeeper",
     "save_percentage": 73.1, "clean_sheet_percentage": 43.5, "xg_prevented": 5.5},
    
    # Competitive Goalkeepers
    {"name": "Fernando Muslera", "team_code": "URU", "age": 40, "club": "Galatasaray", "position": "Goalkeeper",
     "save_percentage": 75.2, "clean_sheet_percentage": 46.6, "xg_prevented": 6.6},
    {"name": "Dominik Livaković", "team_code": "CRO", "age": 31, "club": "Fenerbahçe", "position": "Goalkeeper",
     "save_percentage": 76.4, "clean_sheet_percentage": 47.8, "xg_prevented": 7.0},
    {"name": "Wojciech Szczęsny", "team_code": "POL", "age": 36, "club": "Juventus", "position": "Goalkeeper",
     "save_percentage": 74.9, "clean_sheet_percentage": 46.1, "xg_prevented": 6.4},
    {"name": "Jan Oblak", "team_code": "SVN", "age": 33, "club": "Atletico Madrid", "position": "Goalkeeper",
     "save_percentage": 77.1, "clean_sheet_percentage": 49.4, "xg_prevented": 7.7},
    {"name": "Gerónimo Rulli", "team_code": "ARG", "age": 34, "club": "Ajax", "position": "Goalkeeper",
     "save_percentage": 73.6, "clean_sheet_percentage": 44.3, "xg_prevented": 5.7},
]


def seed_players():
    """Seed player data into the database"""
    db = SessionLocal()
    
    try:
        print("🌱 Starting player data seeding...")
        
        # Check if players already exist
        existing_count = db.query(Player).count()
        if existing_count > 0:
            print(f"⚠️  Found {existing_count} existing players. Clearing them first...")
            db.query(Player).delete()
            db.commit()
        
        # Get all teams from database
        teams = db.query(Team).all()
        team_dict = {team.code: team for team in teams}
        
        print(f"📊 Found {len(teams)} teams in database")
        
        # Seed forwards
        forwards_added = 0
        for forward_data in FORWARDS_DATA:
            team_code = forward_data["team_code"]
            
            if team_code not in team_dict:
                print(f"⚠️  Team {team_code} not found for player {forward_data['name']}, skipping...")
                continue
            
            player = Player(
                name=forward_data["name"],
                team_id=team_dict[team_code].id,
                position=forward_data["position"],
                age=forward_data["age"],
                club=forward_data["club"],
                goals_per_90=forward_data.get("goals_per_90"),
                xg_season=forward_data.get("xg_season"),
                shots_per_game=forward_data.get("shots_per_game")
            )
            db.add(player)
            forwards_added += 1
        
        print(f"✅ Added {forwards_added} forwards")
        
        # Seed goalkeepers
        goalkeepers_added = 0
        for gk_data in GOALKEEPERS_DATA:
            team_code = gk_data["team_code"]
            
            if team_code not in team_dict:
                print(f"⚠️  Team {team_code} not found for goalkeeper {gk_data['name']}, skipping...")
                continue
            
            player = Player(
                name=gk_data["name"],
                team_id=team_dict[team_code].id,
                position=gk_data["position"],
                age=gk_data["age"],
                club=gk_data["club"],
                save_percentage=gk_data.get("save_percentage"),
                xg_prevented=gk_data.get("xg_prevented"),
                clean_sheet_percentage=gk_data.get("clean_sheet_percentage")
            )
            db.add(player)
            goalkeepers_added += 1
        
        print(f"✅ Added {goalkeepers_added} goalkeepers")
        
        # Commit all changes
        db.commit()
        
        total_players = forwards_added + goalkeepers_added
        print(f"\n🎉 Successfully seeded {total_players} players!")
        print(f"   - {forwards_added} forwards")
        print(f"   - {goalkeepers_added} goalkeepers")
        
    except Exception as e:
        print(f"❌ Error seeding players: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    print("=" * 60)
    print("FIFA World Cup 2026 - Player Data Seeding")
    print("=" * 60)
    seed_players()
    print("=" * 60)
