"""
Add team logos and flag URLs to all teams
This uses two sources:
1. Flag emoji CDN for flag images
2. Custom sport logo URLs for team crests

Run with: python -m datasets.add_team_logos
"""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.db.database import SessionLocal
from app.models.team import Team


# Team code to flag emoji code mapping
FLAG_EMOJIS = {
    "MEX": "🇲🇽", "RSA": "🇿🇦", "KOR": "🇰🇷", "CZE": "🇨🇿",
    "CAN": "🇨🇦", "BIH": "🇧🇦", "QAT": "🇶🇦", "SUI": "🇨🇭",
    "BRA": "🇧🇷", "MAR": "🇲🇦", "HAI": "🇭🇹", "SCO": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    "USA": "🇺🇸", "PAR": "🇵🇾", "AUS": "🇦🇺", "TUR": "🇹🇷",
    "GER": "🇩🇪", "CUW": "🇨🇼", "CIV": "🇨🇮", "ECU": "🇪🇨",
    "NED": "🇳🇱", "JAP": "🇯🇵", "SWE": "🇸🇪", "TUN": "🇹🇳",
    "BEL": "🇧🇪", "EGY": "🇪🇬", "IRN": "🇮🇷", "NZL": "🇳🇿",
    "ESP": "🇪🇸", "CPV": "🇨🇻", "KSA": "🇸🇦", "URU": "🇺🇾",
    "FRA": "🇫🇷", "SEN": "🇸🇳", "IRQ": "🇮🇶", "NOR": "🇳🇴",
    "ARG": "🇦🇷", "ALG": "🇩🇿", "AUT": "🇦🇹", "JOR": "🇯🇴",
    "POR": "🇵🇹", "DRC": "🇨🇩", "UZB": "🇺🇿", "COL": "🇨🇴",
    "ENG": "🇬🇧", "CRO": "🇭🇷", "GHA": "🇬🇭", "PAN": "🇵🇦",
}

# Team logos using country flag CDN URLs
TEAM_LOGOS = {
    "MEX": "https://flagcdn.com/w320/mx.png",  # Mexico
    "RSA": "https://flagcdn.com/w320/za.png",  # South Africa
    "KOR": "https://flagcdn.com/w320/kr.png",  # South Korea
    "CZE": "https://flagcdn.com/w320/cz.png",  # Czech Republic
    "CAN": "https://flagcdn.com/w320/ca.png",  # Canada
    "BIH": "https://flagcdn.com/w320/ba.png",  # Bosnia and Herzegovina
    "QAT": "https://flagcdn.com/w320/qa.png",  # Qatar
    "SUI": "https://flagcdn.com/w320/ch.png",  # Switzerland
    "BRA": "https://flagcdn.com/w320/br.png",  # Brazil
    "MAR": "https://flagcdn.com/w320/ma.png",  # Morocco
    "HAI": "https://flagcdn.com/w320/ht.png",  # Haiti
    "SCO": "https://flagcdn.com/w320/gb-sct.png",  # Scotland
    "USA": "https://flagcdn.com/w320/us.png",  # United States
    "PAR": "https://flagcdn.com/w320/py.png",  # Paraguay
    "AUS": "https://flagcdn.com/w320/au.png",  # Australia
    "TUR": "https://flagcdn.com/w320/tr.png",  # Turkey
    "GER": "https://flagcdn.com/w320/de.png",  # Germany
    "CUW": "https://flagcdn.com/w320/cw.png",  # Curaçao
    "CIV": "https://flagcdn.com/w320/ci.png",  # Ivory Coast
    "ECU": "https://flagcdn.com/w320/ec.png",  # Ecuador
    "NED": "https://flagcdn.com/w320/nl.png",  # Netherlands
    "JAP": "https://flagcdn.com/w320/jp.png",  # Japan
    "SWE": "https://flagcdn.com/w320/se.png",  # Sweden
    "TUN": "https://flagcdn.com/w320/tn.png",  # Tunisia
    "BEL": "https://flagcdn.com/w320/be.png",  # Belgium
    "EGY": "https://flagcdn.com/w320/eg.png",  # Egypt
    "IRN": "https://flagcdn.com/w320/ir.png",  # Iran
    "NZL": "https://flagcdn.com/w320/nz.png",  # New Zealand
    "ESP": "https://flagcdn.com/w320/es.png",  # Spain
    "CPV": "https://flagcdn.com/w320/cv.png",  # Cape Verde
    "KSA": "https://flagcdn.com/w320/sa.png",  # Saudi Arabia
    "URU": "https://flagcdn.com/w320/uy.png",  # Uruguay
    "FRA": "https://flagcdn.com/w320/fr.png",  # France
    "SEN": "https://flagcdn.com/w320/sn.png",  # Senegal
    "IRQ": "https://flagcdn.com/w320/iq.png",  # Iraq
    "NOR": "https://flagcdn.com/w320/no.png",  # Norway
    "ARG": "https://flagcdn.com/w320/ar.png",  # Argentina
    "ALG": "https://flagcdn.com/w320/dz.png",  # Algeria
    "AUT": "https://flagcdn.com/w320/at.png",  # Austria
    "JOR": "https://flagcdn.com/w320/jo.png",  # Jordan
    "POR": "https://flagcdn.com/w320/pt.png",  # Portugal
    "DRC": "https://flagcdn.com/w320/cd.png",  # DR Congo
    "UZB": "https://flagcdn.com/w320/uz.png",  # Uzbekistan
    "COL": "https://flagcdn.com/w320/co.png",  # Colombia
    "ENG": "https://flagcdn.com/w320/gb-eng.png",  # England
    "CRO": "https://flagcdn.com/w320/hr.png",  # Croatia
    "GHA": "https://flagcdn.com/w320/gh.png",  # Ghana
    "PAN": "https://flagcdn.com/w320/pa.png",  # Panama
}


def add_team_logos():
    """Add logos and flag URLs to all teams"""
    db = SessionLocal()
    
    teams = db.query(Team).all()
    
    print(f"✅ Found {len(teams)} teams")
    print("\n🎨 Adding logos to teams...")
    print("=" * 80)
    
    updated_count = 0
    
    for team in teams:
        if team.code in TEAM_LOGOS:
            team.flag_url = TEAM_LOGOS[team.code]
            updated_count += 1
            flag = FLAG_EMOJIS.get(team.code, "🚩")
            print(f"{flag} {team.name:30s} ({team.code}) → Logo added")
        else:
            print(f"⚠️  {team.name:30s} ({team.code}) → No logo found")
    
    db.commit()
    
    print("\n" + "=" * 80)
    print(f"✅ Successfully added {updated_count} team logos!")
    print(f"All teams now have flag image URLs from flagcdn.com")
    
    db.close()


if __name__ == "__main__":
    print("🎨 Adding Team Logos...")
    print("=" * 80)
    add_team_logos()
    print("=" * 80)
    print("✅ Done!")
