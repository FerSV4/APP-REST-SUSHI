const navigateTo = path => {
    window.location.hash = path;
};

const router = async () => {

    const routes = [

        { path: "/", view: "/frontend/pages/frontpage.html" },
        { path: "/contact", view: "/frontend/pages/contact.html" },
    ];

    const path = location.hash.slice(1).toLowerCase() || "/";

    let match = routes.find(route => route.path === path);

    if (!match) {

        match = routes[0];
        window.location.hash = ""; 
    }

    const app = document.querySelector("#app-root");
    if (!app) {
        console.error("El elemento #app-root no fue encontrado.");
        return;
    }

    try {
        const response = await fetch(match.view);
        if (!response.ok) throw new Error(`404 - No se encontró ${match.view}`);
        
        const html = await response.text();
        app.innerHTML = html;
    } catch (error) {
        console.error("Error al enrutar:", error);
        app.innerHTML = `<h1 style="color:white;text-align:center;">Error al cargar la vista.</h1>`;
    }
};


window.addEventListener("hashchange", router);

window.addEventListener("load", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        const targetLink = e.target.closest("[data-link]");
        if (targetLink) {
            e.preventDefault();
            const path = targetLink.getAttribute("href");
            navigateTo(path);
        }
    });
});