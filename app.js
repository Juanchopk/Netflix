const API_KEY = 'dfbf7dad98738ff4f0d91f263290fd1f';
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=`;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
let currentPage = 1;
let isLoading = false;
const moviesContainer = document.getElementById('movies-container');
const modal = document.getElementById('movie-modal');
const modalContent = document.getElementById('movie-details');
const closeModal = document.querySelector('.close-btn');

// Fetch and display movies
async function loadMovies(page) {
    if (isLoading) return;
    isLoading = true;
    const response = await fetch(API_URL + page);
    const data = await response.json();
    displayMovies(data.results);
    isLoading = false;
}

// Display movies in the grid
function displayMovies(movies) {
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie-item');
        movieDiv.innerHTML = `
            <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
            <p>${movie.title}</p>
        `;
        movieDiv.addEventListener('click', () => showMovieDetails(movie.id));
        moviesContainer.appendChild(movieDiv);
    });
}

// Fetch and display movie details in modal
async function showMovieDetails(movieId) {
    const movieURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`;
    const response = await fetch(movieURL);
    const movie = await response.json();

    const trailer = movie.videos.results.length ? `https://www.youtube.com/embed/${movie.videos.results[0].key}` : '';

    modalContent.innerHTML = `
        <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
        <div class="info">
            <h1>${movie.title}</h1>
            <p>${movie.overview}</p>
            <p><strong>Director:</strong> ${movie.production_companies[0]?.name || 'N/A'}</p>
            <p><strong>Genre:</strong> ${movie.genres.map(g => g.name).join(', ')}</p>
            <p><strong>Duration:</strong> ${movie.runtime} minutes</p>
        </div>
        ${trailer ? `<div class="trailer"><iframe src="${trailer}" allowfullscreen></iframe></div>` : ''}
    `;
    
    modal.style.display = 'flex';
}

// Close the modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Infinite scroll
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
        currentPage++;
        loadMovies(currentPage);
    }
});

// Initial load
loadMovies(currentPage);
