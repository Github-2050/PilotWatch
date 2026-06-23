// ============================================
// FIREBASE CONFIGURATION
// ============================================
// Replace these with your Firebase project credentials
// Get these from: Firebase Console > Project Settings > General

// STEP 1: Go to https://console.firebase.google.com/
// STEP 2: Create a new project (or use existing)
// STEP 3: Go to Project Settings
// STEP 4: Copy your firebaseConfig below

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

console.log('Firebase initialized successfully!');

// ============================================
// HOW TO SET UP FIREBASE:
// ============================================
/*
1. Visit https://console.firebase.google.com/
2. Click "Create a project" or select existing project
3. Fill in project details
4. Enable Realtime Database:
   - Go to Build > Realtime Database
   - Click "Create Database"
   - Choose "Start in test mode" (for development)
   - Click "Enable"

5. Set Database Rules to:
   {
     "rules": {
       "likes": {
         ".read": true,
         ".write": true
       }
     }
   }

6. Get your config:
   - Click Project Settings (gear icon)
   - Scroll to "Your apps"
   - Select the web app
   - Copy the entire firebaseConfig object
   - Paste it above, replacing the placeholder values

7. IMPORTANT: These credentials are public, it's OK!
   The database rules control what can be accessed.
*/