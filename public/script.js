document.addEventListener('DOMContentLoaded', () => {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');
    const button = document.getElementById('generate-quote');
    const saveButton = document.getElementById('save-favorite');
    const viewFavoritesButton = document.getElementById('view-favorites');
    const favoritesList = document.getElementById('favorites-list');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-select');
  
    if (!quoteElement || !authorElement || !button || !saveButton || !viewFavoritesButton || !favoritesList || !searchButton || !searchInput || !categorySelect) {
      console.error('One or more required elements are missing in the HTML.');
      return;
    }
  
    button.addEventListener('click', async () => {
      const query = searchInput.value;
      const category = categorySelect.value;
      try {
        const response = await fetch(`http://localhost:3000/api/quote?search=${query}&category=${category}`);
        const data = await response.json();
        if (data.text) {
          quoteElement.textContent = data.text;
          authorElement.textContent = data.author || '';
        } else {
          quoteElement.textContent = 'No quotes found.';
          authorElement.textContent = '';
        }
      } catch (error) {
        console.error('Error fetching quote:', error);
        quoteElement.textContent = 'Sorry, something went wrong!';
        authorElement.textContent = '';
      }
    });
  
    saveButton.addEventListener('click', async () => {
      const quote = quoteElement.textContent;
      if (quote && quote !== 'Click the button to get a quote!' && quote !== 'Sorry, something went wrong!') {
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
      const category = categorySelect.value;
      try {
        const response = await fetch(`http://localhost:3000/api/quote?search=${query}&category=${category}`);
        const data = await response.json();
        if (data.text) {
          quoteElement.textContent = data.text;
          authorElement.textContent = data.author || '';
        } else {
          quoteElement.textContent = 'No quotes found.';
          authorElement.textContent = '';
        }
      } catch (error) {
        console.error('Error fetching quotes:', error);
        quoteElement.textContent = 'Sorry, something went wrong!';
        authorElement.textContent = '';
      }
    });
  });
  