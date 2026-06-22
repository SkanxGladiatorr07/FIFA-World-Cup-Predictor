# 🚀 FIFA World Cup 2026 Predictor - Quick Start Guide

## 📊 Current Status: 50% Complete

### ✅ What's Working Right Now
- ✅ User registration and login
- ✅ JWT authentication with auto-refresh
- ✅ Protected dashboard routes
- ✅ Full dashboard layout with sidebar navigation
- ✅ User statistics display
- ✅ 48 teams seeded in database
- ✅ Teams API endpoint
- ✅ Beautiful responsive UI with dark theme

---

## 🎯 Quick Setup (5 Minutes)

### Option 1: Docker (Recommended - Easiest)

```bash
# 1. Navigate to project
cd "C:\DJ Sanghvi College\Projects\FIFA World Cup Real"

# 2. Start all services (first time takes 2-3 minutes)
docker-compose up --build

# 3. Wait for "Application startup complete" message

# 4. In a NEW terminal, seed the database
docker exec -it worldcup_backend python -m datasets.seed_data

# 5. Open browser
# Frontend: http://localhost:3001
# Backend API: http://localhost:8000/api/docs
```

### Option 2: Manual Setup

#### Backend Setup:
```bash
# 1. Navigate to backend
cd backend

# 2. Create virtual environment
python -m venv venv
venv\Scripts\activate

# 3. Install dependencies (takes 1-2 minutes)
pip install -r requirements.txt

# 4. Create .env file
copy .env.example .env

# 5. Edit .env and set DATABASE_URL:
# DATABASE_URL=postgresql://admin:password@localhost:5432/worldcup

# 6. Run migrations
alembic upgrade head

# 7. Seed database with 48 teams, 10 players, 8 matches
python -m datasets.seed_data

# 8. Start backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Backend running at: http://localhost:8000
```

#### Frontend Setup (New Terminal):
```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies (takes 1-2 minutes)
npm install

# 3. Create .env.local
copy .env.local.example .env.local

# 4. Content should be:
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
# NEXT_PUBLIC_API_VERSION=/api/v1

# 5. Start frontend
npm run dev

# Frontend running at: http://localhost:3001
```

---

## 🧪 Testing the Application (Step by Step)

### Test 1: Registration ✅
1. Open: http://localhost:3001
2. Click "Get Started" or "Sign Up"
3. Fill in registration form:
   - **Email**: `test@example.com`
   - **Username**: `testuser` (3-20 characters, alphanumeric)
   - **Password**: `Test123!` (8+ chars, uppercase, lowercase, number)
   - **Confirm Password**: `Test123!`
4. Watch password strength indicator change
5. Click "Sign Up"
6. ✅ Should see success toast and redirect to login

### Test 2: Login ✅
1. On login page (or go to http://localhost:3001/auth/login)
2. Enter credentials:
   - **Username**: `testuser`
   - **Password**: `Test123!`
3. Click "Sign In"
4. ✅ Should see success toast and redirect to dashboard

### Test 3: Dashboard ✅
1. Should automatically be on http://localhost:3001/dashboard
2. Verify you see:
   - ✅ Top navbar with your username "testuser" and avatar
   - ✅ Left sidebar with 6 menu items
   - ✅ Welcome message: "Welcome back, testuser! 👋"
   - ✅ 4 statistics cards (all showing 0 initially)
   - ✅ Quick Actions section with 3 cards
   - ✅ Recent Activity section

### Test 4: Navigation ✅
Click each sidebar item:
1. **Match Predictor** → Shows "Coming Soon" page
2. **Golden Boot** → Shows "Coming Soon" page
3. **Golden Glove** → Shows "Coming Soon" page
4. **Match Simulator** → Shows "Coming Soon" page
5. **Tournament Simulator** → Shows "Coming Soon" page
6. **Dashboard** → Returns to main dashboard

### Test 5: Protected Routes ✅
1. Click "Logout" button in navbar
2. ✅ Should redirect to home page
3. Try to access: http://localhost:3001/dashboard
4. ✅ Should automatically redirect to login page
5. Login again
6. Try to access: http://localhost:3001/auth/register
7. ✅ Should redirect to dashboard (already authenticated)

### Test 6: Backend API ✅
```bash
# Test 1: Health check
curl http://localhost:8000/health
# Expected: {"status":"healthy","environment":"development","version":"1.0.0"}

# Test 2: Get all teams (48 teams)
curl http://localhost:8000/api/v1/teams
# Expected: JSON array with 48 teams

# Test 3: Get teams in Group A
curl http://localhost:8000/api/v1/teams?group=A
# Expected: 4 teams (Argentina, Canada, Morocco, Ecuador)

# Test 4: Get specific team
curl http://localhost:8000/api/v1/teams/1
# Expected: Single team object

# Test 5: View API documentation
# Open: http://localhost:8000/api/docs
# Expected: Interactive Swagger UI with all endpoints
```

---

## 🗄️ Database Contents

After running `python -m datasets.seed_data`, your database contains:

### Teams (48 teams across 12 groups)
```
Group A: Argentina, Canada, Morocco, Ecuador
Group B: France, Mexico, Denmark, Australia
Group C: Brazil, Serbia, Switzerland, Cameroon
Group D: England, USA, Wales, Iran
Group E: Spain, Germany, Japan, Costa Rica
Group F: Portugal, Netherlands, Uruguay, South Korea
Group G: Belgium, Croatia, Poland, Ghana
Group H: Italy, Colombia, Sweden, Saudi Arabia
Group I: Norway, Turkey, Chile, Nigeria
Group J: Senegal, Tunisia, Peru, Qatar
Group K: Ukraine, Egypt, Algeria, Panama
Group L: Iceland, Iraq, Mali, New Zealand
```

### Players (10 sample players)
**Forwards:**
- Kylian Mbappé (France) - 0.95 goals/90
- Lionel Messi (Argentina) - 0.78 goals/90
- Harry Kane (England) - 0.88 goals/90
- Vinicius Junior (Brazil) - 0.72 goals/90
- Erling Haaland (Norway) - 1.12 goals/90

**Goalkeepers:**
- Manuel Neuer (Germany) - 78.2% save rate
- Alisson Becker (Brazil) - 76.8% save rate
- Thibaut Courtois (Belgium) - 75.5% save rate
- Emiliano Martínez (Argentina) - 77.1% save rate
- Ederson (Brazil) - 74.9% save rate

### Matches (8 sample matches)
- 6 matches from Group A
- 2 matches from Group B
- With dates, venues, and match stages

---

## 📱 UI Features to Explore

### Home Page (/)
- Hero section with animated gradient
- 6 feature cards with icons
- Statistics section
- Responsive footer

### Login Page (/auth/login)
- Clean, centered form
- Real-time validation
- Loading states
- Password visibility toggle

### Register Page (/auth/register)
- Email format validation
- Username validation (3-20 chars, alphanumeric)
- Password strength indicator (Weak → Fair → Good → Strong)
- Password requirements:
  - 8+ characters
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 number
- Confirm password matching
- Inline error messages

### Dashboard Layout
- **Navbar**: 
  - Logo and title
  - User avatar (first letter of username)
  - Username display
  - Logout button
  
- **Sidebar**:
  - Active route highlighting (gold background)
  - Icons for each section
  - Hover effects
  - Sticky positioning

- **Main Content**:
  - Responsive grid layout
  - Card components with hover effects
  - Statistics with icons
  - Quick action buttons

---

## 🔧 Troubleshooting

### Issue: Port 3000 already in use
**Solution**: ✅ Already fixed! Frontend now uses port 3001

### Issue: Database connection error
```bash
# Check if PostgreSQL is running
docker ps

# If using Docker, ensure container is up
docker-compose up db

# If manual setup, start PostgreSQL service
# Windows: services.msc → PostgreSQL
```

### Issue: "No teams found" after seeding
```bash
# Re-run seeding script
cd backend
python -m datasets.seed_data

# Or in Docker
docker exec -it worldcup_backend python -m datasets.seed_data
```

### Issue: Frontend shows blank page
```bash
# Check console for errors (F12)
# Verify API URL in .env.local
# Should be: NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Clear browser cache and reload
# Or try incognito mode
```

### Issue: CORS errors in browser
```bash
# Check backend .env file
# Should have: CORS_ORIGINS=http://localhost:3001,http://127.0.0.1:3001

# Restart backend after changing .env
```

### Issue: "Invalid token" after login
```bash
# Clear localStorage
# F12 → Application → Local Storage → Clear All
# Then login again
```

---

## 🎨 Design System

### Colors
- **Primary Gold**: `#F59E0B` (buttons, highlights, active states)
- **Background Dark**: `#0A0F1E` (main background)
- **Card Dark**: `#1A1F35` (cards, panels)
- **Border Dark**: `#3A3F55` (borders)
- **Success**: `#10B981` (green)
- **Error**: `#EF4444` (red)

### Typography
- **Headings**: Montserrat (weights: 600, 700, 800)
- **Body**: Inter (weights: 400, 500, 600)

### Components
- **Buttons**: 4 variants (primary, secondary, outline, danger), 3 sizes
- **Inputs**: Label, error, helper text, focus states
- **Cards**: Hover effects, consistent padding

---

## 📊 Project Structure

```
FIFA-World-Cup-Predictor/
├── backend/
│   ├── app/
│   │   ├── api/routes/      (auth, users, teams)
│   │   ├── core/            (config, security)
│   │   ├── db/              (database setup)
│   │   ├── models/          (SQLAlchemy models)
│   │   └── schemas/         (Pydantic schemas)
│   ├── datasets/
│   │   └── seed_data.py     (48 teams, 10 players, 8 matches)
│   └── alembic/             (database migrations)
│
├── frontend/
│   ├── app/
│   │   ├── auth/            (login, register pages)
│   │   ├── dashboard/       (dashboard + 5 predictors)
│   │   ├── layout.tsx       (root layout)
│   │   └── page.tsx         (home page)
│   ├── components/
│   │   ├── auth/            (LoginForm, RegisterForm)
│   │   ├── layout/          (Navbar, Sidebar, DashboardLayout)
│   │   └── ui/              (Button, Input, Card)
│   ├── lib/
│   │   ├── api-client.ts    (Axios wrapper)
│   │   ├── auth-store.ts    (Zustand store)
│   │   └── types.ts         (TypeScript types)
│   └── middleware.ts        (Route protection)
│
└── docker-compose.yml       (PostgreSQL, Backend, Frontend)
```

---

## 🔐 Default Credentials for Testing

You can create any account, but here's a suggested test account:

```
Email: test@example.com
Username: testuser
Password: Test123!
```

---

## 📈 What's Next (Phase 3 - 75% Complete)

### Match Predictor Implementation
- [ ] Load all 104 World Cup matches
- [ ] Create match card component with team info
- [ ] Build horizontal probability bar (Team A | Draw | Team B)
- [ ] Add score prediction inputs
- [ ] Implement match filtering
- [ ] Train XGBoost ML model
- [ ] Create match prediction API
- [ ] Save user predictions

---

## 🎉 You're All Set!

The first 50% of the project is complete and ready to use!

**Quick Test Checklist:**
- [ ] Register a new account
- [ ] Login successfully
- [ ] See dashboard with your username
- [ ] Navigate through all sidebar items
- [ ] Logout and try accessing dashboard (should redirect)
- [ ] Check API docs at http://localhost:8000/api/docs
- [ ] Verify 48 teams in database

**Need Help?**
- Check `PHASE2_COMPLETE.md` for detailed documentation
- API documentation: http://localhost:8000/api/docs
- Backend logs: Check terminal running backend
- Frontend logs: Check browser console (F12)

---

**Status**: ✅ 50% Complete  
**Frontend**: http://localhost:3001  
**Backend**: http://localhost:8000  
**API Docs**: http://localhost:8000/api/docs  

Happy coding! 🚀⚽
