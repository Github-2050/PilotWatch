// ============================================
// FIREBASE CONFIGURATION
// ============================================
// Your Firebase project credentials

const firebaseConfig = {
    apiKey: "",
    authDomain: "pilotwatch-7afae.firebaseapp.com",
    databaseURL: "https://pilotwatch-7afae-default-rtdb.firebaseio.com",
    projectId: "pilotwatch-7afae",
    storageBucket: "pilotwatch-7afae.firebasestorage.app",
    messagingSenderId: "692572767486",
    appId: "1:692572767486:web:548bf69cebb08a3ce0d1af"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

console.log('✅ Firebase initialized successfully! Global likes are now active.');

// ============================================
// SET UP DATABASE RULES
// ============================================
/*
IMPORTANT: Go to your Firebase Console and set these rules:

1. Go to: https://console.firebase.google.com/
2. Select your project "pilotwatch-7afae"
3. Click: Build > Realtime Database
4. Click: Rules tab at the top
5. Replace all content with this:

{
  "rules": {
    "likes": {
      ".read": true,
      ".write": true
    }
  }
}

6. Click "Publish"

This allows anyone to read and write like counts (perfect for a public app).
*/