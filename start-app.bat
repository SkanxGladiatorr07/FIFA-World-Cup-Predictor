@echo off
echo ========================================
echo FIFA World Cup 2026 Predictor - Startup
echo ========================================
echo.

echo [1/4] Checking Docker Desktop...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker is not running!
    echo Please start Docker Desktop and wait for it to be ready.
    echo Then run this script again.
    pause
    exit /b 1
)
echo ✓ Docker is running

echo.
echo [2/4] Starting all services (this may take 2-3 minutes)...
docker-compose up --build -d

echo.
echo [3/4] Waiting for backend to be ready...
timeout /t 15 /nobreak >nul

echo.
echo [4/4] Seeding database with teams, players, and matches...
docker exec -it worldcup_backend python -m datasets.seed_data

echo.
echo ========================================
echo ✓ Application is ready!
echo ========================================
echo.
echo 🌐 Frontend: http://localhost:3001
echo 🔧 Backend:  http://localhost:8000
echo 📚 API Docs: http://localhost:8000/api/docs
echo 🗄️  Database: localhost:5432 (user: admin, db: worldcup)
echo.
echo ========================================
echo 📝 Next Steps:
echo ========================================
echo 1. Open http://localhost:3001 in your browser
echo 2. Click "Sign Up" to create an account
echo 3. Fill in your details and register
echo 4. Login and explore the dashboard
echo.
echo ========================================
echo 🛠️  Useful Commands:
echo ========================================
echo Stop services:   docker-compose down
echo View logs:       docker-compose logs -f
echo Restart backend: docker restart worldcup_backend
echo Database shell:  docker exec -it worldcup_db psql -U admin -d worldcup
echo.
echo ========================================
echo 📖 Documentation:
echo ========================================
echo - REGISTRATION_FIXED.md (registration troubleshooting)
echo - TESTING_GUIDE.md (comprehensive testing guide)
echo - README.md (project overview)
echo.
pause
