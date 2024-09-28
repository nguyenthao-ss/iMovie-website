import { db } from "/firebase-config.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";

const initializeCarousel = (movies) => {
  const carousel = document.getElementById("movie-carousel");
  // carousel.innerHTML = ""; // Clear any existing content

  // // Add movies to the carousel dynamically
  // movies.forEach((movie) => {
  //   const carouselItem = document.createElement("a");
  //   carouselItem.classList.add("carousel-item");
  //   carouselItem.innerHTML = `<img src="${movie.poster}" alt="${movie.title}" />`;

  //   // Add click event to change the banner when clicked
  //   carouselItem.addEventListener("click", () => changeBg(movie));

  //   carousel.appendChild(carouselItem);
  // });

  // Initialize the carousel
  setTimeout(() => {
    $(".carousel").carousel();
  }, 100);
};

function changeBg(movie) {
  const banner = document.querySelector(".banner");
  const content = document.querySelector(".content");

  // Update the banner background and content
  banner.style.background = `url("${movie.bg}")`;
  banner.style.backgroundSize = "cover";
  banner.style.backgroundPosition = "center";

  // Update movie details
  document.getElementById("movie-title-img").src = movie.titleImage;
  document.getElementById("movie-year").textContent = movie.year;
  document.getElementById("movie-rating").textContent = movie.rating;
  document.getElementById("movie-duration").textContent = movie.duration;
  document.getElementById("movie-genre").textContent = movie.genre;
  document.getElementById("movie-description").textContent = movie.description;

  content.classList.add("active");
}

// Fetch movies from Firebase and render the page
async function renderHomePage() {
  const movies = await getFirebaseMovies(); // Assuming this returns an array of movies
  if (movies.length > 0) {
    initializeCarousel(movies);
  }
  // Set the first movie as the default banner content
  if (movies.length > 0) {
    changeBg(movies[0]);
  }
}

async function getFirebaseMovies() {
  const moviesCol = collection(db, "movies");
  const movieSnapshot = await getDocs(moviesCol);
  const movieList = movieSnapshot.docs.map((doc) => doc.data());
  return movieList;
}

// Call this function once the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", renderHomePage);

// Export the function if needed in other modules
export { renderHomePage };
