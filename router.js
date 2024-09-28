import { auth, subscriptions } from "./firebase-config.js";
import { renderHomePage } from "./modules/home/home.js";

const routes = {
  "/": {
    body: "./modules/home/home.html",
    requireAuth: false,
    script: async () => {
      // Fetch movies and initialize carousel after page loads
      await renderHomePage(); // This handles the carousel and movie initialization
    },
  },
  "/login": {
    body: "./modules/auth/login.html",
    requireAuth: false,
  },
  "/register": {
    body: "./modules/auth/register.html",
    requireAuth: false,
  },
  "/movie/:id/detail": {
    body: "./modules/movies/movie-details.html",
    requireAuth: true,
  },
  "/movie/:id/player": {
    body: "./modules/movies/movie-player.html",
    requireAuth: true,
  },
};

const isMatchRoute = (route, pathname) => {
  const parsed = route.replace(/\/:[^\/]+/gm, "/[^\\/]+");

  const regex = new RegExp(`^${parsed}\\/?$`, "gm");
  const isMatching = regex.test(pathname);

  let params = {};

  if (isMatching) {
    const routeMatches = route.match(/\/[^\\\/]+/gm) || [];
    const pathnameMatches = pathname.match(/\/[^\\\/]+/gm) || [];

    for (const [index, routeMatch] of routeMatches.entries()) {
      if (routeMatch.startsWith("/:")) {
        params[routeMatch.slice(2)] = pathnameMatches[index].slice(1);
      }
    }
  }

  return { isMatching, params };
};

export let params = {};

const renderRoute = () => {
  let hasMatched = false;
  for (const route in routes) {
    const { isMatching, params: loadedParams } = isMatchRoute(
      route,
      location.hash ? location.hash.slice(1) : "/"
    );

    if (isMatching) {
      hasMatched = true;
      params = loadedParams;
      if (
        routes[route].requireAuth &&
        (!auth.currentUser || !auth.currentUser.emailVerified)
      ) {
        location.hash = "/login";
        break;
      }
      if (
        !routes[route].requireAuth &&
        auth.currentUser &&
        auth.currentUser.emailVerified
      ) {
        location.hash = "/";
        break;
      }
      fetch(routes[route].body)
        .then((res) => res.text())
        .then((html) => {
          // document.body.innerHTML = "";
          document.getElementById("app").innerHTML = html;

          if (routes[route].script) {
            routes[route].script();
          }
        });
      break;
    }
  }
  if (!hasMatched) document.body.innerHTML = `404`;
  subscriptions.forEach(
    (subscription) => typeof subscription === "function" && subscription()
  );
};

export { renderRoute };
