# FIFA World Cup 2026 Prediction Platform - Setup Guide

## Phase 1: Project Setup & Authentication (25% Complete)

### What Has Been Built

1. **Backend Structure**
   - ✅ FastAPI application with CORS configured
   - ✅ PostgreSQL database models (User, Team, Player, Match, Predictions, Simulations)
   - ✅ SQLAlchemy ORM setup
   - ✅ Alembic migrations configuration
   - ✅ JWT authentication system
   - ✅ Password hashing with bcrypt
   - ✅ User registration and login endpoints
   - ✅ Token refresh mechanism
   - ✅ Protected route middleware

2. **Frontend Structure**
   - ✅ Next.js 14+ with TypeScript
   - ✅ Tailwind CSS configured with custom design system
   - ✅ Zustand state management for authentication
   - ✅ Axios API client with token management
   - ✅ Type definitions for all entities
   - ✅ Home page with hero and features sections
   - ✅ Toast notifications configured

3. **DevOps**
   - ✅ Docker Compose for backend, frontend, and PostgreSQL
   - ✅ Environment variable management
   - ✅ Database connection pooling

### Setup Instructions

#### Option 1: Docker (Recommended)

1. **Clone and navigate to project**
   ```bash
   cd "C:\DJ Sanghvi College\Projects\FIFA World Cup Real"
   ```

2. **Start services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/api/docs

#### Option 2: Manual Setup

**Backend Setup:**
```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env
# Edit .env with your database credentials

# Run migrations
alembic upgrade head

# Start server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend Setup:**
```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
copy .env.local.example .env.local

# Start development server
npm run dev
```

**Database Setup:**
```bash
# Install PostgreSQL 15+ and create database
createdb worldcup
```

### Testing the Setup

1. **Check backend health**
   ```bash
   curl http://localhost:8000/health
   ```

2. **Test registration**
   ```bash
   curl -X POST http://localhost:8000/api/v1/auth/register \
     -H "Content-Type: application/json" \
     -d "{\"email\":\"test@example.com\",\"username\":\"testuser\",\"password\":\"Test123!\"}"
   ```

3. **Test login**
   ```bash
   curl -X POST http://localhost:8000/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d "{\"username\":\"testuser\",\"password\":\"Test123!\"}"
   ```

4. **Visit frontend**
   - Open http://localhost:3000 in browser
   - Click "Get Started" to test navigation

### What's Next (Remaining 75%)

**Phase 2: Authentication UI (Next 15%)**
- [ ] Build login page UI with form validation
- [ ] Build registration page UI with form validation
- [ ] Implement Google OAuth integration
- [ ] Create protected route wrapper
- [ ] Build dashboard layout with sidebar

**Phase 3: Core Data & ML Setup (Next 20%)**
- [ ] Create sample datasets (teams, matches, players)
- [ ] Build data loading scripts
- [ ] Train basic XGBoost models
- [ ] Create ML prediction endpoints

**Phase 4: Match Predictor UI (Next 20%)**
- [ ] Build match card component
- [ ] Create horizontal probability bar component
- [ ] Implement match filtering
- [ ] Add score prediction inputs
- [ ] Connect to ML prediction API

**Phase 5: Additional Features (Next 20%)**
- [ ] Golden Boot & Glove predictors
- [ ] Match simulator page
- [ ] Tournament simulator with Monte Carlo
- [ ] Dashboard with statistics

### Current File Structure

```
.
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── auth.py
│   │   │   │   └── users.py
│   │   │   └── dependencies.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── db/
│   │   │   └── database.py
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── team.py
│   │   │   ├── player.py
│   │   │   ├── match.py
│   │   │   └── prediction.py
│   │   ├── schemas/
│   │   │   └── user.py
│   │   └── main.py
│   ├── alembic/
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── lib/
│   │   ├── api-client.ts
│   │   ├── auth-store.ts
│   │   └── types.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── Dockerfile
│   └── .env.local.example
├── docker-compose.yml
├── .gitignore
└── README.md
```

### Troubleshooting

**Database connection errors:**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env
- Verify database exists: `psql -l`

**Port already in use:**
- Backend (8000): Change port in docker-compose.yml or uvicorn command
- Frontend (3000): Change port in package.json dev script
- Database (5432): Change port mapping in docker-compose.yml

**Import errors:**
- Activate virtual environment for backend
- Run `npm install` for frontend
- Check Python version (3.10+) and Node version (18+)

### Database Schema

All tables are defined and ready to migrate:
- `users` - User authentication and profiles
- `teams` - World Cup teams (48 teams)
- `players` - Players for Golden Boot/Glove predictions
- `matches` - All 104 World Cup matches
- `match_predictions` - User match predictions
- `golden_boot_predictions` - User Golden Boot predictions
- `golden_glove_predictions` - User Golden Glove predictions
- `simulations` - Saved tournament simulations

### API Endpoints Currently Available

**Authentication:**
- POST `/api/v1/auth/register` - Register new user
- POST `/api/v1/auth/login` - Login with username/password
- POST `/api/v1/auth/refresh` - Refresh access token
- POST `/api/v1/auth/logout` - Logout user

**Users:**
- GET `/api/v1/users/me` - Get current user info
- GET `/api/v1/users/me/stats` - Get user statistics
- PUT `/api/v1/users/me` - Update user info

**System:**
- GET `/health` - Health check endpoint
- GET `/api/docs` - Swagger API documentation

### Environment Variables

**Backend (.env):**
```
DATABASE_URL=postgresql://admin:password@localhost:5432/worldcup
SECRET_KEY=your-secret-key-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
CORS_ORIGINS=http://localhost:3000
```

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_API_VERSION=/api/v1
```

### Next Steps

To continue with the next 25%:
1. Run the current setup to verify everything works
2. Build the authentication UI pages (login/register)
3. Implement protected routes middleware
4. Create dashboard layout with sidebar
5. Add sample data for testing

---

**Status:** ✅ Phase 1 Complete (25%)  
**Next:** Phase 2 - Authentication UI (15%)  
**Estimated Time:** Ready for next development cycle
