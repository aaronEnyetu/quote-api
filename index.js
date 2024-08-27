const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const path = require('path');

app.use(cors());
app.use(express.json());

const quotes = [
  "The best way to predict the future is to invent it.",
  "Life is what happens when you're busy making other plans.",
  "Get your facts first, then you can distort them as you please.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment."
];

app.get('/api/quote', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json({ quote: quotes[randomIndex] });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.static(path.join(__dirname, 'public')));

//This will allow users to search for quotes containing a specific keyword.
app.get('/api/quotes', (req, res) => {
    const search = req.query.search ? req.query.search.toLowerCase() : '';
    const filteredQuotes = quotes.filter(q => q.toLowerCase().includes(search));
    res.json({ quotes: filteredQuotes });
  });
  