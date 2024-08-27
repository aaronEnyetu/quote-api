document.addEventListener('DOMContentLoaded', () => {
    const quoteElement = document.getElementById('quote');
    const button = document.getElementById('generate-quote');
  
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
  });
  