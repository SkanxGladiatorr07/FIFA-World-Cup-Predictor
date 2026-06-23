import pandas as pd
import numpy as np
import joblib

from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# =====================
# LOAD DATA
# =====================

df = pd.read_csv("matches.csv")

df["match_date"] = pd.to_datetime(df["match_date"])
df = df.sort_values("match_date")

# =====================
# TARGET
# 0 = Away Win
# 1 = Draw
# 2 = Home Win
# =====================

def get_result(row):
    if row["home_team_score"] > row["away_team_score"]:
        return 2
    elif row["home_team_score"] < row["away_team_score"]:
        return 0
    return 1

df["target"] = df.apply(get_result, axis=1)

# =====================
# BUILD TEAM HISTORY
# =====================

team_db = {}

features = []

for _, row in df.iterrows():

    home = row["home_team_name"]
    away = row["away_team_name"]

    if home not in team_db:
        team_db[home] = {
            "matches":0,
            "wins":0,
            "gf":0,
            "ga":0
        }

    if away not in team_db:
        team_db[away] = {
            "matches":0,
            "wins":0,
            "gf":0,
            "ga":0
        }

    h = team_db[home]
    a = team_db[away]

    home_win_rate = h["wins"]/h["matches"] if h["matches"] else 0.50
    away_win_rate = a["wins"]/a["matches"] if a["matches"] else 0.50

    home_gf = h["gf"]/h["matches"] if h["matches"] else 1.2
    away_gf = a["gf"]/a["matches"] if a["matches"] else 1.2

    home_ga = h["ga"]/h["matches"] if h["matches"] else 1.2
    away_ga = a["ga"]/a["matches"] if a["matches"] else 1.2

    features.append([
        home_win_rate,
        away_win_rate,
        home_gf,
        away_gf,
        home_ga,
        away_ga
    ])

    # update history

    h["matches"] += 1
    a["matches"] += 1

    h["gf"] += row["home_team_score"]
    h["ga"] += row["away_team_score"]

    a["gf"] += row["away_team_score"]
    a["ga"] += row["home_team_score"]

    if row["home_team_score"] > row["away_team_score"]:
        h["wins"] += 1
    elif row["away_team_score"] > row["home_team_score"]:
        a["wins"] += 1

X = pd.DataFrame(features, columns=[
    "home_win_rate",
    "away_win_rate",
    "home_gf",
    "away_gf",
    "home_ga",
    "away_ga"
])

y = df["target"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

model = XGBClassifier(
    objective="multi:softprob",
    num_class=3,
    n_estimators=500,
    max_depth=6,
    learning_rate=0.03,
    subsample=0.8,
    colsample_bytree=0.8,
    eval_metric="mlogloss"
)

model.fit(X_train, y_train)

pred = model.predict(X_test)

print(
    "Accuracy =",
    round(accuracy_score(y_test,pred)*100,2),
    "%"
)

joblib.dump(model,"match_predictor.joblib")
joblib.dump(team_db,"team_database.joblib")

print("Model Saved")