import joblib
import joblib
import pandas as pd
import numpy as np

# ==========================
# LOAD MODEL & TEAM DATABASE
# ==========================

model = joblib.load("match_predictor.joblib")
team_db = joblib.load("team_database.joblib")

# ==========================
# DEFAULT VALUES
# For teams not present
# ==========================

DEFAULT = {
    "matches": 1,
    "wins": 0,
    "gf": 1.2,
    "ga": 1.2
}

# ==========================
# USER INPUT
# ==========================

home_team = input("Enter Home Team: ").strip()
away_team = input("Enter Away Team: ").strip()

# ==========================
# GET TEAM STATS
# ==========================

h = team_db.get(home_team, DEFAULT)
a = team_db.get(away_team, DEFAULT)

home_win_rate = h["wins"] / h["matches"]
away_win_rate = a["wins"] / a["matches"]

home_gf = h["gf"] / h["matches"]
away_gf = a["gf"] / a["matches"]

home_ga = h["ga"] / h["matches"]
away_ga = a["ga"] / a["matches"]

# ==========================
# CREATE FEATURE VECTOR
# ==========================

X = pd.DataFrame([[
    home_win_rate,
    away_win_rate,
    home_gf,
    away_gf,
    home_ga,
    away_ga
]], columns=[
    "home_win_rate",
    "away_win_rate",
    "home_gf",
    "away_gf",
    "home_ga",
    "away_ga"
])

# ==========================
# PREDICT PROBABILITIES
# ==========================

prob = model.predict_proba(X)[0]

away_win_prob = prob[0]
draw_prob = prob[1]
home_win_prob = prob[2]

print("\n====================================")
print("MATCH PREDICTION")
print("====================================")

print(f"{home_team} Win : {home_win_prob*100:.2f}%")
print(f"Draw            : {draw_prob*100:.2f}%")
print(f"{away_team} Win : {away_win_prob*100:.2f}%")

# ==========================
# EXPECTED GOALS
# ==========================

home_attack = home_gf
away_attack = away_gf

home_defense = home_ga
away_defense = away_ga

home_xg = (home_attack + away_defense) / 2
away_xg = (away_attack + home_defense) / 2

# Adjust xG based on ML confidence

if home_win_prob > 0.60:
    home_xg *= 1.25
    away_xg *= 0.85

elif away_win_prob > 0.60:
    away_xg *= 1.25
    home_xg *= 0.85

home_xg = max(0.3, home_xg)
away_xg = max(0.3, away_xg)

# ==========================
# PREDICT MATCH RESULT
# ==========================

pred_class = model.predict(X)[0]

# 0 = Away Win
# 1 = Draw
# 2 = Home Win

# ==========================
# GENERATE SCORELINE
# ==========================

for _ in range(10000):

    home_score = np.random.poisson(home_xg)
    away_score = np.random.poisson(away_xg)

    if pred_class == 2 and home_score > away_score:
        break

    elif pred_class == 0 and away_score > home_score:
        break

    elif pred_class == 1 and home_score == away_score:
        break

# ==========================
# DISPLAY SCORELINE
# ==========================

print("\n====================================")
print("PREDICTED SCORELINE")
print("====================================")

print(f"{home_team} {home_score} - {away_score} {away_team}")

# ==========================
# DISPLAY RESULT
# ==========================

print("\n====================================")
print("PREDICTED RESULT")
print("====================================")

if pred_class == 2:
    print(f"{home_team} WIN")

elif pred_class == 0:
    print(f"{away_team} WIN")

else:
    print("DRAW")