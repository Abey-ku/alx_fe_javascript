// Array to hold quotes
let quotes = [
    { text: "Never expect anything from anyone.", category: "Life" },
    { text: "Time waits for no man.", category: "Time" }
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>- ${randomQuote.category}</em></p>`;
  }
  
  // Event listener for the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Function to add a new quote
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      alert("Quote added successfully!");
      
      // Clear the input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
    } else {
      alert("Please enter both a quote and a category.");
    }
  }
  
  // Initial call to display a random quote when the page loads
  showRandomQuote();
  