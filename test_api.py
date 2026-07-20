import requests

# Try without authentication first
url = "http://localhost:8000/api/v1/matches?limit=10"
response = requests.get(url)
print(f'Status: {response.status_code}')
if response.status_code == 200:
    data = response.json()
    print(f'Found {len(data)} matches (limited to 10)')
    if len(data) > 0:
        print(f'First match: {data[0]["match_number"]} - {data[0]["home_team"]["name"]} vs {data[0]["away_team"]["name"]}')

# Try with stage filter
print('\n--- Testing SEMI_FINAL ---')
url = "http://localhost:8000/api/v1/matches?limit=200&stage=SEMI_FINAL"
response = requests.get(url)
print(f'Status: {response.status_code}')
if response.status_code == 200:
    data = response.json()
    print(f'Found {len(data)} SEMI_FINAL matches')
    for m in data:
        print(f'  Match {m["match_number"]}: {m["home_team"]["name"]} vs {m["away_team"]["name"]}')

print('\n--- Testing THIRD_PLACE ---')
url = "http://localhost:8000/api/v1/matches?limit=200&stage=THIRD_PLACE"
response = requests.get(url)
print(f'Status: {response.status_code}')
if response.status_code == 200:
    data = response.json()
    print(f'Found {len(data)} THIRD_PLACE matches')
    for m in data:
        print(f'  Match {m["match_number"]}: {m["home_team"]["name"]} vs {m["away_team"]["name"]}')

print('\n--- Testing FINAL ---')
url = "http://localhost:8000/api/v1/matches?limit=200&stage=FINAL"
response = requests.get(url)
print(f'Status: {response.status_code}')
if response.status_code == 200:
    data = response.json()
    print(f'Found {len(data)} FINAL matches')
    for m in data:
        print(f'  Match {m["match_number"]}: {m["home_team"]["name"]} vs {m["away_team"]["name"]}')
