// Array to hold quotes
let quotes = [];

// Server URL for simulated API
const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts'; // This is a placeholder URL for simulation

// Function to load quotes from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    // Default quotes
    quotes = [
      { id: 1, text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
      { id: 2, text: "Life is what happens when you're busy making other plans.", category: "Life" },
      { id: 3, text: "Don't watch the clock; do what it does. Keep going.", category: "Time" }
    ];
  }
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to get unique categories
function getUniqueCategories() {
  const categories = quotes.map(quote => quote.category);
  return [...new Set(categories)];
}

// Function to populate categories
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  getUniqueCategories().forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore last selected category
  const lastSelectedCategory = localStorage.getItem('selectedCategory');
  if (lastSelectedCategory) {
    categoryFilter.value = lastSelectedCategory;
  }
}

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const filteredQuotes = filterQuotesArray();
  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${randomQuote.text}</p><p><em>- ${randomQuote.category}</em></p>`;
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
  } else {
    quoteDisplay.innerHTML = '<p>No quotes available for this category.</p>';
  }
}

// Function to filter quotes array
function filterQuotesArray() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  if (selectedCategory === 'all') {
    return quotes;
  } else {
    return quotes.filter(quote => quote.category === selectedCategory);
  }
}

// Function to filter quotes
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('selectedCategory', selectedCategory);
  showRandomQuote();
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { id: quotes.length + 1, text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes();
    syncWithServer(newQuote);
    alert("Quote added successfully!");

    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    populateCategories();
    showRandomQuote();
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// Function to export quotes
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

// Function to import quotes
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

// Function to sync with server
async function syncWithServer(newQuote) {
  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newQuote)
    });
    if (response.ok) {
      const data = await response.json();
      console.log('Quote synced with server:', data);
      showNotification('Quote synced with server!');
    }
  } catch (error) {
    console.error('Error syncing with server:', error);
    showNotification('Error syncing with server. Please try again later.');
  }
}

// Function to fetch quotes from server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    if (response.ok) {
      const serverQuotes = await response.json();
      mergeQuotes(serverQuotes);
      showNotification('Quotes synced with server!');
    }
  } catch (error) {
    console.error('Error fetching quotes from server:', error);
    showNotification('Error fetching quotes from server. Please try again later.');
  }
}

// Function to merge server quotes with local quotes
function mergeQuotes(serverQuotes) {
  serverQuotes.forEach(serverQuote => {
    const existingQuote = quotes.find(localQuote => localQuote.id === serverQuote.id);
    if (!existingQuote) {
      quotes.push(serverQuote);
    }
  });
  saveQuotes();
  populateCategories();
  showRandomQuote();
}

// Function to periodically check for new quotes from the server
function syncQuotes() {
  setInterval(fetchQuotesFromServer, 5000); // Fetch updates from server every 5 seconds
}

// Function to show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Initial setup function
function init() {
  loadQuotes();
  populateCategories();
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('exportQuotes').addEventListener('click', exportQuotes);

  const lastViewedQuote = sessionStorage.getItem('lastViewedQuote');
  if (lastViewedQuote) {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const quote = JSON.parse(lastViewedQuote);
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>- ${quote.category}</em></p>`;
  } else {
    showRandomQuote();
  }

  syncQuotes();
}

// Call the initial setup function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', init);
