const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const path = require('path');

app.use(cors());
app.use(express.json());

const quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Inspiration", author: "Alan Kay" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life", author: "John Lennon" },
  { text: "Get your facts first, then you can distort them as you please.", category: "Wisdom", author: "Mark Twain" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation", author: "Franklin D. Roosevelt" },
  { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Personal Growth", author: "Ralph Waldo Emerson" }
];

app.get('/api/quote', (req, res) => {
  const { search, category } = req.query;
  if (!search && !category) {
    // Provide a random quote if no search or category is provided
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json(quotes[randomIndex]);
  } else {
    // Filter quotes based on search and category
    const lowerSearch = search ? search.toLowerCase() : '';
    const filteredQuotes = quotes.filter(q =>
      (!lowerSearch || q.text.toLowerCase().includes(lowerSearch)) &&
      (!category || q.category === category)
    );
    if (filteredQuotes.length > 0) {
      res.json(filteredQuotes[0]); // Return the first matched quote
    } else {
      res.json({ text: 'No quotes found.' });
    }
  }
});

app.post('/api/favorites', (req, res) => {
  const { quote } = req.body;
  if (quote && !favorites.includes(quote)) {
    favorites.push(quote);
  }
  res.json({ favorites });
});

app.get('/api/favorites', (req, res) => {
  res.json({ favorites });
});

const favorites = [];

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


app.use(express.static(path.join(__dirname, 'public')));