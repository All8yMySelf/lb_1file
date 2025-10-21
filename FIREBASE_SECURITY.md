# Firebase Security Setup

## Overview

This document explains the security improvements implemented for the Orbital Defense leaderboard system and how to deploy them to your Firebase project.

## Security Improvements

### 1. Strict Database Validation Rules

The `database.rules.json` file now includes comprehensive validation to prevent malicious or invalid score submissions:

**What's validated:**
- ✅ Initials: 1-3 characters, uppercase letters and numbers only (A-Z, 0-9)
- ✅ Wave: Number between 1 and 1000
- ✅ Time: Non-negative number
- ✅ Date: Must be a string
- ✅ Ranking: Must be a number
- ✅ All required fields must be present

**What this prevents:**
- ❌ Empty or excessively long initials
- ❌ Special characters or SQL injection attempts
- ❌ Negative or unrealistic wave numbers
- ❌ Negative time values
- ❌ Missing required fields
- ❌ Invalid data types

### 2. Client-Side Rate Limiting

The game now limits score submissions to **3 per minute** per client:

```javascript
// Max 3 submissions per minute
RATE_LIMIT = {
  submissions: 0,
  resetTime: Date.now() + 60000
}
```

**What this prevents:**
- ❌ Automated score spamming
- ❌ Rapid-fire submissions
- ❌ Accidental double submissions

### 3. Enhanced Error Handling

Score submission errors now provide clear feedback:

- **PERMISSION_DENIED**: "Invalid score data. Please check your submission."
- **Other errors**: "Failed to submit score. Please try again."

Errors are logged to console for debugging and shown to users via toast notifications.

## Deploying Firebase Security Rules

### Option 1: Firebase Console (Recommended for beginners)

1. **Open Firebase Console**
   - Go to https://console.firebase.google.com/
   - Select your project: `lb-1file`

2. **Navigate to Realtime Database**
   - Click "Realtime Database" in the left sidebar
   - Click the "Rules" tab

3. **Update Rules**
   - Copy the entire contents of `database.rules.json`
   - Paste into the rules editor
   - Click "Publish"

4. **Verify Rules**
   - The rules should show as published
   - Test by submitting a valid score
   - Test by trying to submit invalid data (it should be rejected)

### Option 2: Firebase CLI (Recommended for developers)

1. **Install Firebase CLI** (if not already installed)
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase in your project** (if not already done)
   ```bash
   firebase init
   ```
   - Select "Realtime Database"
   - Choose your existing project
   - Use `database.rules.json` as your rules file

4. **Deploy Rules**
   ```bash
   firebase deploy --only database
   ```

5. **Verify Deployment**
   - Check the console output for success message
   - Visit Firebase Console to confirm rules are active

### Option 3: REST API

```bash
curl -X PUT \
  -d @database.rules.json \
  'https://lb-1file-default-rtdb.firebaseio.com/.settings/rules.json?auth=YOUR_FIREBASE_SECRET'
```

## Testing the Security Rules

### Test Valid Submission

Should **SUCCEED**:
```javascript
await submitScore({
  initials: "ABC",
  wave: 5,
  time: 123,
  ranking: 500000 - 123
});
```

### Test Invalid Submissions

Should **FAIL** with PERMISSION_DENIED:

```javascript
// Too many characters
await submitScore({
  initials: "ABCD",
  wave: 5,
  time: 123,
  ranking: 500000
});

// Invalid characters
await submitScore({
  initials: "A!B",
  wave: 5,
  time: 123,
  ranking: 500000
});

// Negative wave
await submitScore({
  initials: "ABC",
  wave: -1,
  time: 123,
  ranking: 500000
});

// Missing fields
await submitScore({
  initials: "ABC",
  wave: 5
  // missing time and ranking
});
```

## Additional Security Recommendations

### 1. Enable Firebase App Check (Optional but Recommended)

Firebase App Check provides additional protection against abuse:

1. Go to Firebase Console → App Check
2. Register your web app
3. Choose reCAPTCHA v3 or reCAPTCHA Enterprise
4. Add the App Check SDK to your app:

```html
<script type="module">
  import { initializeAppCheck, ReCaptchaV3Provider } from
    "https://www.gstatic.com/firebasejs/11.9.1/firebase-app-check.js";

  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('YOUR_RECAPTCHA_SITE_KEY'),
    isTokenAutoRefreshEnabled: true
  });
</script>
```

5. Enforce App Check in Database Rules:
```json
{
  "rules": {
    "scores": {
      ".read": "request.app != null",
      ".write": "request.app != null && [validation rules]"
    }
  }
}
```

### 2. Monitor Database Usage

- Set up budget alerts in Firebase Console
- Monitor the "Usage" tab for unusual spikes
- Check "Realtime Database → Data" for suspicious entries

### 3. Set Up Database Backup

Enable automatic backups:
1. Firebase Console → Realtime Database
2. Click ⋮ menu → "Export JSON"
3. Schedule regular backups (manual or automated)

### 4. Consider Additional Rate Limiting

For high-traffic scenarios, consider:
- Cloudflare rate limiting
- Firebase Cloud Functions with custom rate limiting
- IP-based restrictions

## Troubleshooting

### "Permission Denied" errors on valid submissions

**Possible causes:**
1. Rules not deployed correctly
2. Data format doesn't match validation rules
3. Browser cache showing old rules

**Solutions:**
- Re-deploy rules using Firebase Console
- Check browser console for exact error details
- Clear browser cache and try again
- Verify all required fields are present

### Rules not updating

**Solutions:**
- Wait 1-2 minutes for propagation
- Hard refresh Firebase Console (Ctrl+Shift+R)
- Check Firebase Console → Realtime Database → Rules tab
- Verify you're looking at the correct database instance

### Rate limiting triggering too frequently

**Solutions:**
- Increase rate limit from 3 to 5 submissions per minute
- Extend time window from 60000ms to 120000ms (2 minutes)
- Store rate limit data in localStorage to persist across page reloads

## Security Checklist

- [x] Database validation rules deployed
- [x] Client-side rate limiting implemented
- [x] Error handling added
- [ ] Firebase App Check configured (optional)
- [ ] Monitoring and alerts set up
- [ ] Regular backups scheduled

## Support

For issues or questions:
- Check Firebase Console logs
- Review browser console for errors
- Consult Firebase documentation: https://firebase.google.com/docs/database/security
- Open an issue in the repository

---

**Last Updated:** 2025-10-21
**Firebase Project:** lb-1file
**Database URL:** https://lb-1file-default-rtdb.firebaseio.com
