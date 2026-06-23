# PilotWatch 🎬

An interactive web application for showcasing animated pilots with a like counter, star notification system, and pilot request feature.

## Features

✨ **Randomized Featured Pilot** - The hero section displays a different random pilot each time you visit

❤️ **Like Counter** - Users can like pilots and the count is stored in browser localStorage

⭐ **Star System** - Users can star pilots to get notifications when they're released

🎬 **Request a Pilot** - Users can submit requests for pilots to be added to the collection

🎯 **Pilot Detail Pages** - Click on any pilot to see a full description and larger video thumbnail

📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices

🎨 **Modern UI** - Beautiful gradient design with smooth animations

## File Structure

- **index.html** - Main HTML structure
- **styles.css** - All styling and animations
- **script.js** - JavaScript functionality for likes, stars, requests, and navigation
- **data.js** - Pilot data storage (this is where you add your pilots)
- **README.md** - This file

## How to Add Your Pilots

1. Open `data.js`
2. Each pilot needs the following information:
   - `id`: A unique number for each pilot
   - `title`: The name of the pilot
   - `description`: A detailed description of the pilot
   - `image`: URL or path to a thumbnail image (recommended: 300x200px)
   - `videoThumbnail`: URL or path to a larger image for the detail page (recommended: 1000x600px)

3. Add your pilot data following this structure:

```javascript
{
    id: 1,
    title: "Your Pilot Title",
    description: "Your pilot description here. This will appear on both the main page and detail page.",
    image: "https://example.com/pilot-thumbnail.jpg",
    videoThumbnail: "https://example.com/pilot-video.jpg"
}
```

## How It Works

### Home Page
- **Hero Section**: A random pilot is displayed with a featured card
- **Like Button**: Click the ❤️ to like a pilot (count increases)
- **Star Button**: Click the ⭐ to enable notifications for that pilot
- **Request Button**: Click the "🎬 Request a Pilot" button to submit pilot suggestions
- **Pilot Grid**: Scroll down to see all pilots with their like counts

### Request a Pilot
- **Click the button** to open the request modal
- **Fill in the form** with:
  - Pilot Title (required)
  - Studio/Creator (required)
  - Description (required)
  - Genre (optional)
  - Link (IMDB, YouTube, etc. - optional)
  - Your Name/Handle (optional)
  - Your Email (optional)
- **Submit** the request
- The request is saved locally in your browser

### Pilot Detail Page
- **Click any pilot** from the grid to view its full details
- **Full Description**: See the complete pilot description
- **Video Thumbnail**: View a larger image representation
- **Back Button**: Return to the home page

### Data Storage
- **Likes**: Stored in browser localStorage under 'pilotLikes' and 'pilotLiked'
- **Stars**: Stored in browser localStorage under 'pilotStarred'
- **Requests**: Stored in browser localStorage under 'pilotRequests'
- Data persists across browser sessions on the same device

## Customization

### Colors
Edit the color scheme in `styles.css`. Key colors:
- Primary: `#00d4ff` (cyan)
- Dark background: `#0f0f0f`
- Accent: `#0099ff` (blue)

### Fonts
Change font in `styles.css` body section:
```css
font-family: 'Your Font Here', sans-serif;
```

## Viewing Pilot Requests

Pilot requests are saved locally in your browser's localStorage. To view them:

1. Open your browser's Developer Tools (F12)
2. Go to the "Application" or "Storage" tab
3. Click on "Local Storage"
4. Look for the entry that shows your site's URL
5. Find the `pilotRequests` key to see all submitted requests

The data is stored as JSON and can be exported for review.

## Hosting on GitHub Pages

1. Make sure this repository is public
2. Go to repository Settings → Pages
3. Select 'main' branch as source
4. Your site will be live at `https://github-2050.github.io/PilotWatch/`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Future Enhancements

To automatically create GitHub issues from pilot requests:
1. Set up a backend server that calls the GitHub API
2. Use GitHub Actions with form submission webhooks
3. Integrate a third-party service like Formspree or Basin

## License

Feel free to use and modify this project as needed!

## Support

If you have questions about how to customize or use PilotWatch, check the inline comments in the code files.
