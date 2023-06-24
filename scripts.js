function showLoadingAnimation() {
    document.getElementById('loading-animation').style.display = 'flex';
  }
  
  // Hide the loading animation
  function hideLoadingAnimation() {
    document.getElementById('loading-animation').style.display = 'none';
  }
  
  const bookListElement = document.getElementById('book-list');

// Fetch books from the API
fetch('https://api.example.com/books')
  .then(response => response.json())
  .then(data => {
    // Render books on the page
    data.forEach(book => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('book');
      bookElement.innerHTML = `
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Genre: ${book.genre}</p>
        <p>Year of Publishing: ${book.year}</p>
        <p>Availability: ${book.available ? 'Available' : 'Not Available'}</p>
        <p>Number of Copies: ${book.copies}</p>
      `;
      bookListElement.appendChild(bookElement);
    });
  })
  .catch(error => {
    console.log('Error fetching books:', error);
  });