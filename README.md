# ⚽ FIFA World Cup 2026 Prediction Platform

An AI-powered prediction platform for the FIFA World Cup 2026, featuring match predictions, tournament simulations, and player award predictions.

![Python](https://img.shields.io/badge/Python-3.11-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)

---

## 🎯 Features

### 🎲 Match Predictor
- Predict scores for all 104 World Cup matches (48 group stage + 56 knockout)
- **AI-powered probability predictions** using XGBoost ML model with FIFA rankings, ELO ratings, and team form
- Real-time prediction bars (Home Win | Draw | Away Win)
- Score input with keyboard entry (0-10 validation)
- Filter by stage, group, and team search
- Edit predictions anytime before match starts

### 🏆 Tournament Simulator
- Monte Carlo simulations (100-10,000 runs)
- Adjustable randomness factor (0.0-0.5)
- **Winner, Runner-up, and Third Place** probabilities with guaranteed unique teams
- Top 8 team predictions with visual probability bars
- Simulation history tracking

### ⚡ Match Simulator
- Simulate individual matches for detailed score analysis
- Score probability distribution (top 10 most likely scores)
- Most likely score prediction
- Configurable simulation count (1,000-100,000)
- Visual probability bars

### ⚽ Golden Boot Predictor
- Top forwards with current season statistics
- Player stats: Goals/90, Shots/Game, Age, Club
- AI predicted tournament goals with confidence scores
- Search and filter functionality
- Vibrant gradient UI with animated selection
- Save and update predictions

### 🧤 Golden Glove Predictor
- Top goalkeepers with current season statistics
- Player stats: Save %, Clean Sheets %, Age, Club
- AI predicted saves with confidence scores
- Search and filter functionality
- Vibrant gradient UI with goalkeeper-themed colors
- Save and update predictions

### 📊 User Dashboard
- Real-time statistics tracking
- Quick action cards for all features
- Prediction history
- Modern, responsive UI with animations

---

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python 3.11)
- **Database**: PostgreSQL 15 (Alpine)
- **ORM**: SQLAlchemy 2.0
- **Authentication**: JWT with bcrypt hashing
- **Migrations**: Alembic
- **ML Models**: XGBoost, scikit-learn, pandas, numpy
- **API Server**: Uvicorn (ASGI)

### Frontend
- **Framework**: Next.js 14 (React 18 + TypeScript)
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Charts**: Recharts
- **UI Components**: Headless UI, Heroicons
- **Notifications**: react-hot-toast
- **Date Handling**: date-fns

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL with health checks
- **Port Configuration**: 
  - Frontend: `3001`
  - Backend: `8000`
  - Database: `5432`

---

## 🚀 Quick Start

### Prerequisites
- **Docker Desktop** installed and running
- **Git** installed
- **8GB+ RAM** recommended
- **Windows/Mac/Linux** supported

### Installation

#### Option 1: Automated Script (Windows)
```cmd
# Clone the repository
git clone <your-repo-url>
cd "FIFA World Cup Real"

# Run the automated script
start-app.bat
```

The script will:
1. Start Docker containers
2. Run database migrations
3. Seed all data (48 teams, 50 players, 104 matches)
4. Wait for services to be ready

#### Option 2: Manual Docker Compose
```bash
# Clone the repository
git clone <your-repo-url>
cd "FIFA World Cup Real"

# Start all services
docker-compose up -d

# Check services are running
docker ps

# View logs (optional)
docker-compose logs -f
```

### Access the Application

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/api/docs
- **Health Check**: http://localhost:8000/health

### Create Your Account

1. Navigate to http://localhost:3001
2. Click **"Sign Up"**
3. Register with:
   - Username: 3-20 characters
   - Email: Valid email format
   - Password: 8+ characters (must include uppercase, lowercase, and number)
4. Login and start predicting!

---

## 📊 Data Structure

### Database Tables

The application uses **8 main tables**:

1. **users** - User accounts with hashed passwords
2. **teams** - 48 World Cup teams with FIFA rankings, ELO ratings, and group assignments
3. **players** - Players with position, club, age, and performance statistics
4. **matches** - 104 World Cup matches (48 group + 56 knockout)
5. **match_predictions** - User score predictions for matches
6. **golden_boot_predictions** - Top scorer predictions
7. **golden_glove_predictions** - Best goalkeeper predictions
8. **simulations** - Tournament simulation history

### Seeded Data

- **48 Teams** across Groups A-L (2026 format with 12 groups of 4)
- **50 Players** (27 forwards + 20 goalkeepers) with real stats
- **104 Matches** (48 group stage + 56 knockout matches)
- **FIFA Rankings** (2026 projected rankings integrated into ML model)

### Teams by Group

**Group A**: Argentina (1), Canada (47), Peru (22), Jamaica (54)  
**Group B**: Spain (8), Mexico (12), Nigeria (42), Bosnia and Herzegovina (64)  
**Group C**: Brazil (4), USA (13), Japan (26), Costa Rica (52)  
**Group D**: England (5), Colombia (17), Senegal (20), Iran (21)  
**Group E**: France (2), Netherlands (7), Ecuador (30), Saudi Arabia (56)  
**Group F**: Belgium (3), Italy (10), Denmark (18), Egypt (36)  
**Group G**: Portugal (6), Uruguay (14), Switzerland (19), Morocco (15)  
**Group H**: Germany (11), Croatia (9), South Korea (23), Australia (25)  
**Group I**: Poland (31), Ukraine (24), Turkey (27), Chile (43)  
**Group J**: Sweden (16), Austria (32), Czech Republic (33), Tunisia (41)  
**Group K**: Serbia (29), Greece (44), Romania (48), Venezuela (61)  
**Group L**: Wales (28), Norway (37), Scotland (38), Finland (62)

---

## 🎮 Usage Guide

### Making Predictions

#### Match Predictor
1. Navigate to **Dashboard → Match Predictor**
2. Browse matches or use filters (Stage/Group/Team)
3. Enter home and away scores (0-10)
4. **AI prediction bars** show win probabilities
5. Click **"Submit Prediction"**
6. Edit anytime before match starts

#### Golden Boot (Top Scorer)
1. Navigate to **Dashboard → Golden Boot**
2. Review top forwards with stats and AI predictions
3. Use search to find specific players
4. Click a player card to select
5. Click **"Submit Prediction"**

#### Golden Glove (Best Goalkeeper)
1. Navigate to **Dashboard → Golden Glove**
2. Review top goalkeepers with stats and AI predictions
3. Use search to find specific players
4. Click a goalkeeper card to select
5. Click **"Submit Prediction"**

### Running Simulations

#### Tournament Simulator
1. Navigate to **Dashboard → Tournament Simulator**
2. Set simulation count (100-10,000)
3. Adjust randomness factor (0.0 = deterministic, 0.5 = maximum randomness)
4. Click **"Run Tournament Simulation"**
5. View winner, runner-up, and third place probabilities
6. Results are saved to simulation history

#### Match Simulator
1. Navigate to **Dashboard → Match Simulator**
2. Select a match from the dropdown
3. Set simulation count (1,000-100,000)
4. Click **"Run Simulation"**
5. View top 10 most likely scores with probabilities

---

## 🔧 Development Setup

### Project Structure
```
FIFA World Cup Real/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── dependencies.py      # Auth & DB dependencies
│   │   │   └── routes/              # API endpoints
│   │   │       ├── auth.py          # Authentication
│   │   │       ├── matches.py       # Match operations
│   │   │       ├── players.py       # Player & awards
│   │   │       ├── simulations.py   # Simulations
│   │   │       ├── teams.py         # Team operations
│   │   │       └── users.py         # User management
│   │   ├── core/
│   │   │   ├── config.py            # Environment config
│   │   │   └── security.py          # JWT & password hashing
│   │   ├── db/
│   │   │   └── database.py          # SQLAlchemy setup
│   │   ├── models/                  # Database models
│   │   ├── schemas/                 # Pydantic schemas
│   │   ├── main.py                  # FastAPI app
│   │   └── ml_service.py            # ML predictions
│   ├── alembic/                     # Database migrations
│   ├── datasets/                    # Seed data
│   │   ├── fifa_rankings_2026.py
│   │   ├── seed_teams_2026.py
│   │   ├── seed_players_2026.py
│   │   └── seed_matches_2026.py
│   ├── ml_models/                   # Trained ML models
│   │   ├── match_predictor.joblib
│   │   ├── home_encoder.joblib
│   │   ├── away_encoder.joblib
│   │   ├── stage_encoder.joblib
│   │   ├── team_database.joblib
│   │   ├── predict.py
│   │   └── wc_sim.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── alembic.ini
├── frontend/
│   ├── app/
│   │   ├── auth/                    # Auth pages
│   │   ├── dashboard/               # Protected pages
│   │   │   ├── page.tsx            # Main dashboard
│   │   │   ├── match-predictor/
│   │   │   ├── tournament-simulator/
│   │   │   ├── match-simulator/
│   │   │   ├── golden-boot/
│   │   │   └── golden-glove/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx                # Landing page
│   ├── components/
│   │   ├── auth/                   # Auth components
│   │   ├── layout/                 # Layout components
│   │   ├── match/                  # Match components
│   │   ├── tournament/             # Tournament components
│   │   └── ui/                     # Reusable UI components
│   ├── lib/
│   │   ├── api-client.ts           # API service
│   │   ├── auth-store.ts           # Zustand auth store
│   │   └── types.ts                # TypeScript types
│   ├── Dockerfile
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── docker-compose.yml
├── start-app.bat                    # Windows startup script
└── README.md
```

### Running Without Docker

#### Backend
```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Set environment variables (create .env file)
# DATABASE_URL=postgresql://admin:password@localhost:5432/worldcup
# SECRET_KEY=your-secret-key
# CORS_ORIGINS=http://localhost:3001

# Run migrations
alembic upgrade head

# Seed data (optional)
python -c "from datasets.seed_teams_2026 import seed_teams; seed_teams()"
python -c "from datasets.seed_players_2026 import seed_players; seed_players()"
python -c "from datasets.seed_matches_2026 import seed_matches; seed_matches()"

# Start server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
# NEXT_PUBLIC_API_VERSION=/api/v1

# Start development server
npm run dev -- -p 3001
```

### Environment Variables

#### Backend `.env`
```env
# Database
DATABASE_URL=postgresql://admin:password@db:5432/worldcup

# Security
SECRET_KEY=your-secret-key-change-in-production-min-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# CORS
CORS_ORIGINS=http://localhost:3001,http://127.0.0.1:3001

# Environment
ENVIRONMENT=development
```

#### Frontend `.env.local`
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_API_VERSION=/api/v1
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:8000/api/v1
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| POST | `/auth/logout` | Logout user | Yes |
| POST | `/auth/refresh` | Refresh access token | Yes |

### Match Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/matches` | Get all matches (with filters) | Yes |
| GET | `/matches/{id}` | Get match by ID | Yes |
| POST | `/matches/{id}/predict` | Submit match prediction | Yes |
| GET | `/matches/stages/available` | Get available stages | Yes |
| GET | `/matches/groups/available` | Get available groups | Yes |

### Player Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/players/forwards` | Get top forwards with stats | Yes |
| GET | `/players/goalkeepers` | Get top goalkeepers with stats | Yes |
| POST | `/players/golden-boot/predict` | Submit Golden Boot prediction | Yes |
| POST | `/players/golden-glove/predict` | Submit Golden Glove prediction | Yes |
| GET | `/players/golden-boot/my-prediction` | Get user's Golden Boot prediction | Yes |
| GET | `/players/golden-glove/my-prediction` | Get user's Golden Glove prediction | Yes |

### Simulation Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/simulations/tournament` | Run tournament simulation | Yes |
| POST | `/simulations/match` | Run match simulation | Yes |
| GET | `/simulations/my-simulations` | Get user's simulation history | Yes |
| GET | `/simulations/{id}` | Get simulation by ID | Yes |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users/me` | Get current user | Yes |
| GET | `/users/me/stats` | Get user statistics | Yes |
| PUT | `/users/me` | Update user profile | Yes |

### Team Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/teams` | Get all teams | Yes |

### Interactive API Documentation
- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

---

## 🐛 Troubleshooting

### Docker Issues

**Error: Cannot connect to Docker daemon**
```bash
# Solution: Start Docker Desktop
# Windows: Open Docker Desktop from Start Menu
# Mac: Open Docker Desktop from Applications

# Verify Docker is running
docker --version
docker ps
```

**Error: Port already in use**
```bash
# Find process using port 3001 or 8000
netstat -ano | findstr :3001
netstat -ano | findstr :8000

# Windows: Kill process
taskkill /PID <process_id> /F

# Or change port in docker-compose.yml
```

**Error: Docker containers won't start**
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db

# Rebuild containers
docker-compose down -v
docker-compose up --build -d
```

### Database Issues

**Error: Database connection failed**
```bash
# Check database container
docker ps | findstr worldcup_db

# View database logs
docker logs worldcup_db --tail 50

# Restart database
docker restart worldcup_db

# Reset database (WARNING: Deletes all data)
docker-compose down -v
docker-compose up -d
```

**Error: Migration failed**
```bash
# Check migration logs
docker logs worldcup_backend --tail 100

# Manually run migrations
docker exec -it worldcup_backend alembic upgrade head

# Reset migrations (WARNING: Deletes all data)
docker exec -it worldcup_backend alembic downgrade base
docker exec -it worldcup_backend alembic upgrade head
```

### Frontend Issues

**Error: Cannot fetch data / API calls failing**
```bash
# Check backend is running
curl http://localhost:8000/health

# Check CORS settings in backend/.env
# Ensure: CORS_ORIGINS=http://localhost:3001

# Clear browser cache and cookies
# Hard refresh: Ctrl + Shift + R (Windows/Linux) or Cmd + Shift + R (Mac)
```

**Error: Page not loading**
```bash
# Check frontend logs
docker logs worldcup_frontend --tail 50

# Rebuild frontend
docker-compose restart frontend

# Check port 3001 is not in use
netstat -ano | findstr :3001
```

### Authentication Issues

**Error: Registration failed**
```bash
# Clear browser cookies and localStorage
# Check password requirements:
#   - Minimum 8 characters
#   - At least 1 uppercase letter
#   - At least 1 lowercase letter
#   - At least 1 number

# Check backend logs
docker logs worldcup_backend --tail 50
```

**Error: Token expired**
```bash
# Login again to get new token
# Tokens expire after 30 minutes (configurable in backend/.env)
```

### Performance Issues

**Tournament Simulator is slow**
```bash
# Reduce simulation count (try 100-1000 first)
# Reduce randomness factor
# Simulations are CPU-intensive and may take 10-60 seconds for 5000+ runs
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Coding Standards

**Backend (Python)**
- Follow PEP 8 style guide
- Use type hints
- Add docstrings to functions and classes
- Write unit tests for new features

**Frontend (TypeScript/React)**
- Use TypeScript strict mode
- Follow React best practices
- Use functional components with hooks
- Follow Tailwind CSS conventions
- Add comments for complex logic

**Commits**
- Use conventional commit messages
- Format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Example: `feat(match-predictor): add AI probability bars`

### Testing Your Changes
```bash
# Backend tests
cd backend
pytest

# Frontend build test
cd frontend
npm run build

# Docker test
docker-compose up --build
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Author

**Anirudh V Shenoy**
- GitHub: [@SkanxGladiatorr07](https://github.com/SkanxGladiatorr07)
- Email: trapking1007@gmail.com
- Username: Skan

---

## 🙏 Acknowledgments

- **FIFA** for World Cup 2026 format and structure
- **FastAPI** for the excellent Python web framework
- **Next.js** for the powerful React framework
- **XGBoost** for ML model capabilities
- **Docker** for containerization
- **PostgreSQL** for reliable database
- **Tailwind CSS** for beautiful styling
- All open-source contributors and maintainers

---

## 📞 Support

Need help? Have questions?

- **GitHub Issues**: [Create an issue](https://github.com/SkanxGladiatorr07/FIFA-World-Cup-Predictor/issues)
- **Email**: trapking1007@gmail.com
- **Documentation**: Check the `/api/docs` endpoint for API reference

---

## ⭐ Show Your Support

If you find this project useful, please consider giving it a star! ⭐

It helps others discover the project and motivates continued development.

---

**Made with ❤️ for FIFA World Cup 2026**

**Happy Predicting! ⚽🏆**
