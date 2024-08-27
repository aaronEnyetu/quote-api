document.addEventListener('DOMContentLoaded', () => {
    const quoteElement = document.getElementById('quote');
    const button = document.getElementById('generate-quote');
    const saveButton = document.getElementById('save-favorite');
    const viewFavoritesButton = document.getElementById('view-favorites');
    const favoritesList = document.getElementById('favorites-list');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
  
    button.addEventListener('click', async () => {
      try {
        const response = await fetch('http://localhost:3000/api/quote');
        const data = await response.json();
        quoteElement.textContent = data.quote;
      } catch (error) {
        console.error('Error fetching quote:', error);
        quoteElement.textContent = 'Sorry, something went wrong!';
      }
    });
  
    saveButton.addEventListener('click', async () => {
      const quote = quoteElement.textContent;
      if (quote !== 'Click the button to get a quote!' && quote !== 'Sorry, something went wrong!') {
        try {
          await fetch('http://localhost:3000/api/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quote }),
          });
          alert('Quote saved to favorites!');
        } catch (error) {
          console.error('Error saving quote:', error);
        }
      } else {
        alert('No quote to save!');
      }
    });
  
    viewFavoritesButton.addEventListener('click', async () => {
      try {
        const response = await fetch('http://localhost:3000/api/favorites');
        const data = await response.json();
        favoritesList.innerHTML = data.favorites.map(fav => `<p>${fav}</p>`).join('');
      } catch (error) {
        console.error('Error fetching favorites:', error);
        favoritesList.innerHTML = 'Sorry, something went wrong!';
      }
    });
  
    searchButton.addEventListener('click', async () => {
      const query = searchInput.value;
      try {
        const response = await fetch(`http://localhost:3000/api/quotes?search=${query}`);
        const data = await response.json();
        if (data.quotes.length > 0) {
          quoteElement.textContent = data.quotes[0];
        } else {
          quoteElement.textContent = 'No quotes found.';
        }
      } catch (error) {
        console.error('Error fetching quotes:', error);
        quoteElement.textContent = 'Sorry, something went wrong!';
      }
    });
  });
  