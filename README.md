# ⚽ FIFA World Cup 2026 Prediction Platform

An AI-powered prediction platform for the FIFA World Cup 2026, featuring match predictions, tournament simulations, and player award predictions.

![Status](https://img.shields.io/badge/Status-Complete-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Features

### ✅ Match Predictor
- Predict all 95 World Cup matches
- AI-powered probability predictions (Home Win | Draw | Away Win)
- Score predictions with 0-10 validation
- Filter by stage, group, and team search
- Edit predictions before match starts

### ✅ Tournament Simulator
- Run Monte Carlo simulations (100-10,000 runs)
- Adjustable randomness factor (0.0-0.5)
- Winner, finalist, and semifinalist probabilities
- Simulation history tracking
- Beautiful probability visualizations

### ✅ Match Simulator
- Simulate individual matches for detailed analysis
- Score probability distribution (top 10 scores)
- Most likely score prediction
- Configurable simulation count
- Visual probability bars

### ✅ Golden Boot Predictor
- Top 20 forwards ranking
- Player statistics (goals/90, shots/game)
- AI predicted tournament goals
- Confidence scores
- Save and update predictions

### ✅ Golden Glove Predictor
- Top 20 goalkeepers ranking
- Player statistics (save %, clean sheets)
- AI predicted save performance
- Confidence scores
- Save and update predictions

### ✅ User Dashboard
- Real-time statistics tracking
- Prediction history
- Quick action cards
- Beautiful UI with animations

---

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python 3.11)
- **Database**: PostgreSQL 15
- **ORM**: SQLAlchemy
- **Authentication**: JWT with bcrypt
- **Migrations**: Alembic
- **CORS**: Enabled for frontend

### Frontend
- **Framework**: Next.js 14+ (TypeScript)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **API Client**: Axios
- **UI Components**: Custom components
- **Date Handling**: date-fns
- **Notifications**: react-hot-toast

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL with pgAdmin
- **Port Configuration**: 
  - Frontend: 3001
  - Backend: 8000
  - Database: 5432

---

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed and running
- Git installed
- 8GB+ RAM recommended

### 1. Clone Repository
```bash
git clone https://github.com/SkanxGladiatorr07/FIFA-World-Cup-Predictor.git
cd "FIFA World Cup Real"
```

### 2. Start Application
**Windows:**
```cmd
start-app.bat
```

**Manual Start:**
```bash
docker-compose up -d
```

### 3. Wait for Services
The script will:
- ✅ Start all Docker containers
- ✅ Run database migrations
- ✅ Seed 48 teams, 10 players, and 95 matches
- ✅ Wait for services to be ready

### 4. Access Application
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/api/docs

### 5. Register & Login
1. Click **"Sign Up"** on homepage
2. Create account (username: 3-20 chars, password: 8+ chars with uppercase, lowercase, number)
3. Login with credentials
4. Start predicting!

---

## 📊 Database Structure

### Tables (8 Total)
1. **users** - User accounts with authentication
2. **teams** - 48 World Cup teams with rankings
3. **players** - Players with statistics
4. **matches** - 95 World Cup matches
5. **match_predictions** - User match score predictions
6. **golden_boot_predictions** - Top scorer predictions
7. **golden_glove_predictions** - Best goalkeeper predictions
8. **simulations** - Tournament simulation history

### Seeded Data
- **48 Teams** across Groups A-J
- **10 Players** (5 forwards, 5 goalkeepers)
- **95 Matches** (63 group stage + 32 knockout)

---

## 🎮 Usage Guide

### Making Predictions

**Match Predictions:**
1. Go to Dashboard → Match Predictor
2. Browse or search matches
3. Set home and away scores (0-10)
4. Submit prediction
5. Edit anytime before match starts

**Golden Boot:**
1. Go to Dashboard → Golden Boot
2. Review top 20 forwards
3. Select your pick
4. Submit prediction

**Golden Glove:**
1. Go to Dashboard → Golden Glove
2. Review top 20 goalkeepers
3. Select your pick
4. Submit prediction

### Running Simulations

**Tournament Simulation:**
1. Go to Dashboard → Tournament Simulator
2. Set number of simulations (100-10,000)
3. Adjust randomness factor (0.0-0.5)
4. Click "Run Tournament Simulation"
5. View winner probabilities

**Match Simulation:**
1. Go to Dashboard → Match Simulator
2. Select a match from the list
3. Set simulation count
4. Click "Run Simulation"
5. View score probabilities

---

## 🔧 Development

### Project Structure
```
FIFA World Cup Real/
├── backend/
│   ├── app/
│   │   ├── api/routes/         # API endpoints
│   │   ├── core/               # Security & config
│   │   ├── db/                 # Database setup
│   │   ├── models/             # SQLAlchemy models
│   │   └── schemas/            # Pydantic schemas
│   ├── alembic/                # Database migrations
│   ├── datasets/               # Seed data scripts
│   └── requirements.txt
├── frontend/
│   ├── app/                    # Next.js pages
│   ├── components/             # React components
│   ├── lib/                    # Utilities
│   └── public/
├── docker-compose.yml
└── README.md
```

### Running Locally (Development)

**Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

**Backend (.env):**
```env
DATABASE_URL=postgresql://admin:password@db:5432/worldcup
SECRET_KEY=your-secret-key-change-in-production
CORS_ORIGINS=http://localhost:3001,http://localhost:3000
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_API_VERSION=/api/v1
```

---

## 📚 API Documentation

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `POST /api/v1/auth/refresh` - Refresh access token

### Matches
- `GET /api/v1/matches` - Get all matches (with filters)
- `GET /api/v1/matches/{id}` - Get match details
- `POST /api/v1/matches/{id}/predict` - Submit match prediction
- `GET /api/v1/matches/stages/available` - Get available stages
- `GET /api/v1/matches/groups/available` - Get available groups

### Players
- `GET /api/v1/players/forwards` - Get top forwards
- `GET /api/v1/players/goalkeepers` - Get top goalkeepers
- `POST /api/v1/players/golden-boot/predict` - Submit Golden Boot prediction
- `POST /api/v1/players/golden-glove/predict` - Submit Golden Glove prediction
- `GET /api/v1/players/golden-boot/my-prediction` - Get user's Golden Boot prediction
- `GET /api/v1/players/golden-glove/my-prediction` - Get user's Golden Glove prediction

### Simulations
- `POST /api/v1/simulations/tournament` - Run tournament simulation
- `POST /api/v1/simulations/match` - Run match simulation
- `GET /api/v1/simulations/my-simulations` - Get simulation history
- `GET /api/v1/simulations/{id}` - Get specific simulation

### Users
- `GET /api/v1/users/me` - Get current user
- `GET /api/v1/users/me/stats` - Get user statistics
- `PUT /api/v1/users/me` - Update user profile

### Teams
- `GET /api/v1/teams` - Get all teams

**Full API Documentation**: http://localhost:8000/api/docs

---

## 🐛 Troubleshooting

### Docker Issues
**Error**: "Cannot connect to Docker daemon"
```bash
# Windows: Start Docker Desktop
# Check if running
docker ps
```

**Error**: "Port already in use"
```bash
# Find process using port 3001
netstat -ano | findstr :3001
# Kill process or change port in docker-compose.yml
```

### Database Issues
**Error**: "Database connection failed"
```bash
# Check database is running
docker ps | findstr worldcup_db
# Restart database
docker restart worldcup_db
```

### Frontend Issues
**Error**: "Failed to fetch matches"
```bash
# Check backend is running
curl http://localhost:8000/health
# Check CORS configuration in backend/.env
```

### Registration Issues
**Error**: "Registration failed"
- Clear browser cookies
- Hard refresh (Ctrl + Shift + R)
- Check backend logs: `docker logs worldcup_backend --tail 50`
- See `REGISTRATION_FIXED.md` for detailed troubleshooting

---

## 📖 Documentation

- **[PHASE3_COMPLETE.md](./PHASE3_COMPLETE.md)** - Match Predictor implementation
- **[PHASE4_COMPLETE.md](./PHASE4_COMPLETE.md)** - Complete feature list
- **[QUICK_START_PHASE3.md](./QUICK_START_PHASE3.md)** - Quick start guide
- **[REGISTRATION_FIXED.md](./REGISTRATION_FIXED.md)** - Registration troubleshooting
- **[STATUS_UPDATE.md](./STATUS_UPDATE.md)** - Project status
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Testing instructions

---

## 🎯 Roadmap

### ✅ Completed (Phase 1-4)
- [x] Backend API with FastAPI
- [x] PostgreSQL database setup
- [x] User authentication (JWT)
- [x] 95 World Cup matches
- [x] Match Predictor UI
- [x] Tournament Simulator
- [x] Match Simulator
- [x] Golden Boot Predictor
- [x] Golden Glove Predictor
- [x] User Dashboard
- [x] Real-time statistics
- [x] Docker containerization

### 🚀 Future Enhancements
- [ ] XGBoost ML models for predictions
- [ ] Historical accuracy tracking
- [ ] User leaderboards
- [ ] Social sharing features
- [ ] Live match updates
- [ ] Mobile app
- [ ] Push notifications
- [ ] Advanced analytics

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- **Backend**: Follow PEP 8 Python style guide
- **Frontend**: Follow Airbnb TypeScript/React style guide
- **Commits**: Use conventional commit messages
- **Documentation**: Update README for new features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Developer**: [Anirudh V Shenoy](https://github.com/SkanxGladiatorr07)
- **Email**: trapking1007@gmail.com
- **Username**: Skan

---

## 🙏 Acknowledgments

- FIFA for World Cup data structure
- FastAPI for the excellent Python framework
- Next.js for the powerful React framework
- Docker for containerization
- PostgreSQL for reliable database
- All open-source contributors

---

## 📞 Support

For issues, questions, or suggestions:
- **GitHub Issues**: [Create an issue](https://github.com/SkanxGladiatorr07/FIFA-World-Cup-Predictor/issues)
- **Email**: trapking1007@gmail.com

---

## ⭐ Star the Repo

If you find this project useful, please give it a star! ⭐

---

**Made with ❤️ for FIFA World Cup 2026**

**Happy Predicting! ⚽🏆**
