# 🚀 Production Deployment Guide - FIFA World Cup 2026

**Your Stack:**
- **Frontend**: Next.js 14 (Node.js 18)
- **Backend**: FastAPI (Python 3.11)
- **Database**: PostgreSQL 15
- **Containerization**: Docker

This guide will deploy your entire application to the internet using industry-standard tools.

---

## 📋 Quick Overview

You'll deploy to these services:

| Component | Service | Cost | Setup Time |
|-----------|---------|------|-----------|
| **Database** | Railway PostgreSQL | $5-10/month | 5 min |
| **Backend** | Railway Docker | $5-10/month | 10 min |
| **Frontend** | Vercel | Free tier available | 5 min |

**Total Cost**: ~$10-20/month (or free with limitations)

---

## 🔐 Pre-Deployment Checklist

Before starting, ensure:

- [ ] All code is committed to GitHub (git push)
- [ ] No secrets in `.env` files (should not be committed)
- [ ] `.gitignore` includes `.env`, `node_modules`, `__pycache__`
- [ ] Docker runs successfully locally (`docker-compose up -d`)
- [ ] All tests pass locally
- [ ] README.md is up to date

---

## 📚 Table of Contents

1. [Part 1: Prepare Code for Production](#part-1-prepare-code-for-production)
2. [Part 2: Deploy Database (PostgreSQL)](#part-2-deploy-database-postgresql)
3. [Part 3: Deploy Backend (FastAPI)](#part-3-deploy-backend-fastapi)
4. [Part 4: Deploy Frontend (Next.js)](#part-4-deploy-frontend-nextjs)
5. [Part 5: Connect Everything](#part-5-connect-everything)
6. [Part 6: Verify Deployment](#part-6-verify-deployment)
7. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Part 1: Prepare Code for Production

### Step 1.1: Update Backend Dockerfile

Your current Dockerfile uses `--reload` (development mode). Update it for production:

**File**: `backend/Dockerfile`

Replace:
```dockerfile
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
```

With:
```dockerfile
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
```

**Why?**
- Removes `--reload` (only for development)
- Adds `--workers 4` for production performance
- Will use multiple processes to handle requests faster

### Step 1.2: Update Frontend Dockerfile

Your frontend Dockerfile uses `npm run dev`. Update for production:

**File**: `frontend/Dockerfile`

Replace:
```dockerfile
CMD ["npm", "run", "dev"]
```

With:
```dockerfile
RUN npm run build
CMD ["npm", "start"]
```

Add this line before `EXPOSE`:
```dockerfile
# Build Next.js for production
RUN npm run build

# Set environment to production
ENV NODE_ENV=production
```

**Complete frontend Dockerfile:**
```dockerfile
# Use Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application code
COPY . .

# Build Next.js
RUN npm run build

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]
```

### Step 1.3: Create Production Environment Files

Create `backend/.env.production` (reference only, don't commit):

```env
# Database - will be replaced by Railway
DATABASE_URL=postgresql://user:pass@host:5432/worldcup

# Security - CHANGE THESE!
SECRET_KEY=generate-a-random-secure-key-here-min-32-characters
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# CORS - will be updated after frontend deployment
CORS_ORIGINS=https://your-domain.com,https://www.your-domain.com

# Environment
ENVIRONMENT=production

# OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Generate a secure SECRET_KEY:

**Windows PowerShell:**
```powershell
$bytes = [System.Text.Encoding]::UTF8.GetBytes((Get-Random -Count 32 | ForEach-Object {[char]$_}))
[Convert]::ToBase64String($bytes)
```

**Mac/Linux:**
```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

### Step 1.4: Update Production Frontend Environment

Create `frontend/.env.production` (reference only, don't commit):

```env
NEXT_PUBLIC_API_BASE_URL=https://api.your-domain.com
NEXT_PUBLIC_API_VERSION=/api/v1
NODE_ENV=production
```

**Or** use Vercel's environment variables (easier).

### Step 1.5: Commit Changes

```bash
git add backend/Dockerfile frontend/Dockerfile
git commit -m "Update Dockerfiles for production deployment"
git push
```

---

## Part 2: Deploy Database (PostgreSQL)

We'll use **Railway** - it's Docker-native and easiest for your setup.

### Step 2.1: Create Railway Account

1. Go to https://railway.app
2. Click "Start a New Project"
3. Sign up with GitHub (recommended)
   - Authorize GitHub
   - Allow Railway to access your repositories

### Step 2.2: Create PostgreSQL Database

1. In Railway dashboard, click "New Project"
2. Select "Provision PostgreSQL"
3. Wait 30 seconds for provisioning

You'll see a database service in your project.

### Step 2.3: Get Database URL

1. Click the PostgreSQL service
2. Go to "Connect" tab
3. Copy the **DATABASE_URL** under "Postgres Connection String"

Example format:
```
postgresql://postgres:abc123xyz@containers.railway.app:5432/railway
```

**Save this securely!** You'll need it for the backend.

### Step 2.4: Create Initial Database Schema (Optional)

Railway creates a default database. You can skip this or use pgAdmin to explore.

✅ **Your database is ready!**

---

## Part 3: Deploy Backend (FastAPI)

The backend will be deployed as a Docker container on Railway.

### Step 3.1: Add Railway Configuration

Create `railway.toml` in your project root:

```toml
[build]
builder = "dockerfile"
dockerfile = "./backend/Dockerfile"
context = "./backend"

[deploy]
startCommand = "alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port $PORT --workers 4"
```

This tells Railway:
- Use your backend Dockerfile
- Run migrations before starting
- Listen on the PORT variable Railway provides

### Step 3.2: Push Code to GitHub

Make sure all changes are pushed:

```bash
git add .
git commit -m "Add production configuration"
git push
```

### Step 3.3: Connect GitHub to Railway

1. In Railway, click "New Project"
2. Click "Deploy from GitHub repo"
3. Select your repository
4. Select `FIFA-World-Cup-Predictor`
5. Choose branch: `main`

Railway will auto-detect it's a Python project.

### Step 3.4: Wait for Initial Build

Railway will:
1. Build your Dockerfile (~2-3 minutes)
2. Deploy the image
3. Show build logs in the dashboard

Check the logs to see if it's running.

### Step 3.5: Set Environment Variables

Once deployed, click the service and go to "Variables" tab:

Add these variables:

```env
DATABASE_URL=<PASTE_YOUR_RAILWAY_POSTGRES_URL_HERE>
SECRET_KEY=<YOUR_SECURE_SECRET_KEY_HERE>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
CORS_ORIGINS=http://localhost:3001,http://localhost:3000
ENVIRONMENT=production
PORT=8000
```

**Important:** 
- Replace `DATABASE_URL` with the PostgreSQL URL from Part 2.3
- Replace `SECRET_KEY` with your generated secure key

### Step 3.6: Deploy with Variables

Once variables are saved, Railway automatically redeploys with them.

Wait ~1 minute for deployment to complete.

### Step 3.7: Get Backend URL

1. Click the service
2. Go to "Connect" tab
3. Copy the "Public Domain" URL

Example: `https://fifa-backend-prod-abc123.railway.app`

**Save this!** You'll need it for the frontend.

### Step 3.8: Verify Backend is Running

Open your browser and visit:

```
https://fifa-backend-prod-abc123.railway.app/health
```

You should see:
```json
{"status": "ok"}
```

Or visit the API docs:
```
https://fifa-backend-prod-abc123.railway.app/api/docs
```

✅ **Your backend is running in production!**

---

## Part 4: Deploy Frontend (Next.js)

We'll use **Vercel** (made by Vercel, the company that created Next.js - perfect match!).

### Step 4.1: Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign up"
3. Sign up with GitHub (recommended)
4. Authorize GitHub access

### Step 4.2: Import Project

1. Click "Add New" → "Project"
2. Click "Import Git Repository"
3. Find your repository `FIFA-World-Cup-Predictor`
4. Click "Import"

### Step 4.3: Configure Build Settings

Vercel will show you configuration options:

1. **Framework Preset**: Next.js (auto-detected ✓)
2. **Root Directory**: 
   - Click "Edit"
   - Select: `frontend`
   - Click "Continue"
3. **Build Command**: `npm run build` (auto-filled ✓)
4. **Output Directory**: `.next` (auto-filled ✓)
5. **Install Command**: `npm install` (auto-filled ✓)

### Step 4.4: Set Environment Variables

Before clicking "Deploy", set environment variables:

1. Click "Environment Variables"
2. Add these variables:

```env
NEXT_PUBLIC_API_BASE_URL=https://fifa-backend-prod-abc123.railway.app
NEXT_PUBLIC_API_VERSION=/api/v1
```

**Replace** `fifa-backend-prod-abc123.railway.app` with your actual backend URL from Part 3.7!

### Step 4.5: Deploy

1. Click "Deploy"
2. Wait 3-5 minutes for build and deployment
3. You'll see "Congratulations! Your project has been successfully deployed."

### Step 4.6: Get Frontend URL

Your frontend is now live at a Vercel URL like:

```
https://fifa-world-cup-predictor.vercel.app
```

You can see this in:
1. Deployment success screen
2. Vercel dashboard → Domains section

✅ **Your frontend is live!**

---

## Part 5: Connect Everything

Now that both services are deployed, we need to update the backend to allow the frontend to communicate with it.

### Step 5.1: Update Backend CORS

1. Go to Railway dashboard
2. Click the backend service
3. Go to "Variables" tab
4. Find `CORS_ORIGINS` variable
5. Replace with:

```
https://fifa-world-cup-predictor.vercel.app,https://www.fifa-world-cup-predictor.vercel.app
```

(Replace with your actual Vercel domain)

6. Click "Save"
7. Railway automatically redeploys (~1 minute)

### Step 5.2: Test the Connection

1. Go to your frontend: `https://fifa-world-cup-predictor.vercel.app`
2. Check browser console (F12 → Console tab)
3. You should see **no CORS errors**

---

## Part 6: Verify Deployment

### Step 6.1: Test All Features

**Frontend Access:**
```
https://fifa-world-cup-predictor.vercel.app
```

Go through each test:

- [ ] **Homepage loads** without errors
- [ ] **Sign Up** - Create new account
- [ ] **Login** - Login with your account
- [ ] **Dashboard** - Shows correctly
- [ ] **Match Predictor**:
  - [ ] Matches load
  - [ ] Can submit prediction
  - [ ] AI prediction bars show
- [ ] **Golden Boot** - Can view and select players
- [ ] **Golden Glove** - Can view and select goalkeepers
- [ ] **Tournament Simulator** - Can run simulation
- [ ] **Match Simulator** - Can run simulation
- [ ] **No CORS errors** in browser console (F12)

### Step 6.2: Check Database

Verify data is being stored:

**Via Railway:**
1. Go to Railway PostgreSQL service
2. Click "Connect" → "pgAdmin Connection"
3. Query tables:

```sql
SELECT COUNT(*) FROM users;         -- Should be > 0 after signup
SELECT COUNT(*) FROM teams;         -- Should be 48
SELECT COUNT(*) FROM players;       -- Should be 50
SELECT COUNT(*) FROM matches;       -- Should be 104
```

### Step 6.3: Check Logs for Errors

**Backend Logs:**
1. Go to Railway backend service
2. Click "Deployments" → Latest deployment
3. View logs - should show no critical errors

**Frontend Logs:**
1. Go to Vercel project
2. Click "Deployments" → Latest deployment
3. View "Function Logs" - should show no errors

### Step 6.4: API Health Check

```bash
curl https://fifa-backend-prod-abc123.railway.app/health
# Should return: {"status":"ok"}

curl https://fifa-backend-prod-abc123.railway.app/api/docs
# Should show Swagger API documentation
```

✅ **Your production deployment is complete!**

---

## 📊 Monitoring & Maintenance

### Real-time Monitoring

**Railway:**
1. Dashboard → Backend service
2. "Metrics" tab shows CPU, Memory, Network usage
3. "Logs" tab shows real-time application logs

**Vercel:**
1. Dashboard → Project
2. "Analytics" tab shows page views, response times
3. "Functions" tab shows API routes performance

### Monitoring for Errors

#### Set Up Error Notifications (Recommended)

**Option: Use Railway Built-in Alerts**

1. Railway → Backend service
2. "Settings" tab
3. Set memory/CPU limits
4. Enable alerts if usage exceeds limits

**Option: Monitor Logs Manually**

```bash
# SSH into Railway container (if needed)
railway login
railway service  # Select backend
railway shell
```

### Database Backups

**Railway Automatic Backups:**
- Railway automatically backs up your database
- Available in PostgreSQL service → "Backups" tab

**Manual Backup:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Backup database
railway run pg_dump $DATABASE_URL > backup.sql
```

### Scaling Your Application

As users increase:

1. **Database**: Railway auto-scales (pay for usage)
2. **Backend**: 
   - Currently: 1 container
   - To scale: Contact Railway support or upgrade plan
3. **Frontend**: 
   - Vercel automatically scales
   - No action needed

### Regular Maintenance Tasks

**Weekly:**
- [ ] Check error logs (no critical errors?)
- [ ] Monitor response times (< 500ms?)
- [ ] Check database size (growing normally?)

**Monthly:**
- [ ] Update dependencies:
  ```bash
  # Backend
  cd backend
  pip list --outdated
  
  # Frontend
  cd frontend
  npm outdated
  ```
- [ ] Review costs on Railway/Vercel
- [ ] Backup database manually

**Quarterly:**
- [ ] Update Node.js version (Vercel → Settings)
- [ ] Update Python version (if needed)
- [ ] Security audit of dependencies

### Updating Code

When you make changes and want to deploy:

```bash
# Make changes locally
# Test with docker-compose up -d
# Commit and push to main branch
git add .
git commit -m "Your changes"
git push origin main
```

**What happens next:**
- Railway detects push → auto-builds and deploys backend (~2-3 min)
- Vercel detects push → auto-builds and deploys frontend (~3-5 min)
- You don't need to do anything else!

---

## 🐛 Common Issues & Solutions

### Frontend shows blank page

**Error**: Page loads but nothing displays

**Solution:**
1. Open browser console (F12)
2. Check for errors
3. Most common: API URL is wrong
   ```
   Update NEXT_PUBLIC_API_BASE_URL in Vercel environment variables
   Redeploy: Vercel → Deployments → Redeploy
   ```

### CORS errors in console

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
1. Go to Railway backend service
2. Check `CORS_ORIGINS` variable
3. Should include your Vercel domain
4. Update and redeploy

### "Failed to fetch" when loading data

**Error**: API calls return 404 or connection refused

**Solution:**
1. Verify backend is running: `curl https://your-backend.railway.app/health`
2. Check `DATABASE_URL` is correct
3. Check database is accessible
4. View backend logs for detailed error

### Database connection timeout

**Error**: `Connection timeout` or `Database unavailable`

**Solution:**
1. Go to Railway PostgreSQL service
2. Check status (should be "Active")
3. Check "Memory" and "CPU" usage
4. If maxed out, upgrade plan

### Environment variables not loading

**Error**: `SECRET_KEY` or `DATABASE_URL` undefined errors

**Solution:**
1. Railway → Service → "Variables" tab
2. Verify all variables are set
3. Click "Save" (even if already there)
4. Wait for auto-redeploy (~1 minute)
5. Check deployment logs

### Build fails on Vercel

**Error**: Build log shows errors

**Solution:**
1. Check Root Directory is set to `frontend`
2. Check Node.js version (18.x recommended)
3. Check build logs for specific error
4. Common: Missing environment variable
5. Try: Vercel → Deployments → Redeploy (clear cache)

---

## 🔒 Security Checklist

Before considering production ready:

- [ ] `SECRET_KEY` is random, 32+ characters, and secure
- [ ] `DATABASE_URL` is never committed to Git
- [ ] `.env` files are in `.gitignore`
- [ ] All environment variables are set (no defaults in production)
- [ ] CORS only allows your domain (not `*`)
- [ ] Backend runs without `--reload` mode
- [ ] Frontend is built (not running dev mode)
- [ ] No debug/development logs in production
- [ ] Database has regular backups
- [ ] SSL/HTTPS is enabled (automatic on Vercel/Railway)

---

## 📞 Support & Resources

### If Something Goes Wrong

1. **Check logs first**
   - Railway: Dashboard → Service → "Logs"
   - Vercel: Dashboard → Project → "Functions"

2. **Common error messages**
   - `ModuleNotFoundError` → Missing dependency, check requirements.txt
   - `ConnectionError` → Database not reachable, check DATABASE_URL
   - `CORS error` → Backend CORS_ORIGINS needs updating
   - `404 Not Found` → Endpoint doesn't exist, check spelling

3. **Getting help**
   - Railway Docs: https://docs.railway.app
   - Vercel Docs: https://vercel.com/docs
   - FastAPI Docs: https://fastapi.tiangolo.com
   - Next.js Docs: https://nextjs.org/docs

### Useful Commands

```bash
# View Railway logs
railway logs

# View recent deployments
railway deployments

# Check service status
railway status

# SSH into container
railway shell

# Run command in container
railway run command
```

---

## 🎯 What's Next?

Your app is now live! Here's what to do next:

1. **Custom Domain** (optional)
   - Buy domain: Namecheap, GoDaddy, etc.
   - Add to Vercel: Vercel → Project → "Domains"
   - Add to Railway backend (optional): Railway → Service → "Domains"

2. **Enable HTTPS/SSL** (automatic on Vercel/Railway)
   - All traffic is encrypted
   - No action needed

3. **Monitor Performance**
   - Vercel Analytics
   - Railway Metrics
   - Set up alerts for errors

4. **Scale as You Grow**
   - Monitor costs
   - Upgrade plans if needed
   - Add caching/CDN if needed

5. **Add Features**
   - User leaderboards
   - Social sharing
   - Email notifications
   - Advanced analytics

---

## ✅ Success Checklist

You've successfully deployed when:

- [ ] Frontend accessible at your Vercel domain
- [ ] Backend API returns responses from Railway
- [ ] Users can register and login
- [ ] Data persists in PostgreSQL database
- [ ] All features work (predictions, simulations, etc.)
- [ ] No errors in browser console
- [ ] No errors in backend logs
- [ ] Response times are acceptable (< 1 second)
- [ ] Costs are acceptable (~$10-20/month)
- [ ] Automatic deploys work when pushing to main

---

## 🎉 Congratulations!

Your FIFA World Cup 2026 Prediction Platform is now **live on the internet!** 🚀

Users can now:
- Sign up and create accounts
- Make match predictions
- Run tournament simulations
- Predict Golden Boot and Golden Glove
- See real-time statistics

**Share your app:**
- Send the Vercel URL to friends
- Post on GitHub
- Share on social media

---

**Made with ❤️ for FIFA World Cup 2026**

Questions? Issues? Create a GitHub issue or email trapking1007@gmail.com

Happy deploying! ⚽🏆
