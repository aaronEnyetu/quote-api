document.addEventListener('DOMContentLoaded', () => {
    const quoteElement = document.getElementById('quote');
    const button = document.getElementById('generate-quote');
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
  