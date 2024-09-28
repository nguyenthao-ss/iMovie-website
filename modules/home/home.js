import { db } from "/firebase-config.js";
import {
  addDoc,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-firestore.js";

const initializeCarousel = (movies) => {
  const carousel = document.getElementById("movie-carousel");
  carousel.innerHTML = ""; // Clear any existing content

  // Add movies to the carousel dynamically
  movies.forEach((movie) => {
    const carouselItem = document.createElement("a");
    carouselItem.classList.add("carousel-item");
    carouselItem.innerHTML = `<img src="${movie.poster}" alt="${movie.title}" />`;

    // Add click event to change the banner when clicked
    carouselItem.addEventListener("click", () => changeBg(movie));

    carousel.appendChild(carouselItem);
  });

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
// function changeBg(bg, title) {
//   const banner = document.querySelector(".banner");
//   const contents = document.querySelectorAll(".content");
//   banner.style.background = `url("/assets/images/movies/${bg}")`;
//   banner.style.backgroundSize = "cover";
//   banner.style.backgroundPosition = "center";

//   contents.forEach((content) => {
//     content.classList.remove("active");
//     if (content.classList.contains(title)) {
//       content.classList.add("active");
//     }
//   });
// }

// Attach the function to the global window object
// window.changeBg = changeBg;

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

async function addMovie() {
  const movies = [
    {
      title: "The Tank",
      poster: "/assets/images/movies/the-tank.jpeg",
      bg: "/assets/images/movies/bg-the-tank.jpeg",
      titleImage: "/assets/images/the-tank-title.png",
      year: "2023",
      rating: "15+",
      duration: "2h 50min",
      genre: "Horror",
      description:
        "A family uncovers a mysterious tank with terrifying consequences.",
    },
    {
      title: "65",
      poster: "/assets/images/movies/65.jpg",
      bg: "/assets/images/movies/bg-65.jpeg",
      titleImage: "/assets/images/65-title.png",
      year: "2023",
      rating: "15+",
      duration: "2h 50min",
      genre: "Sci-Fi",
      description:
        "An astronaut crash-lands on a mysterious planet and discovers prehistoric creatures.",
    },
    {
      title: "The Black Demon",
      poster: "/assets/images/movies/the-black-demon.jpeg",
      bg: "/assets/images/movies/bg-the-black-demon.jpeg",
      titleImage: "/assets/images/the-black-demon-title.png",
      year: "2023",
      rating: "15+",
      duration: "2h 50min",
      genre: "Thriller",
      description:
        "A family faces off against a legendary black shark while on a trip to Mexico.",
    },
    {
      title: "The Covenant",
      poster: "/assets/images/movies/the-covenant.jpg",
      bg: "/assets/images/movies/bg-the-covenant.jpeg",
      titleImage: "/assets/images/the-covenant-title.png",
      year: "2023",
      rating: "15+",
      duration: "2h 50min",
      genre: "Action",
      description:
        "A soldier forms a bond with an interpreter during a dangerous mission in Afghanistan.",
    },
  ];

  movies.forEach(async (movie) => {
    await addDoc(collection(db, "movies"), movie);
  });
}

// // Export the function if needed in other modules
export { renderHomePage };
