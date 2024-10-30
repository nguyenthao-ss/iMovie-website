import { db } from "/firebase-config.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";
import { params } from "/router.js";

// Function to extract query parameters from the URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Fetch movie data based on the movie ID
async function getMovieDetails(movieId) {
  const movieDoc = doc(db, "movies", movieId);
  const movieSnap = await getDoc(movieDoc);

  if (movieSnap.exists()) {
    return { id: movieSnap.id, ...movieSnap.data() };
  } else {
    console.log("No such document!");
    return null;
  }
}

// Function to render movie details on the page
async function renderMovieDetails() {
  // const movieId = getQueryParam("movieId");
  const movieId = params.id;

  if (movieId) {
    const movie = await getMovieDetails(movieId);
    console.log("Movie", movie);
    if (movie) {
      const banner = document.querySelector(".movie-banner");
      // Update the page with movie details
      // document.getElementById("movie-poster").src = movie.poster;
      banner.style.background = `url("${movie.bg}")`;
      banner.style.backgroundSize = "cover";
      banner.style.backgroundPosition = "center";
      
      document.getElementById("movie-title").textContent = movie.title;
      document.getElementById("movie-year").textContent = movie.year;
      document.getElementById("movie-rating").textContent = movie.rating;
      document.getElementById("movie-duration").textContent = movie.duration;
      document.getElementById("movie-genre").textContent = movie.genre;
      document.getElementById("movie-description").textContent =
        movie.description;
    } else {
      console.log("Movie details not found");
    }
  } else {
    console.log("No movie ID provided");
  }
}

// Call the function when the page loads
window.onload = renderMovieDetails;
export { renderMovieDetails };
