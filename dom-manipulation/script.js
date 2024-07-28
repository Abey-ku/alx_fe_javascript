// Array to hold quotes
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Don't watch the clock; do what it does. Keep going.", category: "Time" }
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>- ${randomQuote.category}</em></p>`;
  }
  
  // Function to create the form to add a new quote
  function createAddQuoteForm() {
    const formContainer = document.createElement('div');
    
    const newQuoteTextInput = document.createElement('input');
    newQuoteTextInput.id = 'newQuoteText';
    newQuoteTextInput.type = 'text';
    newQuoteTextInput.placeholder = 'Enter a new quote';
    formContainer.appendChild(newQuoteTextInput);
    
    const newQuoteCategoryInput = document.createElement('input');
    newQuoteCategoryInput.id = 'newQuoteCategory';
    newQuoteCategoryInput.type = 'text';
    newQuoteCategoryInput.placeholder = 'Enter quote category';
    formContainer.appendChild(newQuoteCategoryInput);
    
    const addQuoteButton = document.createElement('button');
    addQuoteButton.textContent = 'Add Quote';
    addQuoteButton.addEventListener('click', addQuote);
    formContainer.appendChild(addQuoteButton);
    
    document.body.appendChild(formContainer);
  }
  
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
  
      // Update the DOM by showing the new quote
      showRandomQuote();
    } else {
      alert("Please enter both a quote and a category.");
    }
  }
  
  // Initial setup function
  function init() {
    // Create the form to add a new quote
    createAddQuoteForm();
  
    // Add event listener for the "Show New Quote" button
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
    // Initial call to display a random quote when the page loads
    showRandomQuote();
  }
  
  // Call the initial setup function when the DOM content is loaded
  document.addEventListener('DOMContentLoaded', init);
  