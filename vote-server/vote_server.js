const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

// Use cookie-parser middleware
app.use(cookieParser());

// In-memory storage for votes (for demo purposes)
const votes = {
  yes: 0,
  no: 0
};

// Simple HTML page to show the voting form
app.get('/', (req, res) => {
  // Check if the user has already voted
  if (req.cookies.hasVoted) {
    return res.send('<h1>You have already voted!</h1>');
  }

  res.send(`
    <h1>Vote for the Question:</h1>
    <form method="POST" action="/vote">
      <button type="submit" name="vote" value="yes">Yes</button>
      <button type="submit" name="vote" value="no">No</button>
    </form>
  `);
});

// Route to handle the voting process
app.post('/vote', (req, res) => {
  const userVote = req.query.vote; // This gets the value from the form

  if (!userVote || !['yes', 'no'].includes(userVote)) {
    return res.status(400).send('Invalid vote');
  }

  // Record the vote
  votes[userVote]++;

  // Set a cookie to mark that the user has voted
  res.cookie('hasVoted', 'true', { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year cookie
  res.send(`
    <h1>Thank you for voting!</h1>
    <p>Your vote has been recorded: ${userVote}</p>
    <a href="/">Back to home</a>
  `);
});

// Route to check vote results (for demo purposes)
app.get('/results', (req, res) => {
  res.send(`
    <h1>Voting Results:</h1>
    <p>Yes: ${votes.yes}</p>
    <p>No: ${votes.no}</p>
    <a href="/">Back to home</a>
  `);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});