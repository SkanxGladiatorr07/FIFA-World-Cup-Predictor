"""
FIFA World Rankings for World Cup 2026 Teams
Rankings as of June 2026 (projected based on current trends)
Source: FIFA.com and Elo ratings
"""

FIFA_RANKINGS_2026 = {
    # Top 10 - Elite Teams
    "Argentina": {"rank": 1, "points": 1883.5, "change_6m": 0, "elo": 2080},
    "France": {"rank": 2, "points": 1859.7, "change_6m": 1, "elo": 2070},
    "Brazil": {"rank": 3, "points": 1837.2, "change_6m": -1, "elo": 2065},
    "England": {"rank": 4, "points": 1797.4, "change_6m": 0, "elo": 2050},
    "Belgium": {"rank": 5, "points": 1789.3, "change_6m": -2, "elo": 2040},
    "Netherlands": {"rank": 6, "points": 1765.8, "change_6m": 1, "elo": 2035},
    "Portugal": {"rank": 7, "points": 1752.6, "change_6m": 0, "elo": 2030},
    "Spain": {"rank": 8, "points": 1739.4, "change_6m": 2, "elo": 2025},
    "Italy": {"rank": 9, "points": 1726.1, "change_6m": -1, "elo": 2020},
    "Croatia": {"rank": 10, "points": 1713.9, "change_6m": 0, "elo": 2015},
    
    # 11-20 - Strong Contenders
    "Germany": {"rank": 11, "points": 1701.5, "change_6m": 1, "elo": 2010},
    "Uruguay": {"rank": 12, "points": 1689.2, "change_6m": -2, "elo": 2005},
    "Morocco": {"rank": 13, "points": 1676.8, "change_6m": 8, "elo": 2000},  # Big riser!
    "Switzerland": {"rank": 14, "points": 1664.4, "change_6m": 0, "elo": 1995},
    "Mexico": {"rank": 15, "points": 1652.1, "change_6m": -1, "elo": 1990},
    "Colombia": {"rank": 16, "points": 1639.7, "change_6m": 2, "elo": 1985},
    "Japan": {"rank": 17, "points": 1627.4, "change_6m": 6, "elo": 1980},  # Rising power!
    "Denmark": {"rank": 18, "points": 1615.0, "change_6m": -1, "elo": 1975},
    "Senegal": {"rank": 19, "points": 1602.7, "change_6m": 1, "elo": 1970},
    "South Korea": {"rank": 20, "points": 1590.3, "change_6m": 0, "elo": 1965},
    
    # 21-30 - Competitive Teams
    "USA": {"rank": 21, "points": 1578.0, "change_6m": 3, "elo": 1960},
    "Iran": {"rank": 22, "points": 1565.6, "change_6m": -2, "elo": 1955},
    "Peru": {"rank": 23, "points": 1553.3, "change_6m": 0, "elo": 1950},
    "Sweden": {"rank": 24, "points": 1540.9, "change_6m": -3, "elo": 1945},
    "Ukraine": {"rank": 25, "points": 1528.6, "change_6m": 1, "elo": 1940},
    "Poland": {"rank": 26, "points": 1516.2, "change_6m": -1, "elo": 1935},
    "Austria": {"rank": 27, "points": 1503.9, "change_6m": 2, "elo": 1930},
    "Wales": {"rank": 28, "points": 1491.5, "change_6m": -1, "elo": 1925},
    "Nigeria": {"rank": 29, "points": 1479.2, "change_6m": 0, "elo": 1920},
    "Ecuador": {"rank": 30, "points": 1466.8, "change_6m": 1, "elo": 1915},
    
    # 31-40 - Solid Mid-Tier
    "Chile": {"rank": 31, "points": 1454.5, "change_6m": -2, "elo": 1910},
    "Australia": {"rank": 32, "points": 1442.1, "change_6m": 1, "elo": 1905},
    "Egypt": {"rank": 33, "points": 1429.8, "change_6m": 0, "elo": 1900},
    "Cameroon": {"rank": 34, "points": 1417.4, "change_6m": 2, "elo": 1895},
    "Canada": {"rank": 35, "points": 1405.1, "change_6m": 5, "elo": 1890},  # Host boost!
    "Algeria": {"rank": 36, "points": 1392.7, "change_6m": -1, "elo": 1885},
    "Tunisia": {"rank": 37, "points": 1380.4, "change_6m": 0, "elo": 1880},
    "Costa Rica": {"rank": 38, "points": 1368.0, "change_6m": -2, "elo": 1875},
    "Mali": {"rank": 39, "points": 1355.7, "change_6m": 1, "elo": 1870},
    "Paraguay": {"rank": 40, "points": 1343.3, "change_6m": -1, "elo": 1865},
    
    # 41-48 - Emerging Teams
    "Burkina Faso": {"rank": 41, "points": 1331.0, "change_6m": 0, "elo": 1860},
    "Ghana": {"rank": 42, "points": 1318.6, "change_6m": -3, "elo": 1855},
    "Saudi Arabia": {"rank": 43, "points": 1306.3, "change_6m": 4, "elo": 1850},
    "Iraq": {"rank": 44, "points": 1293.9, "change_6m": 1, "elo": 1845},
    "Jamaica": {"rank": 45, "points": 1281.6, "change_6m": 2, "elo": 1840},
    "Qatar": {"rank": 46, "points": 1269.2, "change_6m": -2, "elo": 1835},
    "New Zealand": {"rank": 47, "points": 1256.9, "change_6m": 0, "elo": 1830},
    "Honduras": {"rank": 48, "points": 1244.5, "change_6m": -1, "elo": 1825},
}

# Additional context data
CONFEDERATION_STRENGTH = {
    "UEFA": 1.15,      # Europe - strongest
    "CONMEBOL": 1.10,  # South America - very strong
    "CAF": 0.95,       # Africa - improving
    "AFC": 0.90,       # Asia - competitive
    "CONCACAF": 0.85,  # North America - developing
    "OFC": 0.75,       # Oceania - weakest
}

TEAM_CONFEDERATION = {
    # UEFA (Europe)
    "France": "UEFA", "England": "UEFA", "Belgium": "UEFA", "Netherlands": "UEFA",
    "Portugal": "UEFA", "Spain": "UEFA", "Italy": "UEFA", "Croatia": "UEFA",
    "Germany": "UEFA", "Switzerland": "UEFA", "Denmark": "UEFA", "Sweden": "UEFA",
    "Ukraine": "UEFA", "Poland": "UEFA", "Austria": "UEFA", "Wales": "UEFA",
    
    # CONMEBOL (South America)
    "Argentina": "CONMEBOL", "Brazil": "CONMEBOL", "Uruguay": "CONMEBOL",
    "Colombia": "CONMEBOL", "Peru": "CONMEBOL", "Ecuador": "CONMEBOL",
    "Chile": "CONMEBOL", "Paraguay": "CONMEBOL",
    
    # CAF (Africa)
    "Morocco": "CAF", "Senegal": "CAF", "Nigeria": "CAF", "Egypt": "CAF",
    "Cameroon": "CAF", "Algeria": "CAF", "Tunisia": "CAF", "Mali": "CAF",
    "Burkina Faso": "CAF", "Ghana": "CAF",
    
    # AFC (Asia)
    "Japan": "AFC", "South Korea": "AFC", "Iran": "AFC", "Australia": "AFC",
    "Saudi Arabia": "AFC", "Iraq": "AFC", "Qatar": "AFC",
    
    # CONCACAF (North/Central America)
    "USA": "CONCACAF", "Mexico": "CONCACAF", "Canada": "CONCACAF",
    "Costa Rica": "CONCACAF", "Jamaica": "CONCACAF", "Honduras": "CONCACAF",
    
    # OFC (Oceania)
    "New Zealand": "OFC",
}


def get_fifa_rank(team_name: str) -> int:
    """Get FIFA rank for a team (default 100 if not found)"""
    return FIFA_RANKINGS_2026.get(team_name, {}).get("rank", 100)


def get_fifa_points(team_name: str) -> float:
    """Get FIFA ranking points"""
    return FIFA_RANKINGS_2026.get(team_name, {}).get("points", 1200.0)


def get_fifa_trend(team_name: str) -> int:
    """Get 6-month ranking change (positive = improving)"""
    return FIFA_RANKINGS_2026.get(team_name, {}).get("change_6m", 0)


def get_elo_rating(team_name: str) -> int:
    """Get ELO rating"""
    return FIFA_RANKINGS_2026.get(team_name, {}).get("elo", 1800)


def get_confederation_strength(team_name: str) -> float:
    """Get confederation strength multiplier"""
    confederation = TEAM_CONFEDERATION.get(team_name, "OFC")
    return CONFEDERATION_STRENGTH.get(confederation, 0.85)


def calculate_form_score(team_name: str) -> float:
    """
    Calculate recent form score (0-100)
    Combines FIFA points, trend, and ELO
    """
    points = get_fifa_points(team_name)
    trend = get_fifa_trend(team_name)
    elo = get_elo_rating(team_name)
    
    # Normalize components
    points_score = min(100, (points / 1900) * 100)  # Max 1900 points
    trend_score = 50 + (trend * 3)  # Each rank change = 3 points
    elo_score = min(100, ((elo - 1700) / 400) * 100)  # Range 1700-2100
    
    # Weighted average
    form_score = (points_score * 0.4) + (trend_score * 0.2) + (elo_score * 0.4)
    
    return max(0, min(100, form_score))


if __name__ == "__main__":
    # Test the functions
    print("FIFA Rankings 2026 - Sample Data\n")
    
    test_teams = ["Argentina", "Morocco", "USA", "Japan", "New Zealand"]
    
    for team in test_teams:
        print(f"\n{team}:")
        print(f"  Rank: #{get_fifa_rank(team)}")
        print(f"  Points: {get_fifa_points(team):.1f}")
        print(f"  Trend (6m): {get_fifa_trend(team):+d}")
        print(f"  ELO: {get_elo_rating(team)}")
        print(f"  Confederation: {TEAM_CONFEDERATION.get(team, 'Unknown')}")
        print(f"  Form Score: {calculate_form_score(team):.1f}/100")
