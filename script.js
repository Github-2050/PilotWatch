// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadPilotsData();
    displayFeaturedPilot();
    displayPilotsList();
    loadLikesFromStorage();
    loadStarsFromStorage();
    setupRequestForm();
});

// Modal Functions
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

// Setup Request Form
function setupRequestForm() {
    const form = document.getElementById('requestForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitPilotRequest();
    });
}

// Submit Pilot Request
function submitPilotRequest() {
    const title = document.getElementById('pilotTitle').value;
    const studio = document.getElementById('pilotStudio').value;
    const description = document.getElementById('pilotDescription').value;
    const genre = document.getElementById('pilotGenre').value;
    const link = document.getElementById('pilotLink').value;
    const name = document.getElementById('requesterName').value;
    const email = document.getElementById('requesterEmail').value;

    // Create the request object
    const request = {
        timestamp: new Date().toISOString(),
        title: title,
        studio: studio,
        description: description,
        genre: genre,
        link: link,
        requesterName: name,
        requesterEmail: email
    };

    // Save to localStorage
    const requests = JSON.parse(localStorage.getItem('pilotRequests')) || [];
    requests.push(request);
    localStorage.setItem('pilotRequests', JSON.stringify(requests));

    // Show success message
    showSuccessMessage();

    // Reset form
    document.getElementById('requestForm').reset();

    // Close modal
    closeRequestModal();
}

// Show success message
function showSuccessMessage() {
    const message = document.getElementById('successMessage');
    message.classList.add('show');
    
    setTimeout(() => {
        message.classList.remove('show');
    }, 4000);
}

// Display a randomized featured pilot on hero section
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

// Display all pilots in a grid
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
                        <span id="likes-${pilot.id}">${getLikes(pilot.id)}</span>
                    </div>
                    <button class="star-btn ${starred ? 'starred' : ''}" onclick="toggleStar(${pilot.id}, this)" title="Star for notifications">⭐</button>
                </div>
            </div>
        `;
        
        pilotsGrid.appendChild(card);
    });
}

// Navigate to pilot detail page
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

// Like/Unlike toggle
function toggleLike(pilotId, button) {
    button.classList.toggle('liked');
    updateLikes(pilotId);
    
    const likesSpan = document.getElementById(`likes-${pilotId}`);
    if (likesSpan) {
        likesSpan.textContent = getLikes(pilotId);
    }
}

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

// Local Storage Management for Likes
function getLikes(pilotId) {
    const likes = JSON.parse(localStorage.getItem('pilotLikes')) || {};
    return likes[pilotId] || 0;
}

function updateLikes(pilotId) {
    const likes = JSON.parse(localStorage.getItem('pilotLikes')) || {};
    likes[pilotId] = (likes[pilotId] || 0) + 1;
    localStorage.setItem('pilotLikes', JSON.stringify(likes));
}

function isLiked(pilotId) {
    const liked = JSON.parse(localStorage.getItem('pilotLiked')) || {};
    return liked[pilotId] || false;
}

function loadLikesFromStorage() {
    const liked = JSON.parse(localStorage.getItem('pilotLiked')) || {};
    Object.keys(liked).forEach(pilotId => {
        const btn = document.querySelector(`button[onclick="toggleLike(${pilotId}, this)"]`);
        if (btn && liked[pilotId]) {
            btn.classList.add('liked');
        }
    });
}

// Toggle like state and update storage
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('like-btn')) {
        const onclick = e.target.getAttribute('onclick');
        const pilotId = parseInt(onclick.match(/\d+/)[0]);
        const liked = JSON.parse(localStorage.getItem('pilotLiked')) || {};
        liked[pilotId] = !liked[pilotId];
        localStorage.setItem('pilotLiked', JSON.stringify(liked));
    }
});

// Local Storage Management for Stars (Notifications)
function isStarred(pilotId) {
    const starred = JSON.parse(localStorage.getItem('pilotStarred')) || {};
    return starred[pilotId] || false;
}

function updateStars(pilotId) {
    const starred = JSON.parse(localStorage.getItem('pilotStarred')) || {};
    starred[pilotId] = !starred[pilotId];
    localStorage.setItem('pilotStarred', JSON.stringify(starred));
}

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

// Placeholder for pilots data loading
function loadPilotsData() {
    // This will be populated from data.js
    if (typeof pilots === 'undefined') {
        console.error('Pilots data not loaded. Make sure data.js is included.');
    }
}
