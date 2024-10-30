import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";
import { auth } from "./firebase-config.js";
import { renderRoute } from "./router.js";

onAuthStateChanged(auth, () => {
  renderRoute();
});

window.addEventListener("popstate", () => {
  renderRoute();
});


window.addEventListener("hashchange", () => {
  renderRoute();
});
