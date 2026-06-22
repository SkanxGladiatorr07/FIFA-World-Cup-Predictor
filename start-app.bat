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
echo Frontend: http://localhost:3001
echo Backend:  http://localhost:8000
echo API Docs: http://localhost:8000/api/docs
echo.
echo To stop the application, run: docker-compose down
echo To view logs: docker-compose logs -f
echo.
pause
