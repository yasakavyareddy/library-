// Constants
const apiUrl = "https://mybookstore.com/api/books";
const bookListElement = document.getElementById("book-list");
const searchInputElement = document.getElementById("search-input");
const searchSuggestionsElement = document.getElementById("search-suggestions");
const filterTitleElement = document.getElementById("filter-title");
const filterAuthorElement = document.getElementById("filter-author");
const filterSubjectElement = document.getElementById("filter-subject");
const filterPublishDateElement = document.getElementById("filter-publish-date");
const cartItemsElement = document.getElementById("cart-items");

// Fetch books from the API
function fetchBooks() {
    // Make API request to fetch books
    fetch(apiUrl)
        .then(response => response.json())
        .then(books => {
            // Clear the book list
            bookListElement.innerHTML = "";

            // Iterate over each book and create book elements
            books.forEach(book => {
                const bookElement = createBookElement(book);
                bookListElement.appendChild(bookElement);
            });
        });
}

// Create a single book element
function createBookElement(book) {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");

    const titleElement = document.createElement("div");
    titleElement.classList.add("book-title");
    titleElement.textContent = book.title;
    bookElement.appendChild(titleElement);

    const infoElement = document.createElement("div");
    infoElement.classList.add("book-info");
    infoElement.textContent = `Author: ${book.author}, Genre: ${book.genre}, Year: ${book.year}`;
    bookElement.appendChild(infoElement);

    const availabilityElement = document.createElement("div");
    availabilityElement.classList.add("book-availability");
    availabilityElement.textContent = `Availability: ${book.available} copies`;
    bookElement.appendChild(availabilityElement);

    // Add click event listener to add the book to the cart
    bookElement.addEventListener("click", () => {
        addToCart(book);
    });

    return bookElement;
}

// Add a book to the cart
function addToCart(book) {
    const cartItem = document.createElement("li");
    cartItem.textContent = book.title;
    cartItemsElement.appendChild(cartItem);

    // Update book availability
    book.available--;
    const availabilityElement = bookListElement.querySelector(`[data-id="${book.id}"] .book-availability`);
    availabilityElement.textContent = `Availability: ${book.available} copies`;
}

// Event listeners
document.addEventListener("DOMContentLoaded", fetchBooks);

searchInputElement.addEventListener("input", () => {
    const searchTerm = searchInputElement.value;
    if (searchTerm.length > 0) {
        // Make API request to fetch search suggestions
        fetch(`${apiUrl}/search?q=${searchTerm}`)
            .then(response => response.json())
            .then(suggestions => {
                searchSuggestionsElement.innerHTML = "";

                suggestions.forEach(suggestion => {
                    const suggestionItem = document.createElement("li");
                    suggestionItem.textContent = suggestion;
                    suggestionItem.addEventListener("click", () => {
                        searchInputElement.value = suggestion;
                        searchSuggestionsElement.innerHTML = "";
                        performSearch();
                    });
                    searchSuggestionsElement.appendChild(suggestionItem);
                });
            });
    } else {
        searchSuggestionsElement.innerHTML = "";
    }
});

filterTitleElement.addEventListener("input", performSearch);
filterAuthorElement.addEventListener("input", performSearch);
filterSubjectElement.addEventListener("input", performSearch);
filterPublishDateElement.addEventListener("input", performSearch);

// Perform search based on filters
function performSearch() {
    const filters = {
        title: filterTitleElement.value,
        author: filterAuthorElement.value,
        subject: filterSubjectElement.value,
        publishDate: filterPublishDateElement.value
    };

    // Make API request to fetch filtered books
    fetch(`${apiUrl}/search?filters=${JSON.stringify(filters)}`)
        .then(response => response.json())
        .then(books => {
            bookListElement.innerHTML = "";

            books.forEach(book => {
                const bookElement = createBookElement(book);
                bookListElement.appendChild(bookElement);
            });
        });
}
