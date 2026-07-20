from app.db.database import SessionLocal
from app.models.match import Match
from app.models.team import Team

db = SessionLocal()

for stage in ['SEMI_FINAL', 'THIRD_PLACE', 'FINAL']:
    count = db.query(Match).filter(Match.match_stage == stage).count()
    print(f'{stage}: {count} matches')
    
    if count > 0:
        matches = db.query(Match).filter(Match.match_stage == stage).all()
        for m in matches:
            home = db.query(Team).filter(Team.id == m.home_team_id).first()
            away = db.query(Team).filter(Team.id == m.away_team_id).first()
            print(f'  Match {m.match_number}: {home.code if home else "?"} vs {away.code if away else "?"}')

db.close()
