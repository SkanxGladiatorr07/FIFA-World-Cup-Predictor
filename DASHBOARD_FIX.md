# Dashboard Access Fix

## Issue
After successful registration and login, the dashboard won't open.

## Root Cause
The authentication system was using `localStorage` for token storage, but the Next.js middleware runs on the server-side and cannot access `localStorage` (which is client-side only). This caused the middleware to always think the user was not authenticated.

## Solution Implemented
Changed token storage from `localStorage` to **cookies**, which are accessible by both client and server-side code.

### Changes Made:

1. **api-client.ts** - Updated to use cookies instead of localStorage
   - Added cookie helper methods (`setCookie`, `getCookie`, `deleteCookie`)
   - Access tokens expire in 30 minutes
   - Refresh tokens expire in 7 days

2. **auth-store.ts** - Updated to check cookies for authentication

3. **middleware.ts** - Simplified to only check cookies

## Testing Steps

### Option 1: Test with Browser (Recommended)

1. **Clear Browser Data**
   - Press `Ctrl + Shift + Delete`
   - Clear cookies and site data for localhost
   - Close all localhost tabs

2. **Restart Frontend Container**
   ```bash
   docker-compose restart frontend
   ```

3. **Open Fresh Browser Window**
   ```
   http://localhost:3001
   ```

4. **Register New User or Login**
   ```
   Go to: http://localhost:3001/auth/login
   Username: Skan (or your username)
   Password: Your password
   ```

5. **After Login Success**
   - You should see a success toast
   - You should be automatically redirected to `/dashboard`
   - Dashboard should load with your username in navbar

### Option 2: Test with Test HTML Tool

1. **Open the test tool**
   ```
   Open in browser: file:///C:/DJ%20Sanghvi%20College/Projects/FIFA%20World%20Cup%20Real/test_login.html
   ```

2. **Enter credentials and click "Test Login"**
   - Should see success message
   - Cookies will be set

3. **Click "Check Cookies"**
   - Should see access_token and refresh_token

4. **Click "Test Dashboard API"**
   - Should get user info back
   - Confirms token is working

5. **Click "Go to Dashboard"**
   - Should access dashboard successfully

## Debugging Commands

### Check if containers are running
```bash
docker ps
```

### Check frontend logs
```bash
docker logs worldcup_frontend --tail 50
```

### Check backend logs
```bash
docker logs worldcup_backend --tail 50
```

### Test login API directly
```powershell
$body = @{
    username = "Skan"
    password = "your_password_here"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri http://localhost:8000/api/v1/auth/login `
  -Method POST `
  -ContentType "application/json" `
  -Body $body

$response.Content
```

### Test /users/me endpoint
```powershell
# First login to get token (use command above)
# Then test with the token
$token = "YOUR_ACCESS_TOKEN_HERE"

Invoke-WebRequest -Uri http://localhost:8000/api/v1/users/me `
  -Headers @{ Authorization = "Bearer $token" }
```

## Browser Console Debugging

### Check Cookies in Browser Console (F12)
```javascript
// Show all cookies
document.cookie

// Check for access token
document.cookie.split('; ').find(c => c.startsWith('access_token='))

// Check for refresh token
document.cookie.split('; ').find(c => c.startsWith('refresh_token='))
```

### Check Authentication State
```javascript
// Check if user is authenticated (in dashboard page)
// Open Console (F12) and type:
localStorage.clear() // Clear any old localStorage tokens
document.cookie.split('; ')
```

## Common Issues & Solutions

### Issue: Still redirected to login after successful login

**Solution 1: Clear browser cache and cookies**
```
1. Ctrl + Shift + Delete
2. Select "Cookies and other site data"
3. Select "Cached images and files"
4. Click "Clear data"
5. Try again
```

**Solution 2: Check if cookies are being set**
```
1. Login
2. Open DevTools (F12)
3. Go to Application tab
4. Click "Cookies" in left sidebar
5. Click "http://localhost:3001"
6. You should see "access_token" and "refresh_token"
```

**Solution 3: Check CORS settings**
```bash
# Check docker-compose.yml CORS_ORIGINS setting
grep CORS_ORIGINS docker-compose.yml
```
Should include `http://localhost:3001`

### Issue: Cookies not being set

**Check SameSite attribute**
The cookies are set with `SameSite=Lax` which should work for localhost.

**Check cookie expiry**
- Access token: 30 minutes (1800 seconds)
- Refresh token: 7 days (604800 seconds)

**Verify in browser**
```javascript
// After login, run this in console:
document.cookie.split('; ').forEach(c => console.log(c))
```

### Issue: Backend returns 401 Unauthorized

**Check token format**
```bash
# Token should be JWT format: xxxxx.yyyyy.zzzzz
```

**Check token expiry**
```javascript
// Decode token in console (without verification)
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

// Get token from cookie
const token = document.cookie.split('; ').find(c => c.startsWith('access_token='))?.split('=')[1];
if (token) {
    const decoded = parseJwt(token);
    console.log('Token expires at:', new Date(decoded.exp * 1000));
    console.log('Current time:', new Date());
    console.log('Token expired?', decoded.exp * 1000 < Date.now());
}
```

## Verification Checklist

After implementing the fix:

- [ ] Frontend container restarted
- [ ] Browser cache cleared
- [ ] Cookies cleared for localhost
- [ ] Can register new user
- [ ] Can login successfully
- [ ] See success toast after login
- [ ] Cookies are set (check DevTools > Application > Cookies)
- [ ] Redirected to /dashboard after login
- [ ] Dashboard loads with username in navbar
- [ ] Can navigate sidebar items
- [ ] Can logout successfully
- [ ] After logout, cookies are cleared
- [ ] Cannot access /dashboard after logout (redirected to login)

## Next Steps

Once dashboard is accessible:
1. ✅ Verify all dashboard pages load
2. ✅ Test logout functionality
3. ✅ Test token refresh (stay logged in for 30+ minutes)
4. ✅ Test protected routes
5. ⏳ Implement Phase 3 features (match prediction, etc.)

## Files Modified

- `frontend/lib/api-client.ts` - Cookie-based token storage
- `frontend/lib/auth-store.ts` - Cookie-based auth check
- `frontend/middleware.ts` - Simplified cookie check
- `test_login.html` - Debug tool (new)

## Testing Complete?

If dashboard still won't load after these fixes:

1. **Check browser console** for JavaScript errors
2. **Check Network tab** in DevTools for failed requests
3. **Check backend logs** for authentication errors
4. **Use test_login.html** to debug step-by-step
5. **Report the specific error message** you're seeing

---

**Status**: Changes applied, frontend restarted, ready for testing.

**Test URL**: http://localhost:3001/auth/login

**Existing users**: Skan, SkanxPrznt, testuser
