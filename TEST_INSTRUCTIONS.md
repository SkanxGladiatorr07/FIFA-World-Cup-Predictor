# 🧪 Dashboard Access - Testing Instructions

## ✅ Issue Fixed!

**Problem**: Dashboard wouldn't open after successful login  
**Cause**: Tokens stored in localStorage (client-only), but middleware runs server-side  
**Solution**: Changed to cookie-based storage (accessible by both client and server)

---

## 🚀 Quick Test (Start Here!)

### Step 1: Clear Your Browser
**Important**: This ensures old localStorage tokens don't interfere

1. Open Chrome/Edge/Firefox
2. Press `Ctrl + Shift + Delete`
3. Select "Cookies and site data" and "Cached images"
4. Time range: "All time"
5. Click "Clear data"

### Step 2: Login
```
1. Go to: http://localhost:3001/auth/login
2. Enter your credentials:
   - Username: Skan (or your username)
   - Password: Your password
3. Click "Sign In"
```

### Step 3: Success!
✅ You should see a success toast message  
✅ You should be automatically redirected to the dashboard  
✅ Dashboard should show your username in the top-right navbar  

---

## 🔍 Verify It's Working

### Check Cookies Are Set
1. After login, press `F12` to open DevTools
2. Go to **Application** tab
3. Click **Cookies** → **http://localhost:3001**
4. You should see:
   - `access_token` (expires in 30 min)
   - `refresh_token` (expires in 7 days)

### Test Navigation
1. Click sidebar items:
   - ⚽ Match Predictor
   - 🏆 Tournament Simulator
   - 👟 Golden Boot
   - 🧤 Golden Glove
2. All should load without redirecting to login

### Test Logout
1. Click your username/avatar in navbar
2. Click "Logout"
3. Should redirect to home page
4. Cookies should be cleared
5. Try accessing `/dashboard` - should redirect to login

---

## 🛠️ Alternative: Use Debug Tool

If login in browser doesn't work, use the debug tool:

### Open Test Tool
```
Double-click: test_login.html
Or open in browser: file:///C:/DJ%20Sanghvi%20College/Projects/FIFA%20World%20Cup%20Real/test_login.html
```

### Run Tests
1. **Test Login**
   - Enter username and password
   - Click "Test Login"
   - Should show success with user info

2. **Check Cookies**
   - Click "Check Cookies"
   - Should show access_token and refresh_token

3. **Test Dashboard API**
   - Click "Test Dashboard API"
   - Should return your user info

4. **Go to Dashboard**
   - Click "Go to Dashboard" button
   - Should access dashboard successfully

---

## 🐛 Still Not Working?

### Check Console Errors
1. Press `F12` (DevTools)
2. Go to **Console** tab
3. Look for red errors
4. Copy the error message

### Check Network Requests
1. Press `F12` (DevTools)
2. Go to **Network** tab
3. Try logging in
4. Look for failed requests (red status codes)
5. Click the failed request to see details

### Check Backend
```bash
# Check if backend is running
curl http://localhost:8000/health

# Check backend logs
docker logs worldcup_backend --tail 50
```

### Check Frontend
```bash
# Check if frontend is running
curl http://localhost:3001

# Check frontend logs
docker logs worldcup_frontend --tail 50
```

### Restart Everything
```bash
docker-compose down
docker-compose up -d
```

Wait 30 seconds, then try again.

---

## ✅ What Should Work Now

- ✅ Register new user
- ✅ Login with username/password
- ✅ See success toast after login
- ✅ Automatically redirect to dashboard
- ✅ Dashboard loads with your info
- ✅ Navigate all sidebar pages
- ✅ Logout clears cookies
- ✅ Protected routes redirect to login when not authenticated
- ✅ Token refresh works automatically

---

## 📊 Current Test Users

From database:
1. **testuser** (test@example.com)
2. **Skan** (trapking1007@gmail.com)
3. **SkanxPrznt** (ronaldopiku7siuuu@gmail.com)

---

## 🎯 Success Checklist

Test these scenarios:

- [ ] Login works
- [ ] Dashboard loads after login
- [ ] Username shows in navbar
- [ ] Can navigate all pages
- [ ] Logout works
- [ ] Can't access /dashboard after logout
- [ ] Can login again
- [ ] Cookies persist (refresh page, still logged in)
- [ ] Token expires after 30 min (automatically refreshed)

---

## 📝 Technical Details

### What Changed
1. **Token Storage**: localStorage → cookies
2. **Token Access**: Client-only → Client + Server
3. **Middleware**: Can now read cookies and validate auth
4. **Security**: Cookies use SameSite=Lax for CSRF protection

### Cookie Configuration
- **Access Token**: 30 minutes (1800 seconds)
- **Refresh Token**: 7 days (604800 seconds)
- **Path**: `/` (all routes)
- **SameSite**: `Lax` (secure, but works with redirects)

### Files Modified
- `frontend/lib/api-client.ts` - Cookie storage
- `frontend/lib/auth-store.ts` - Cookie auth check
- `frontend/middleware.ts` - Simplified validation

---

## 🚨 If You See Specific Errors

### "Could not validate credentials"
- Token is invalid or expired
- Clear cookies and login again

### "Network Error"
- Backend might be down
- Check: `docker ps` - should show 3 running containers
- Check: `curl http://localhost:8000/health`

### "CORS Error"
- Check docker-compose.yml CORS_ORIGINS includes http://localhost:3001

### "Unauthorized"
- Token missing or expired
- Check cookies exist (F12 > Application > Cookies)

### Infinite Redirect Loop
- Clear all cookies and localStorage
- Restart frontend: `docker-compose restart frontend`

---

## 📞 Need More Help?

1. **Check**: DASHBOARD_FIX.md (detailed debugging)
2. **Check**: TESTING_GUIDE.md (comprehensive tests)
3. **Check**: QUICK_START.md (getting started)
4. **Use**: test_login.html (debug tool)

---

**Ready to test?** Go to: http://localhost:3001/auth/login

**Containers running?** Check: `docker ps`

**Backend healthy?** Check: `curl http://localhost:8000/health`

✨ **Everything is fixed and ready for your testing!** ✨
