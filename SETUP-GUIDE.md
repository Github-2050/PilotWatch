# 🎬 PilotWatch - Setup & Configuration Guide

All files are now updated! Here's what you need to do to make everything work:

## ✅ STEP 1: Firebase Database Rules (IMPORTANT!)

**Without this step, global likes WON'T work!**

1. Go to: https://console.firebase.google.com/
2. Select project **"pilotwatch-7afae"**
3. Click: **Build > Realtime Database**
4. Click the **Rules** tab at the top
5. Delete all existing content and paste this:

```json
{
  "rules": {
    "likes": {
      ".read": true,
      ".write": true
    }
  }
}
```

6. Click **PUBLISH**

✅ Firebase is now ready for global likes!

---

## ✅ STEP 2: Set Up Formspree (For Pilot Requests)

Users need a way to email you their pilot requests. Formspree makes this easy!

1. Go to: https://formspree.io/
2. Click **Sign Up** (use your email)
3. Verify your email
4. Click **New Form**
5. Name it "PilotWatch Requests" or anything you want
6. Copy the form ID (it looks like: `xyzdefgh`)

### Update Your Form Action

1. Open your GitHub repo
2. Go to **index.html**
3. Find line 56 where it says: `action="https://formspree.io/f/xyzdefgh"`
4. Replace `xyzdefgh` with your actual Formspree form ID
5. **Save & Commit**

✅ Formspree is now ready!

**Test it:**
- Visit your site
- Click "🎬 Request a Pilot"
- Fill out the form
- Submit it
- Check your email! 📧

---

## ✅ STEP 3: Verify Global Likes Work

1. Open your site: https://github-2050.github.io/PilotWatch/
2. Click ❤️ on any pilot
3. The like count should increase
4. **Open the site in a different browser or device**
5. The count should be **the same** on both! 🌐

**If likes are still local:**
- Open browser DevTools (F12)
- Go to **Console** tab
- Look for error messages about Firebase
- Common issue: Firebase Database Rules not published

---

## 🔧 Troubleshooting

### "Likes aren't updating globally"
✅ Did you set Firebase Database Rules? (Step 1)
✅ Did you click PUBLISH after setting the rules?
✅ Check browser console (F12) for errors

### "Requests aren't emailing"
✅ Did you update the Formspree form action in index.html? (Step 2)
✅ Did you verify your email on Formspree?
✅ Check spam folder

### "Firebase says API key is invalid"
This is OK! The credentials are public. The rules control what's allowed.

---

## 📊 Managing Requests

Once Formspree is set up, you can:

1. Go to https://formspree.io/
2. Log in
3. Click your "PilotWatch Requests" form
4. See all submissions in the dashboard
5. Export as CSV anytime

---

## 🎬 Add Your Pilots

Open `data.js` and add pilots with this structure:

```javascript
{
    id: 1,
    title: "Pilot Name",
    description: "Full description here",
    image: "https://example.com/thumbnail.jpg",
    videoThumbnail: "https://example.com/video.jpg"
}
```

---

## 🚀 You're All Set!

Your PilotWatch is now live with:
- ✅ Global like counters (Firebase)
- ✅ Pilot requests with email notifications (Formspree)
- ✅ Star system for notifications (local)
- ✅ Beautiful responsive design

**Live URL:** https://github-2050.github.io/PilotWatch/

---

## 💡 Feature Ideas

- Add email notifications when starred pilots are released
- User accounts to track likes across devices
- 5-star ratings for pilots
- Comments section
- Social media share buttons
- Search/filter by genre
- Dark/Light mode toggle

---

## 📝 Need Help?

Check the README.md for more details, or review the comments in:
- `script.js` - How global likes work
- `firebase-config.js` - Firebase setup
- `data.js` - How to add pilots