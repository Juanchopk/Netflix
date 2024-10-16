const API_KEY = 'dfbf7dad98738ff4f0d91f263290fd1f';
const movieId = localStorage.getItem('movieId');
const API_MOVIE_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const movieDetailsContainer = document.getElementById('movie-details');

// Fetch and display movie details
async function loadMovieDetails() {
    const response = await fetch(API_MOVIE_URL);
    const movie = await response.json();
    displayMovieDetails(movie);
}

// Display movie details
function displayMovieDetails(movie) {
    movieDetailsContainer.innerHTML = `
        <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
        <div class="info">
            <h1>${movie.title}</h1>
            <p>${movie.overview}</p>
            <p><strong>Director:</strong> ${movie.director}</p>
            <p><strong>Genre:</strong> ${movie.genres.map(g => g.name).join(', ')}</p>
            <p><strong>Duration:</strong> ${movie.runtime} minutes</p>
        </div>
        <div class="trailer">
            <iframe src="https://www.youtube.com/embed/${movie.videos.results[0]?.key}" allowfullscreen></iframe>
        </div>
    `;
}

// Initial load
loadMovieDetails();
