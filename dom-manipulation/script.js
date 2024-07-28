// Array to hold quotes
let quotes = [];

// Function to load quotes from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    // Default quotes
    quotes = [
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
      { text: "Life is what happens when you're busy making other plans.", category: "Life" },
      { text: "Don't watch the clock; do what it does. Keep going.", category: "Time" }
    ];
  }
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to extract unique categories from the quotes array
function getUniqueCategories() {
  const categories = quotes.map(quote => quote.category);
  return [...new Set(categories)];
}

// Function to populate category filter options
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  getUniqueCategories().forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore the last selected category filter
  const lastSelectedCategory = localStorage.getItem('selectedCategory');
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
  }
}

// Function to display a random quote from the filtered quotes
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const filteredQuotes = filterQuotesArray();
  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>- ${randomQuote.category}</em></p>`;
    // Save the last viewed quote to session storage
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
  } else {
    quoteDisplay.innerHTML = '<p>No quotes available for this category.</p>';
  }
}

// Helper function to get filtered quotes array based on the selected category
function filterQuotesArray() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  if (selectedCategory === 'all') {
    return quotes;
  } else {
    return quotes.filter(quote => quote.category === selectedCategory);
  }
}

// Function to filter quotes based on the selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('selectedCategory', selectedCategory);
  showRandomQuote();
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
    saveQuotes();
    alert("Quote added successfully!");

    // Clear the input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    // Update category filter options
    populateCategories();

    // Update the DOM by showing the new quote
    showRandomQuote();
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// Function to export quotes to a JSON file
function exportQuotes() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
    populateCategories();
    showRandomQuote();
  };
  fileReader.readAsText(event.target.files[0]);
}

// Initial setup function
function init() {
  // Load quotes from local storage
  loadQuotes();

  // Populate category filter options
  populateCategories();

  // Create the form to add a new quote
  createAddQuoteForm();

  // Add event listener for the "Show New Quote" button
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);

  // Add event listener for the "Export Quotes" button
  document.getElementById('exportQuotes').addEventListener('click', exportQuotes);

  // Display the last viewed quote from session storage if available
  const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
  if (lastViewedQuote) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const quote = JSON.parse(lastViewedQuote);
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>- ${quote.category}</em></p>`;
  } else {
    // Initial call to display a random quote when the page loads
    showRandomQuote();
  }
}

// Call the initial setup function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', init);
