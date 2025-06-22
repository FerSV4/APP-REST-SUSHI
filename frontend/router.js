import './components/front-page.js';
import './components/contact-page.js';



const router = async () => {
    const routes = [
        { path: "/", view: () => document.createElement('front-page') },
        { path: "/contact", view: () => document.createElement('contact-page') },
    ];

    const path = location.hash.slice(1).toLowerCase() || "/";
    let match = routes.find(route => route.path === path);

    if (!match) {
        match = routes[0];
        window.location.hash = "";
    }

    const app = document.querySelector("#app-root");
    if (!app) return;
    app.innerHTML = ""; 
    app.appendChild(match.view()); 
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
