# FIFA World Cup 2026 Prediction Platform

AI-Powered Predictions for Matches, Players, and Tournament Outcomes

## Tech Stack

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT tokens + OAuth2 (Google Sign-In)
- **ML Libraries**: XGBoost, scikit-learn, pandas, numpy

### Frontend
- **Framework**: Next.js 15+ (React 18+, TypeScript)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Authentication**: NextAuth.js (Google OAuth)

## Project Structure

```
.
├── backend/          # FastAPI backend
├── frontend/         # Next.js frontend
├── docker-compose.yml
└── README.md
```

## Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 15+
- Docker & Docker Compose (optional)

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your configuration
alembic upgrade head
uvicorn app.main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local with API URL
npm run dev
```

### Docker Setup
```bash
docker-compose up --build
```

## Features
- ⚽ Match Predictor with ML-powered win probabilities
- 👟 Golden Boot Predictor with xG-based analysis
- 🧤 Golden Glove Predictor with save % metrics
- 🎮 Group Stage Match Simulator
- 🏆 Tournament Simulator with Monte Carlo simulation
- 📊 User leaderboards and prediction tracking

## Development Status
Phase 1: Project Setup & Authentication ✅ (In Progress)
