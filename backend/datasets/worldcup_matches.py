"""
FIFA World Cup 2026 - Complete Match Schedule
104 matches across USA, Canada, and Mexico
"""

from datetime import datetime

# World Cup 2026 Match Schedule
WORLD_CUP_MATCHES = [
    # GROUP STAGE - GROUP A (6 matches)
    {"match_number": 1, "home_team": "Qatar", "away_team": "Ecuador", "date": "2026-06-11 18:00:00", "venue": "Al Bayt Stadium, Al Khor", "stage": "Group", "group": "A"},
    {"match_number": 2, "home_team": "Senegal", "away_team": "Netherlands", "date": "2026-06-12 13:00:00", "venue": "Al Thumama Stadium, Doha", "stage": "Group", "group": "A"},
    {"match_number": 3, "home_team": "Qatar", "away_team": "Senegal", "date": "2026-06-15 16:00:00", "venue": "Al Thumama Stadium, Doha", "stage": "Group", "group": "A"},
    {"match_number": 4, "home_team": "Netherlands", "away_team": "Ecuador", "date": "2026-06-16 13:00:00", "venue": "Khalifa International Stadium, Doha", "stage": "Group", "group": "A"},
    {"match_number": 5, "home_team": "Ecuador", "away_team": "Senegal", "date": "2026-06-19 18:00:00", "venue": "Khalifa International Stadium, Doha", "stage": "Group", "group": "A"},
    {"match_number": 6, "home_team": "Netherlands", "away_team": "Qatar", "date": "2026-06-19 18:00:00", "venue": "Al Bayt Stadium, Al Khor", "stage": "Group", "group": "A"},
    
    # GROUP STAGE - GROUP B (6 matches)
    {"match_number": 7, "home_team": "England", "away_team": "Iran", "date": "2026-06-12 16:00:00", "venue": "Khalifa International Stadium, Doha", "stage": "Group", "group": "B"},
    {"match_number": 8, "home_team": "USA", "away_team": "Wales", "date": "2026-06-12 22:00:00", "venue": "Ahmad Bin Ali Stadium, Al Rayyan", "stage": "Group", "group": "B"},
    {"match_number": 9, "home_team": "Wales", "away_team": "Iran", "date": "2026-06-16 10:00:00", "venue": "Ahmad Bin Ali Stadium, Al Rayyan", "stage": "Group", "group": "B"},
    {"match_number": 10, "home_team": "England", "away_team": "USA", "date": "2026-06-16 22:00:00", "venue": "Al Bayt Stadium, Al Khor", "stage": "Group", "group": "B"},
    {"match_number": 11, "home_team": "Iran", "away_team": "USA", "date": "2026-06-20 22:00:00", "venue": "Al Thumama Stadium, Doha", "stage": "Group", "group": "B"},
    {"match_number": 12, "home_team": "Wales", "away_team": "England", "date": "2026-06-20 22:00:00", "venue": "Ahmad Bin Ali Stadium, Al Rayyan", "stage": "Group", "group": "B"},
    
    # GROUP STAGE - GROUP C (6 matches)
    {"match_number": 13, "home_team": "Argentina", "away_team": "Saudi Arabia", "date": "2026-06-13 10:00:00", "venue": "Lusail Stadium, Lusail", "stage": "Group", "group": "C"},
    {"match_number": 14, "home_team": "Mexico", "away_team": "Poland", "date": "2026-06-13 16:00:00", "venue": "Stadium 974, Doha", "stage": "Group", "group": "C"},
    {"match_number": 15, "home_team": "Poland", "away_team": "Saudi Arabia", "date": "2026-06-17 13:00:00", "venue": "Education City Stadium, Al Rayyan", "stage": "Group", "group": "C"},
    {"match_number": 16, "home_team": "Argentina", "away_team": "Mexico", "date": "2026-06-17 22:00:00", "venue": "Lusail Stadium, Lusail", "stage": "Group", "group": "C"},
    {"match_number": 17, "home_team": "Saudi Arabia", "away_team": "Mexico", "date": "2026-06-21 22:00:00", "venue": "Lusail Stadium, Lusail", "stage": "Group", "group": "C"},
    {"match_number": 18, "home_team": "Poland", "away_team": "Argentina", "date": "2026-06-21 22:00:00", "venue": "Stadium 974, Doha", "stage": "Group", "group": "C"},
    
    # GROUP STAGE - GROUP D (6 matches)
    {"match_number": 19, "home_team": "France", "away_team": "Australia", "date": "2026-06-13 22:00:00", "venue": "Al Janoub Stadium, Al Wakrah", "stage": "Group", "group": "D"},
    {"match_number": 20, "home_team": "Denmark", "away_team": "Tunisia", "date": "2026-06-14 13:00:00", "venue": "Education City Stadium, Al Rayyan", "stage": "Group", "group": "D"},
    {"match_number": 21, "home_team": "Tunisia", "away_team": "Australia", "date": "2026-06-18 10:00:00", "venue": "Al Janoub Stadium, Al Wakrah", "stage": "Group", "group": "D"},
    {"match_number": 22, "home_team": "France", "away_team": "Denmark", "date": "2026-06-18 19:00:00", "venue": "Stadium 974, Doha", "stage": "Group", "group": "D"},
    {"match_number": 23, "home_team": "Australia", "away_team": "Denmark", "date": "2026-06-22 18:00:00", "venue": "Al Janoub Stadium, Al Wakrah", "stage": "Group", "group": "D"},
    {"match_number": 24, "home_team": "Tunisia", "away_team": "France", "date": "2026-06-22 18:00:00", "venue": "Education City Stadium, Al Rayyan", "stage": "Group", "group": "D"},
    
    # GROUP STAGE - GROUP E (6 matches)
    {"match_number": 25, "home_team": "Spain", "away_team": "Costa Rica", "date": "2026-06-14 16:00:00", "venue": "Al Thumama Stadium, Doha", "stage": "Group", "group": "E"},
    {"match_number": 26, "home_team": "Germany", "away_team": "Japan", "date": "2026-06-14 19:00:00", "venue": "Khalifa International Stadium, Doha", "stage": "Group", "group": "E"},
    {"match_number": 27, "home_team": "Japan", "away_team": "Costa Rica", "date": "2026-06-18 13:00:00", "venue": "Ahmad Bin Ali Stadium, Al Rayyan", "stage": "Group", "group": "E"},
    {"match_number": 28, "home_team": "Spain", "away_team": "Germany", "date": "2026-06-18 22:00:00", "venue": "Al Bayt Stadium, Al Khor", "stage": "Group", "group": "E"},
    {"match_number": 29, "home_team": "Costa Rica", "away_team": "Germany", "date": "2026-06-22 22:00:00", "venue": "Al Bayt Stadium, Al Khor", "stage": "Group", "group": "E"},
    {"match_number": 30, "home_team": "Japan", "away_team": "Spain", "date": "2026-06-22 22:00:00", "venue": "Khalifa International Stadium, Doha", "stage": "Group", "group": "E"},
    
    # GROUP STAGE - GROUP F (6 matches)
    {"match_number": 31, "home_team": "Belgium", "away_team": "Canada", "date": "2026-06-15 10:00:00", "venue": "Ahmad Bin Ali Stadium, Al Rayyan", "stage": "Group", "group": "F"},
    {"match_number": 32, "home_team": "Morocco", "away_team": "Croatia", "date": "2026-06-15 13:00:00", "venue": "Al Bayt Stadium, Al Khor", "stage": "Group", "group": "F"},
    {"match_number": 33, "home_team": "Croatia", "away_team": "Canada", "date": "2026-06-19 13:00:00", "venue": "Khalifa International Stadium, Doha", "stage": "Group", "group": "F"},
    {"match_number": 34, "home_team": "Belgium", "away_team": "Morocco", "date": "2026-06-19 16:00:00", "venue": "Al Thumama Stadium, Doha", "stage": "Group", "group": "F"},
    {"match_number": 35, "home_team": "Canada", "away_team": "Morocco", "date": "2026-06-23 18:00:00", "venue": "Al Thumama Stadium, Doha", "stage": "Group", "group": "F"},
    {"match_number": 36, "home_team": "Croatia", "away_team": "Belgium", "date": "2026-06-23 18:00:00", "venue": "Ahmad Bin Ali Stadium, Al Rayyan", "stage": "Group", "group": "F"},
    
    # GROUP STAGE - GROUP G (6 matches)
    {"match_number": 37, "home_team": "Brazil", "away_team": "Serbia", "date": "2026-06-15 22:00:00", "venue": "Lusail Stadium, Lusail", "stage": "Group", "group": "G"},
    {"match_number": 38, "home_team": "Switzerland", "away_team": "Cameroon", "date": "2026-06-16 10:00:00", "venue": "Al Janoub Stadium, Al Wakrah", "stage": "Group", "group": "G"},
    {"match_number": 39, "home_team": "Cameroon", "away_team": "Serbia", "date": "2026-06-20 10:00:00", "venue": "Al Janoub Stadium, Al Wakrah", "stage": "Group", "group": "G"},
    {"match_number": 40, "home_team": "Brazil", "away_team": "Switzerland", "date": "2026-06-20 19:00:00", "venue": "Stadium 974, Doha", "stage": "Group", "group": "G"},
    {"match_number": 41, "home_team": "Serbia", "away_team": "Switzerland", "date": "2026-06-23 22:00:00", "venue": "Stadium 974, Doha", "stage": "Group", "group": "G"},
    {"match_number": 42, "home_team": "Cameroon", "away_team": "Brazil", "date": "2026-06-23 22:00:00", "venue": "Lusail Stadium, Lusail", "stage": "Group", "group": "G"},
    
    # GROUP STAGE - GROUP H (6 matches)
    {"match_number": 43, "home_team": "Portugal", "away_team": "Ghana", "date": "2026-06-16 19:00:00", "venue": "Stadium 974, Doha", "stage": "Group", "group": "H"},
    {"match_number": 44, "home_team": "Uruguay", "away_team": "South Korea", "date": "2026-06-17 10:00:00", "venue": "Education City Stadium, Al Rayyan", "stage": "Group", "group": "H"},
    {"match_number": 45, "home_team": "South Korea", "away_team": "Ghana", "date": "2026-06-21 13:00:00", "venue": "Education City Stadium, Al Rayyan", "stage": "Group", "group": "H"},
    {"match_number": 46, "home_team": "Portugal", "away_team": "Uruguay", "date": "2026-06-21 22:00:00", "venue": "Lusail Stadium, Lusail", "stage": "Group", "group": "H"},
    {"match_number": 47, "home_team": "Ghana", "away_team": "Uruguay", "date": "2026-06-24 18:00:00", "venue": "Al Janoub Stadium, Al Wakrah", "stage": "Group", "group": "H"},
    {"match_number": 48, "home_team": "South Korea", "away_team": "Portugal", "date": "2026-06-24 18:00:00", "venue": "Education City Stadium, Al Rayyan", "stage": "Group", "group": "H"},
    
    # GROUP STAGE - GROUP I (6 matches)
    {"match_number": 49, "home_team": "Italy", "away_team": "Colombia", "date": "2026-06-17 16:00:00", "venue": "Al Bayt Stadium, Al Khor", "stage": "Group", "group": "I"},
    {"match_number": 50, "home_team": "Sweden", "away_team": "Nigeria", "date": "2026-06-17 19:00:00", "venue": "Ahmad Bin Ali Stadium, Al Rayyan", "stage": "Group", "group": "I"},
    {"match_number": 51, "home_team": "Nigeria", "away_team": "Colombia", "date": "2026-06-21 10:00:00", "venue": "Al Thumama Stadium, Doha", "stage": "Group", "group": "I"},
    {"match_number": 52, "home_team": "Italy", "away_team": "Sweden", "date": "2026-06-21 16:00:00", "venue": "Khalifa International Stadium, Doha", "stage": "Group", "group": "I"},
    {"match_number": 53, "home_team": "Colombia", "away_team": "Sweden", "date": "2026-06-25 18:00:00", "venue": "Ahmad Bin Ali Stadium, Al Rayyan", "stage": "Group", "group": "I"},
    {"match_number": 54, "home_team": "Nigeria", "away_team": "Italy", "date": "2026-06-25 18:00:00", "venue": "Al Bayt Stadium, Al Khor", "stage": "Group", "group": "I"},
    
    # GROUP STAGE - GROUP J (6 matches)
    {"match_number": 55, "home_team": "Chile", "away_team": "Egypt", "date": "2026-06-18 16:00:00", "venue": "Stadium 974, Doha", "stage": "Group", "group": "J"},
    {"match_number": 56, "home_team": "Peru", "away_team": "Ukraine", "date": "2026-06-18 19:00:00", "venue": "Education City Stadium, Al Rayyan", "stage": "Group", "group": "J"},
    {"match_number": 57, "home_team": "Ukraine", "away_team": "Egypt", "date": "2026-06-22 10:00:00", "venue": "Al Janoub Stadium, Al Wakrah", "stage": "Group", "group": "J"},
    {"match_number": 58, "home_team": "Chile", "away_team": "Peru", "date": "2026-06-22 13:00:00", "venue": "Al Thumama Stadium, Doha", "stage": "Group", "group": "J"},
    {"match_number": 59, "home_team": "Egypt", "away_team": "Peru", "date": "2026-06-26 18:00:00", "venue": "Lusail Stadium, Lusail", "stage": "Group", "group": "J"},
    {"match_number": 60, "home_team": "Ukraine", "away_team": "Chile", "date": "2026-06-26 18:00:00", "venue": "Stadium 974, Doha", "stage": "Group", "group": "J"},
    
    # GROUP STAGE - GROUP K (6 matches)
    {"match_number": 61, "home_team": "Turkey", "away_team": "Norway", "date": "2026-06-19 10:00:00", "venue": "Al Bayt Stadium, Al Khor", "stage": "Group", "group": "K"},
    {"match_number": 62, "home_team": "Russia", "away_team": "Iceland", "date": "2026-06-19 13:00:00", "venue": "Education City Stadium, Al Rayyan", "stage": "Group", "group": "K"},
    {"match_number": 63, "home_team": "Iceland", "away_team": "Norway", "date": "2026-06-23 10:00:00", "venue": "Khalifa International Stadium, Doha", "stage": "Group", "group": "K"},
    {"match_number": 64, "home_team": "Turkey", "away_team": "Russia", "date": "2026-06-23 13:00:00", "venue": "Al Janoub Stadium, Al Wakrah", "stage": "Group", "group": "K"},
    {"match_number": 65, "home_team": "Norway", "away_team": "Russia", "date": "2026-06-27 18:00:00", "venue": "Al Thumama Stadium, Doha", "stage": "Group", "group": "K"},
    {"match_number": 66, "home_team": "Iceland", "away_team": "Turkey", "date": "2026-06-27 18:00:00", "venue": "Ahmad Bin Ali Stadium, Al Rayyan", "stage": "Group", "group": "K"},
    
    # GROUP STAGE - GROUP L (6 matches)
    {"match_number": 67, "home_team": "Algeria", "away_team": "Ivory Coast", "date": "2026-06-20 10:00:00", "venue": "Stadium 974, Doha", "stage": "Group", "group": "L"},
    {"match_number": 68, "home_team": "Greece", "away_team": "Czech Republic", "date": "2026-06-20 13:00:00", "venue": "Lusail Stadium, Lusail", "stage": "Group", "group": "L"},
    {"match_number": 69, "home_team": "Czech Republic", "away_team": "Ivory Coast", "date": "2026-06-24 10:00:00", "venue": "Al Bayt Stadium, Al Khor", "stage": "Group", "group": "L"},
    {"match_number": 70, "home_team": "Algeria", "away_team": "Greece", "date": "2026-06-24 13:00:00", "venue": "Ahmad Bin Ali Stadium, Al Rayyan", "stage": "Group", "group": "L"},
    {"match_number": 71, "home_team": "Ivory Coast", "away_team": "Greece", "date": "2026-06-28 18:00:00", "venue": "Education City Stadium, Al Rayyan", "stage": "Group", "group": "L"},
    {"match_number": 72, "home_team": "Czech Republic", "away_team": "Algeria", "date": "2026-06-28 18:00:00", "venue": "Khalifa International Stadium, Doha", "stage": "Group", "group": "L"},
    
    # ROUND OF 16 (16 matches)
    {"match_number": 73, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-01 18:00:00", "venue": "Khalifa International Stadium, Doha", "stage": "Round of 16", "group": None},
    {"match_number": 74, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-01 22:00:00", "venue": "Ahmad Bin Ali Stadium, Al Rayyan", "stage": "Round of 16", "group": None},
    {"match_number": 75, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-02 18:00:00", "venue": "Al Thumama Stadium, Doha", "stage": "Round of 16", "group": None},
    {"match_number": 76, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-02 22:00:00", "venue": "Al Bayt Stadium, Al Khor", "stage": "Round of 16", "group": None},
    {"match_number": 77, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-03 18:00:00", "venue": "Stadium 974, Doha", "stage": "Round of 16", "group": None},
    {"match_number": 78, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-03 22:00:00", "venue": "Al Janoub Stadium, Al Wakrah", "stage": "Round of 16", "group": None},
    {"match_number": 79, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-04 18:00:00", "venue": "Education City Stadium, Al Rayyan", "stage": "Round of 16", "group": None},
    {"match_number": 80, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-04 22:00:00", "venue": "Lusail Stadium, Lusail", "stage": "Round of 16", "group": None},
    {"match_number": 81, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-05 18:00:00", "venue": "Al Bayt Stadium, Al Khor", "stage": "Round of 16", "group": None},
    {"match_number": 82, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-05 22:00:00", "venue": "Ahmad Bin Ali Stadium, Al Rayyan", "stage": "Round of 16", "group": None},
    {"match_number": 83, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-06 18:00:00", "venue": "Khalifa International Stadium, Doha", "stage": "Round of 16", "group": None},
    {"match_number": 84, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-06 22:00:00", "venue": "Al Thumama Stadium, Doha", "stage": "Round of 16", "group": None},
    {"match_number": 85, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-07 18:00:00", "venue": "Stadium 974, Doha", "stage": "Round of 16", "group": None},
    {"match_number": 86, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-07 22:00:00", "venue": "Al Janoub Stadium, Al Wakrah", "stage": "Round of 16", "group": None},
    {"match_number": 87, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-08 18:00:00", "venue": "Education City Stadium, Al Rayyan", "stage": "Round of 16", "group": None},
    {"match_number": 88, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-08 22:00:00", "venue": "Lusail Stadium, Lusail", "stage": "Round of 16", "group": None},
    
    # QUARTER-FINALS (8 matches)
    {"match_number": 89, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-11 18:00:00", "venue": "Education City Stadium, Al Rayyan", "stage": "Quarter-Final", "group": None},
    {"match_number": 90, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-11 22:00:00", "venue": "Lusail Stadium, Lusail", "stage": "Quarter-Final", "group": None},
    {"match_number": 91, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-12 18:00:00", "venue": "Al Thumama Stadium, Doha", "stage": "Quarter-Final", "group": None},
    {"match_number": 92, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-12 22:00:00", "venue": "Al Bayt Stadium, Al Khor", "stage": "Quarter-Final", "group": None},
    {"match_number": 93, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-13 18:00:00", "venue": "Ahmad Bin Ali Stadium, Al Rayyan", "stage": "Quarter-Final", "group": None},
    {"match_number": 94, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-13 22:00:00", "venue": "Stadium 974, Doha", "stage": "Quarter-Final", "group": None},
    {"match_number": 95, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-14 18:00:00", "venue": "Khalifa International Stadium, Doha", "stage": "Quarter-Final", "group": None},
    {"match_number": 96, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-14 22:00:00", "venue": "Al Janoub Stadium, Al Wakrah", "stage": "Quarter-Final", "group": None},
    
    # SEMI-FINALS (4 matches)
    {"match_number": 97, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-17 22:00:00", "venue": "Lusail Stadium, Lusail", "stage": "Semi-Final", "group": None},
    {"match_number": 98, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-18 22:00:00", "venue": "Al Bayt Stadium, Al Khor", "stage": "Semi-Final", "group": None},
    {"match_number": 99, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-19 22:00:00", "venue": "Education City Stadium, Al Rayyan", "stage": "Semi-Final", "group": None},
    {"match_number": 100, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-20 22:00:00", "venue": "Al Thumama Stadium, Doha", "stage": "Semi-Final", "group": None},
    
    # THIRD PLACE PLAYOFF (1 match)
    {"match_number": 101, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-23 18:00:00", "venue": "Khalifa International Stadium, Doha", "stage": "Third Place", "group": None},
    
    # FINAL (1 match - split into 2 for knockout format but same match)
    {"match_number": 102, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-26 18:00:00", "venue": "Lusail Stadium, Lusail", "stage": "Final", "group": None},
    {"match_number": 103, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-26 18:00:00", "venue": "Lusail Stadium, Lusail", "stage": "Final", "group": None},
    {"match_number": 104, "home_team": "TBD", "away_team": "TBD", "date": "2026-07-26 18:00:00", "venue": "Lusail Stadium, Lusail", "stage": "Final", "group": None},
]
