# PilotWatch 🎬

An interactive web application for showcasing animated pilots with **global like counters**, star notification system, and pilot request feature.

## ✨ Features

🌐 **Global Like Counters** - Likes are shared across all users via Firebase  
⭐ **Star System** - Users can star pilots for release notifications  
🎙️ **Pilot Requests** - Users can submit pilot suggestions (emailed to you via Formspree)  
🎬 **Randomized Featured Pilot** - Different pilot featured each visit  
📱 **Responsive Design** - Works on desktop, tablet, and mobile  
🎨 **Modern UI** - Beautiful cyan/blue gradient with animations  

## 📁 File Structure

- **index.html** - Main HTML structure
- **styles.css** - All styling and animations
- **script.js** - JavaScript functionality (likes, stars, requests)
- **data.js** - Your pilot data storage
- **firebase-config.js** - Firebase credentials (for global likes)
- **README.md** - This file

## 🚀 Quick Start

### 1. Add Your Pilots

Open `data.js` and add pilots with these fields:
```javascript
{
    id: 1,
    title: "Your Pilot Title",
    description: "Full description here",
    image: "https://example.com/thumbnail.jpg",
    videoThumbnail: "https://example.com/video.jpg"
}
```

### 2. Enable Global Likes (Firebase)

**Firebase is already configured!** The global like counter should work immediately.

To verify it's working:
1. Open your site in two different browsers or devices
2. Click the ❤️ button on a pilot
3. The count should increase in **both** browsers instantly! 🌐

**If it's not working:**
- Check Firebase Database Rules (see below)
- Check browser console (F12) for errors

### 3. Set Up Pilot Requests (Formspree)

1. Go to https://formspree.io/
2. Sign up with your email
3. Create a new form
4. Copy your form ID (looks like: `xyzdefgh`)
5. In `index.html`, line 56, replace the form action:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
6. Save and commit
7. When users submit requests, you'll get emails! 📧

### 4. Enable GitHub Pages

1. Go to your repo Settings → Pages
2. Select `main` branch
3. Your site will be live at: **https://github-2050.github.io/PilotWatch/**

---

## 🌍 How Global Likes Work

**The Like Counter Shows:**
- 🌐 = Global count (all users combined, via Firebase)
- 📱 = Local count (just your device, if Firebase isn't set up)

**Data Flow:**
1. User clicks ❤️ on a pilot
2. Count increases in Firebase database
3. All users see the same number instantly
4. Also stored locally for fast loading

**Example:**
- User A likes "Pilot 1" → Count: 1
- User B likes "Pilot 1" → Count: 2 (both users see this)
- User C likes "Pilot 1" → Count: 3 (all three see this)

---

## ⭐ How Stars Work

Stars are for **personal notifications** (stored locally):
- Only you see your starred pilots
- When you star a pilot, it remembers on your device
- Each device/browser tracks stars separately

**Future enhancement:** Add email notifications when starred pilots release.

---

## 📋 How Requests Work

1. User clicks "🎬 Request a Pilot"
2. Modal form opens with fields:
   - Pilot Title (required)
   - Studio/Creator (required)
   - Description (required)
   - Genre (optional)
   - Link (optional)
   - Name/Handle (optional)
   - Email (required)
3. User submits → Formspree receives it
4. **You get an email** with the request ✉️

---

## 🔧 Customization

### Colors
Edit `styles.css`:
```css
Primary: #00d4ff (cyan)
Dark background: #0f0f0f
Accent: #0099ff (blue)
```

### Fonts
Edit `styles.css` body section:
```css
font-family: 'Your Font Here', sans-serif;
```

---

## 🔐 Firebase Database Rules

To ensure global likes work properly, set these rules:

1. Go to: https://console.firebase.google.com/
2. Select project "pilotwatch-7afae"
3. Click: **Build > Realtime Database**
4. Click: **Rules** tab
5. Replace all content with:

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

6. Click **Publish**

This allows anyone to read and write like counts (perfect for a public app).

---

## 🛠️ Troubleshooting

### Likes aren't global?
- Check Firebase Database Rules are set (see above)
- Check browser console (F12) for errors
- Make sure `firebase-config.js` is loaded

### Requests aren't emailing?
- Confirm Formspree form action is updated in `index.html`
- Sign in to Formspree to see submissions
- Check spam folder for test emails

### Like counter stuck on local?
- Open browser DevTools (F12)
- Go to Application → Local Storage
- Clear `pilotLikesGlobal` entries
- Refresh page
- Try clicking like again

---

## 📊 View Pilot Requests

Requests are handled by Formspree:
1. Go to https://formspree.io/
2. Log in to your account
3. Click your form
4. See all submissions in the dashboard
5. Export as CSV if needed

---

## 🌐 Hosting

Already on GitHub Pages at:
**https://github-2050.github.io/PilotWatch/**

---

## 💡 Feature Ideas

- [ ] Email notifications when starred pilots are released
- [ ] User accounts to track likes across devices
- [ ] Pilot ratings (1-5 stars)
- [ ] Comments section
- [ ] Share buttons for social media
- [ ] Dark/Light mode toggle
- [ ] Search/filter pilots by genre

---

## 📝 License

Free to use and modify!

---

## 🎬 Need Help?

Check the comments in the code files for detailed explanations of how each system works.