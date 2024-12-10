// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

let blockedWebsites = []; // In-memory storage for blocked websites
let feedbackResponses = []; // In-memory storage for feedback responses

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Blocked Websites Endpoints
app.get('/api/blocked-websites', (req, res) => {
  res.json({ blockedWebsites });
});

app.post('/api/blocked-websites', (req, res) => {
  const website = req.body.website;
  if (website && !blockedWebsites.includes(website)) {
    blockedWebsites.push(website);
  }
  res.json({ blockedWebsites });
});

app.delete('/api/blocked-websites', (req, res) => {
  const website = req.body.website;
  blockedWebsites = blockedWebsites.filter((site) => site !== website);
  res.json({ blockedWebsites });
});

// Feedback Endpoints
app.post('/api/feedback', (req, res) => {
  const { starRating, satisfaction, recommendation, likedFeatures, improvements } = req.body;

  // Validate input
  if (
    typeof starRating !== 'number' ||
    starRating < 1 ||
    starRating > 5 ||
    !satisfaction ||
    !recommendation
  ) {
    return res.status(400).json({ message: 'Invalid or incomplete feedback data.' });
  }

  // Store feedback
  const feedback = {
    starRating,
    satisfaction,
    recommendation,
    likedFeatures: likedFeatures || 'No response',
    improvements: improvements || 'No response',
    submittedAt: new Date(),
  };

  feedbackResponses.push(feedback);

  console.log('New feedback submitted:', feedback); // Log for debugging

  res.status(201).json({ message: 'Feedback submitted successfully.' });
});

app.get('/api/feedback', (req, res) => {
  res.json(feedbackResponses);
});

app.delete('/api/feedback', (req, res) => {
  feedbackResponses = [];
  res.json({ message: 'All feedback has been cleared.' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
