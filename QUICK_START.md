# 🚀 Quick Start Guide - FIFA World Cup 2026 Predictor

## ✅ System Status: READY

All systems are operational and ready for testing!

---

## 📱 Access the Application

### Frontend (Main Application)
```
🌐 http://localhost:3001
```

### Backend API
```
🔧 http://localhost:8000
📚 API Docs: http://localhost:8000/docs
```

---

## 🎯 Test Registration Now!

### Step 1: Open Registration Page
Click here or paste in browser:
```
http://localhost:3001/auth/register
```

### Step 2: Fill Registration Form

**Your Information:**
- **Email**: Your email address
- **Username**: 3-20 characters (letters, numbers, underscore only)
- **Password**: 8+ characters with uppercase, lowercase, and number
- **Confirm Password**: Same as password

**Example:**
```
Email: john@example.com
Username: john123
Password: MyPass123!
Confirm: MyPass123!
```

### Step 3: Click "Sign Up"
✅ You should see a success message  
✅ You'll be redirected to the login page

### Step 4: Login
```
http://localhost:3001/auth/login
```
Use the username and password you just created.

### Step 5: Explore Dashboard
After login, you'll see:
- 📊 Statistics dashboard
- ⚽ Match predictor
- 🏆 Tournament simulator
- 👟 Golden boot predictor
- 🧤 Golden glove predictor

---

## 🔧 Quick Commands

### Check All Containers
```bash
docker ps
```
Should show 3 running containers.

### View Backend Logs
```bash
docker logs worldcup_backend --tail 30
```

### View Frontend Logs
```bash
docker logs worldcup_frontend --tail 30
```

### Restart Everything
```bash
docker-compose restart
```

### Stop Everything
```bash
docker-compose down
```

### Start Everything
```bash
docker-compose up -d
```

---

## 🐛 Quick Troubleshooting

### Registration Not Working?

1. **Check browser console** (Press F12)
   - Look for red errors
   - Check the Network tab

2. **Verify backend is running**
   ```bash
   curl http://localhost:8000/health
   ```
   Should return: `{"status":"healthy"...}`

3. **Check backend logs**
   ```bash
   docker logs worldcup_backend --tail 50
   ```

### Can't Access Frontend?

1. **Check if port 3001 is accessible**
   ```bash
   curl http://localhost:3001
   ```

2. **Check frontend logs**
   ```bash
   docker logs worldcup_frontend --tail 50
   ```

3. **Restart frontend container**
   ```bash
   docker-compose restart frontend
   ```

---

## 📊 Current Data

### Teams Loaded
✅ 48 teams across 12 groups (A-L)

### Sample Players
✅ 5 forwards (Messi, Ronaldo, Mbappé, Haaland, Kane)  
✅ 5 goalkeepers (Alisson, Courtois, Neuer, Donnarumma, Ederson)

### Sample Matches
✅ 8 matches from group stage

---

## 🎉 What's Working

- ✅ User registration
- ✅ User login
- ✅ JWT authentication
- ✅ Protected routes
- ✅ Dashboard layout
- ✅ Teams data API
- ✅ Password validation
- ✅ Form validation
- ✅ Toast notifications
- ✅ Responsive design

---

## 📝 Next Steps After Registration

1. ✅ **Register your account**
2. ✅ **Login to dashboard**
3. ⏳ **Test match prediction** (Phase 3 - Coming soon)
4. ⏳ **Test tournament simulation** (Phase 3 - Coming soon)
5. ⏳ **Test golden boot/glove predictions** (Phase 3 - Coming soon)

---

## 💡 Password Requirements

Your password must have:
- ✅ At least 8 characters
- ✅ At least 1 uppercase letter (A-Z)
- ✅ At least 1 lowercase letter (a-z)
- ✅ At least 1 number (0-9)

**Good examples:**
- `SecurePass123`
- `MyPass2026!`
- `Football123`

**Bad examples:**
- `password` (no uppercase or numbers)
- `Pass1` (too short)
- `PASSWORD123` (no lowercase)

---

## 🆘 Need Help?

### View Full Documentation
- `README.md` - Project overview
- `TESTING_GUIDE.md` - Complete testing instructions
- `REGISTRATION_FIX_SUMMARY.md` - Recent fixes and verification
- `DOCKER_SETUP.md` - Docker troubleshooting

### Check API Documentation
```
http://localhost:8000/docs
```
Interactive API documentation with all endpoints.

### Verify Database
```bash
docker exec -it worldcup_db psql -U admin -d worldcup -c "\dt"
```
Should show 8 tables.

---

## 🎊 Success Checklist

Before reporting issues, verify:

- [ ] Docker Desktop is running
- [ ] All 3 containers are running (`docker ps`)
- [ ] Backend health check works (`curl http://localhost:8000/health`)
- [ ] Frontend is accessible (`http://localhost:3001`)
- [ ] Browser console has no errors (F12)
- [ ] Using a valid email format
- [ ] Username is 3-20 characters
- [ ] Password meets requirements
- [ ] Passwords match

---

**🚀 Ready to start? Go to: http://localhost:3001/auth/register**

**✨ Registration is fully working and ready for your testing!**
