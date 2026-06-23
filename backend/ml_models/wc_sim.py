import joblib
import pandas as pd
import random
from collections import Counter

# =========================
# LOAD MODEL
# =========================

model = joblib.load("match_predictor.joblib")
team_db = joblib.load("team_database.joblib")

DEFAULT = {
    "matches": 1,
    "wins": 0,
    "gf": 1.2,
    "ga": 1.2
}

# =========================
# QUALIFIED TEAMS
# =========================

teams = [
    "Argentina","Brazil","France","Spain",
    "England","Germany","Portugal","Netherlands",
    "Belgium","Croatia","Uruguay","Mexico",
    "USA","Japan","Morocco","South Korea"
]

# =========================
# MATCH FUNCTION
# =========================

def play_match(team1, team2):

    h = team_db.get(team1, DEFAULT)
    a = team_db.get(team2, DEFAULT)

    X = pd.DataFrame([[
        h["wins"]/h["matches"],
        a["wins"]/a["matches"],
        h["gf"]/h["matches"],
        a["gf"]/a["matches"],
        h["ga"]/h["matches"],
        a["ga"]/a["matches"]
    ]], columns=[
        "home_win_rate",
        "away_win_rate",
        "home_gf",
        "away_gf",
        "home_ga",
        "away_ga"
    ])

    probs = model.predict_proba(X)[0]

    result = random.choices(
        [team2, "DRAW", team1],
        weights=probs
    )[0]

    if result == "DRAW":
        return random.choice([team1, team2])

    return result

# =========================
# TOURNAMENT
# =========================

def run_tournament():

    current = teams.copy()
    random.shuffle(current)

    while len(current) > 1:

        winners = []

        for i in range(0, len(current), 2):

            winner = play_match(
                current[i],
                current[i+1]
            )

            winners.append(winner)

        current = winners

    return current[0]

# =========================
# MONTE CARLO
# =========================

results = []

N = 10000

for _ in range(N):
    champion = run_tournament()
    results.append(champion)

counts = Counter(results)

print("\nWORLD CUP WIN PROBABILITIES\n")

for team, wins in counts.most_common():

    probability = wins / N * 100

    print(
        f"{team:<15} {probability:.2f}%"
    )