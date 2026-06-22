# 🐳 Docker Setup & Troubleshooting Guide

## Quick Start Steps

### 1. Ensure Docker Desktop is Running

**Windows:**
```powershell
# Start Docker Desktop
Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"

# Wait 30-60 seconds for Docker to fully start
# You'll see the Docker icon in system tray when ready
```

**Check Docker Status:**
```bash
docker --version
# Should output: Docker version 24.x.x or higher

docker ps
# Should list running containers (may be empty initially)
```

### 2. Start the Application

```bash
# Navigate to project
cd "C:\DJ Sanghvi College\Projects\FIFA World Cup Real"

# Build and start all services
docker-compose up --build
```

**Expected Output:**
```
✅ Creating network "fifaworldcupreal_default"
✅ Creating worldcup_db ... done
✅ Creating worldcup_backend ... done
✅ Creating worldcup_frontend ... done
```

### 3. Seed the Database (First Time Only)

**Wait for backend to be ready** (look for "Application startup complete"), then in a NEW terminal:

```bash
docker exec -it worldcup_backend python -m datasets.seed_data
```

**Expected Output:**
```
🌱 Starting database seeding...
--------------------------------------------------
✅ Successfully seeded 48 teams
✅ Successfully seeded 10 sample players
✅ Successfully seeded 8 sample matches
--------------------------------------------------
✅ Database seeding completed!
```

### 4. Access the Application

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/api/docs

---

## Common Issues & Solutions

### ❌ Issue 1: Docker Desktop Not Running

**Error:**
```
failed to connect to the docker API at npipe:////./pipe/dockerDesktopLinuxEngine
The system cannot find the file specified.
```

**Solution:**
```powershell
# Start Docker Desktop
Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"

# Wait 30-60 seconds for Docker to initialize
# Check system tray for Docker icon (should turn from orange to green/white)

# Verify Docker is running
docker ps
```

---

### ❌ Issue 2: Port Already in Use

**Error:**
```
ERROR: for worldcup_backend  Cannot start service backend: 
Ports are not available: exposing port TCP 0.0.0.0:8000 -> 0.0.0.0:0: 
listen tcp 0.0.0.0:8000: bind: Only one usage of each socket address
```

**Solution:**
```bash
# Find what's using port 8000
netstat -ano | findstr :8000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or change port in docker-compose.yml
# Change "8000:8000" to "8001:8000"
```

---

### ❌ Issue 3: Database Connection Failed

**Error:**
```
sqlalchemy.exc.OperationalError: (psycopg2.OperationalError) could not connect to server
```

**Solution:**
```bash
# Stop all containers
docker-compose down

# Remove volumes to start fresh
docker-compose down -v

# Start again
docker-compose up --build

# Wait for "database system is ready to accept connections"
# Then seed database
docker exec -it worldcup_backend python -m datasets.seed_data
```

---

### ❌ Issue 4: Frontend Can't Connect to Backend

**Error in Browser Console:**
```
Access to XMLHttpRequest at 'http://localhost:8000/api/v1/...' from origin 
'http://localhost:3001' has been blocked by CORS policy
```

**Solution:**
```bash
# Check backend .env has correct CORS setting
# Should have: CORS_ORIGINS=http://localhost:3001,http://127.0.0.1:3001

# Restart backend container
docker-compose restart backend
```

---

### ❌ Issue 5: Module Not Found Errors

**Error:**
```
ModuleNotFoundError: No module named 'fastapi'
```

**Solution:**
```bash
# Rebuild containers without cache
docker-compose build --no-cache

# Start again
docker-compose up
```

---

### ❌ Issue 6: Database Not Seeded

**Symptoms:**
- API returns empty array for teams
- Dashboard shows no data

**Solution:**
```bash
# Check if seeding was successful
docker logs worldcup_backend | grep "seeded"

# If not seeded, run seeding script
docker exec -it worldcup_backend python -m datasets.seed_data

# Verify data
docker exec -it worldcup_backend python -c "from app.db.database import SessionLocal; from app.models.team import Team; db = SessionLocal(); print(f'Teams: {db.query(Team).count()}'); db.close()"
# Should output: Teams: 48
```

---

## Useful Docker Commands

### Container Management

```bash
# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# Stop all containers
docker-compose down

# Stop and remove volumes (fresh start)
docker-compose down -v

# Restart a specific service
docker-compose restart backend
docker-compose restart frontend
docker-compose restart db

# View logs
docker logs worldcup_backend
docker logs worldcup_frontend
docker logs worldcup_db

# Follow logs in real-time
docker logs -f worldcup_backend
```

### Debugging

```bash
# Execute commands inside backend container
docker exec -it worldcup_backend bash
# Or on Windows:
docker exec -it worldcup_backend sh

# Execute commands inside frontend container
docker exec -it worldcup_frontend sh

# Access PostgreSQL database
docker exec -it worldcup_db psql -U admin -d worldcup

# Check database contents
docker exec -it worldcup_db psql -U admin -d worldcup -c "SELECT COUNT(*) FROM teams;"
docker exec -it worldcup_db psql -U admin -d worldcup -c "SELECT * FROM teams LIMIT 5;"
```

### Cleanup

```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Remove everything (use with caution!)
docker system prune -a --volumes
```

---

## Manual Setup (Without Docker)

If Docker continues to have issues, you can run manually:

### Backend Setup

```bash
# Open terminal 1
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env

# Edit .env and update DATABASE_URL to your local PostgreSQL:
# DATABASE_URL=postgresql://admin:password@localhost:5432/worldcup

# Create database
# Open pgAdmin or use psql:
# CREATE DATABASE worldcup;

# Run migrations
alembic upgrade head

# Seed database
python -m datasets.seed_data

# Start backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
# Open terminal 2
cd frontend

# Install dependencies
npm install

# Create .env.local
copy .env.local.example .env.local

# Content should be:
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
# NEXT_PUBLIC_API_VERSION=/api/v1

# Start frontend
npm run dev
```

### PostgreSQL Setup (Local)

**Windows:**
1. Download PostgreSQL 15 from https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember the password you set for user "postgres"
4. Create database:
   ```bash
   psql -U postgres
   CREATE DATABASE worldcup;
   CREATE USER admin WITH PASSWORD 'password';
   GRANT ALL PRIVILEGES ON DATABASE worldcup TO admin;
   \q
   ```

---

## Performance Tips

### Speed Up Docker Builds

1. **Use WSL2 Backend** (Windows Settings → Docker Desktop → Settings → General → Use WSL2)
2. **Increase Resources** (Settings → Resources → Advanced):
   - CPUs: 4-6
   - Memory: 4-8 GB
3. **Enable BuildKit**:
   ```bash
   $env:DOCKER_BUILDKIT=1
   docker-compose build
   ```

### Reduce Container Size

Already optimized in our setup:
- Using Alpine Linux base images
- Multi-stage builds (if needed)
- .dockerignore files

---

## Verification Checklist

Before testing the app:

- [ ] Docker Desktop is running (green icon in system tray)
- [ ] All 3 containers are running (`docker ps` shows 3 containers)
- [ ] Backend is healthy (`curl http://localhost:8000/health`)
- [ ] Database is seeded (48 teams, 10 players, 8 matches)
- [ ] Frontend is accessible (http://localhost:3001)
- [ ] Can register a new user
- [ ] Can login successfully
- [ ] Dashboard loads with statistics

---

## Getting Help

If issues persist:

1. **Check Logs:**
   ```bash
   docker logs worldcup_backend --tail 100
   docker logs worldcup_frontend --tail 100
   docker logs worldcup_db --tail 100
   ```

2. **Check Docker Status:**
   ```bash
   docker --version
   docker-compose --version
   docker ps
   docker stats
   ```

3. **Verify Network:**
   ```bash
   docker network ls
   docker network inspect fifaworldcupreal_default
   ```

4. **Test Backend Directly:**
   ```bash
   curl http://localhost:8000/health
   curl http://localhost:8000/api/v1/teams
   ```

---

## Quick Reference

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3001 | http://localhost:3001 |
| Backend | 8000 | http://localhost:8000 |
| API Docs | 8000 | http://localhost:8000/api/docs |
| Database | 5432 | localhost:5432 |

**Container Names:**
- `worldcup_frontend`
- `worldcup_backend`
- `worldcup_db`

**Database Credentials:**
- Host: localhost (or `db` inside Docker)
- Port: 5432
- Database: worldcup
- Username: admin
- Password: password

---

**🎉 Once Docker Desktop is running and you see the green icon, run:**
```bash
docker-compose up --build
```

**Wait for "Application startup complete", then seed:**
```bash
docker exec -it worldcup_backend python -m datasets.seed_data
```

**Open:** http://localhost:3001 🚀
