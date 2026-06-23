// ============================================
// FIREBASE GLOBAL LIKES SYSTEM
// ============================================
let firebaseReady = false;

// Check if Firebase is initialized
setTimeout(() => {
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
        firebaseReady = true;
        console.log('Firebase is ready for global likes!');
    } else {
        console.warn('Firebase not configured. Using local storage for likes.');
    }
}, 1000);

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadPilotsData();
    displayFeaturedPilot();
    displayPilotsList();
    loadLikesFromStorage();
    loadStarsFromStorage();
    setupRequestForm();
    
    // If Firebase is ready, sync likes from database
    setTimeout(() => {
        if (firebaseReady) {
            syncLikesWithFirebase();
        }
    }, 2000);
});

// ============================================
// MODAL FUNCTIONS
// ============================================
function openRequestModal() {
    const modal = document.getElementById('requestModal');
    modal.classList.add('show');
}

function closeRequestModal() {
    const modal = document.getElementById('requestModal');
    modal.classList.remove('show');
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('requestModal');
    if (event.target == modal) {
        modal.classList.remove('show');
    }
}

// ============================================
// REQUEST FORM WITH FORMSPREE
// ============================================
function setupRequestForm() {
    const form = document.getElementById('requestForm');
    form.addEventListener('submit', function(e) {
        // Let Formspree handle the submission
        // This will submit to Formspree and send you an email
        // The form will auto-redirect after success
    });
}

// Show success message (Formspree will redirect, but we'll add a fallback)
function showSuccessMessage() {
    const message = document.getElementById('successMessage');
    message.classList.add('show');
    
    setTimeout(() => {
        message.classList.remove('show');
    }, 4000);
}

// ============================================
// FEATURED PILOT DISPLAY
// ============================================
function displayFeaturedPilot() {
    const randomIndex = Math.floor(Math.random() * pilots.length);
    const pilot = pilots[randomIndex];
    const heroSection = document.getElementById('featuredPilot');

    heroSection.innerHTML = `
        <img src="${pilot.image}" alt="${pilot.title}" class="featured-pilot-image">
        <h2>${pilot.title}</h2>
        <p>${pilot.description.substring(0, 150)}...</p>
        <div class="featured-actions">
            <button class="btn btn-primary" onclick="goToPilotDetail(${pilot.id})">Watch Pilot</button>
            <button class="btn btn-secondary" id="featured-star-btn" onclick="toggleStarFeatured(${pilot.id})">⭐ Star for Notification</button>
        </div>
    `;
}

// ============================================
// PILOT LIST DISPLAY WITH GLOBAL LIKES
// ============================================
function displayPilotsList() {
    const pilotsGrid = document.getElementById('pilotsGrid');
    pilotsGrid.innerHTML = '';

    pilots.forEach(pilot => {
        const liked = isLiked(pilot.id);
        const starred = isStarred(pilot.id);
        
        const card = document.createElement('div');
        card.className = 'pilot-card';
        card.innerHTML = `
            <img src="${pilot.image}" alt="${pilot.title}" class="pilot-card-image" onclick="goToPilotDetail(${pilot.id})">
            <div class="pilot-card-content">
                <h3 onclick="goToPilotDetail(${pilot.id})" style="cursor: pointer;">${pilot.title}</h3>
                <p>${pilot.description.substring(0, 100)}...</p>
                <div class="pilot-card-footer">
                    <div class="like-counter">
                        <button class="like-btn ${liked ? 'liked' : ''}" onclick="toggleLike(${pilot.id}, this)" title="Like this pilot">❤️</button>
                        <span id="likes-${pilot.id}">
                            <span class="like-count">${getLikes(pilot.id)}</span>
                            <span class="like-status" style="font-size: 0.8rem; color: #999;">${firebaseReady ? '🌐' : '📱'}</span>
                        </span>
                    </div>
                    <button class="star-btn ${starred ? 'starred' : ''}" onclick="toggleStar(${pilot.id}, this)" title="Star for notifications">⭐</button>
                </div>
            </div>
        `;
        
        pilotsGrid.appendChild(card);
    });
}

// ============================================
// PILOT DETAIL PAGE
// ============================================
function goToPilotDetail(pilotId) {
    const pilot = pilots.find(p => p.id === pilotId);
    if (!pilot) return;

    // Create a detail page view
    document.body.innerHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${pilot.title} - PilotWatch</title>
            <link rel="stylesheet" href="styles.css">
            <script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"><\/script>
            <script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js"><\/script>
        </head>
        <body>
            <div class="pilot-detail">
                <div class="pilot-detail-header">
                    <h1>${pilot.title}</h1>
                </div>
                <img src="${pilot.videoThumbnail}" alt="${pilot.title}" class="pilot-detail-video">
                <div class="pilot-detail-description">
                    <h3>About this Pilot</h3>
                    <p>${pilot.description}</p>
                </div>
                <div class="pilot-detail-actions">
                    <button class="back-btn" onclick="location.reload()">← Back to Home</button>
                    <button class="btn btn-secondary" onclick="toggleStarDetail(${pilot.id})">⭐ Star for Notification</button>
                </div>
            </div>
            <script src="firebase-config.js"><\/script>
            <script src="data.js"><\/script>
            <script src="script.js"><\/script>
            <script>
                // Load likes and stars for this detail view
                loadLikesFromStorage();
                loadStarsFromStorage();
            <\/script>
        </body>
        </html>
    `;
}

// ============================================
// LIKE FUNCTIONS - GLOBAL (FIREBASE)
// ============================================

// Get likes from Firebase or localStorage
function getLikes(pilotId) {
    if (firebaseReady) {
        // Return from Firebase (synced globally)
        const likes = JSON.parse(localStorage.getItem('pilotLikesGlobal')) || {};
        return likes[pilotId] || 0;
    } else {
        // Fallback to localStorage
        const likes = JSON.parse(localStorage.getItem('pilotLikes')) || {};
        return likes[pilotId] || 0;
    }
}

// Update likes in Firebase
function updateLikes(pilotId) {
    if (firebaseReady) {
        // Get current count from Firebase
        const likesRef = database.ref(`likes/pilot_${pilotId}`);
        likesRef.once('value', (snapshot) => {
            const currentLikes = snapshot.val() || 0;
            const newLikes = currentLikes + 1;
            
            // Update in Firebase
            likesRef.set(newLikes);
            
            // Update local cache
            const likesCache = JSON.parse(localStorage.getItem('pilotLikesGlobal')) || {};
            likesCache[pilotId] = newLikes;
            localStorage.setItem('pilotLikesGlobal', JSON.stringify(likesCache));
            
            // Update UI
            updateLikeDisplay(pilotId);
        });
    } else {
        // Fallback to localStorage
        const likes = JSON.parse(localStorage.getItem('pilotLikes')) || {};
        likes[pilotId] = (likes[pilotId] || 0) + 1;
        localStorage.setItem('pilotLikes', JSON.stringify(likes));
    }
}

// Sync likes from Firebase to display
function syncLikesWithFirebase() {
    const likesRef = database.ref('likes');
    likesRef.on('value', (snapshot) => {
        const allLikes = snapshot.val() || {};
        const likesCache = {};
        
        // Convert Firebase format to our format
        Object.keys(allLikes).forEach(key => {
            const pilotId = key.replace('pilot_', '');
            likesCache[pilotId] = allLikes[key];
        });
        
        // Cache in localStorage
        localStorage.setItem('pilotLikesGlobal', JSON.stringify(likesCache));
        
        // Update all displays
        Object.keys(likesCache).forEach(pilotId => {
            updateLikeDisplay(pilotId);
        });
    });
}

// Update like count in UI
function updateLikeDisplay(pilotId) {
    const likesSpan = document.querySelector(`#likes-${pilotId} .like-count`);
    if (likesSpan) {
        likesSpan.textContent = getLikes(pilotId);
    }
}

// Check if user liked (personal preference, stored locally)
function isLiked(pilotId) {
    const liked = JSON.parse(localStorage.getItem('pilotLiked')) || {};
    return liked[pilotId] || false;
}

// Load user's like preferences from localStorage
function loadLikesFromStorage() {
    const liked = JSON.parse(localStorage.getItem('pilotLiked')) || {};
    Object.keys(liked).forEach(pilotId => {
        const btn = document.querySelector(`button[onclick="toggleLike(${pilotId}, this)"]`);
        if (btn && liked[pilotId]) {
            btn.classList.add('liked');
        }
    });
}

// Toggle like and update storage
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('like-btn')) {
        const onclick = e.target.getAttribute('onclick');
        const pilotId = parseInt(onclick.match(/\d+/)[0]);
        const liked = JSON.parse(localStorage.getItem('pilotLiked')) || {};
        liked[pilotId] = !liked[pilotId];
        localStorage.setItem('pilotLiked', JSON.stringify(liked));
    }
});

// Like/Unlike toggle
function toggleLike(pilotId, button) {
    button.classList.toggle('liked');
    updateLikes(pilotId);
}

// ============================================
// STAR FUNCTIONS - LOCAL (USER PREFERENCES)
// ============================================

// Star/Unstar toggle
function toggleStar(pilotId, button) {
    button.classList.toggle('starred');
    updateStars(pilotId);
}

// Star/Unstar for featured pilot
function toggleStarFeatured(pilotId) {
    const btn = document.getElementById('featured-star-btn');
    btn.classList.toggle('starred');
    updateStars(pilotId);
}

// Star/Unstar for detail page
function toggleStarDetail(pilotId) {
    updateStars(pilotId);
    alert('⭐ Notification enabled! You\'ll be notified when this pilot is released.');
}

// Local Storage Management for Stars
function isStarred(pilotId) {
    const starred = JSON.parse(localStorage.getItem('pilotStarred')) || {};
    return starred[pilotId] || false;
}

// Update stars in localStorage
function updateStars(pilotId) {
    const starred = JSON.parse(localStorage.getItem('pilotStarred')) || {};
    starred[pilotId] = !starred[pilotId];
    localStorage.setItem('pilotStarred', JSON.stringify(starred));
}

// Load stars from localStorage
function loadStarsFromStorage() {
    const starred = JSON.parse(localStorage.getItem('pilotStarred')) || {};
    Object.keys(starred).forEach(pilotId => {
        const buttons = document.querySelectorAll(`button[onclick*="toggleStar(${pilotId}"]`);
        buttons.forEach(btn => {
            if (starred[pilotId]) {
                btn.classList.add('starred');
            }
        });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Load pilots data from data.js
function loadPilotsData() {
    if (typeof pilots === 'undefined') {
        console.error('Pilots data not loaded. Make sure data.js is included.');
    }
}