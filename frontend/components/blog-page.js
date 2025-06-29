import { servicioAuth } from '../services/auth-service.js';

const blogPageTemplate = document.createElement('template');
blogPageTemplate.innerHTML = `
    <link rel="stylesheet" href="blocks/layout-split/layout-split.css">
    <link rel="stylesheet" href="blocks/site-header/site-header.css">
    <link rel="stylesheet" href="blocks/blog-listing/blog-listing.css">
    <link rel="stylesheet" href="blocks/blog-post-summary/blog-post-summary.css">
    <link rel="stylesheet" href="blocks/favorite-button/favorite-button.css">

    <style>
        .layout-split__main {
            background-image: url('./assets/images/main-blog.png');
        }
        .layout-split__sidebar {
            padding: 60px 40px;
            overflow-y: auto;
        }
            .blog-listing__create-btn {
    display: inline-block;
    background-color: #EFE7D2;
    color: black;
    padding: 8px 16px;
    border-radius: 20px;
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: bold;
    margin-top: 15px;
}
    </style>

    <div class="layout-split">
        <main class="layout-split__main">
            <site-header></site-header>
            <h1 class="layout-split__title">BLOG</h1>
        </main>

        <aside class="layout-split__sidebar">
            <div class="blog-listing">
                <header class="blog-listing__header">
                    <h2 class="blog-listing__title">BEHIND THE SCENES<br>& LATEST NEWS</h2>
                <a href="#/blog/nuevo" class="blog-listing__create-btn" id="create-post-btn" data-link style="display: none;">CREATE POST</a>
                </header>
                <div class="blog-listing__filters">
                    <button class="blog-listing__filter blog-listing__filter--active">ALL NEWS</button>
                    <button class="blog-listing__filter" id="favorites-filter" style="display: none;">FAVORITES</button>
                    <button class="blog-listing__filter" id="my-articles-filter" style="display: none;">MY ARTICLES</button>
                </div>
                <div class="blog-listing__posts" id="posts-container"></div>
            </div>
        </aside>
    </div>
`;


class BlogPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(blogPageTemplate.content.cloneNode(true));
        
        this.postsContainer = this.shadowRoot.querySelector('#posts-container');
        this.favoritesFilter = this.shadowRoot.querySelector('#favorites-filter');
        this.myArticlesFilter = this.shadowRoot.querySelector('#my-articles-filter');
        this.createPostBtn = this.shadowRoot.querySelector('#create-post-btn');
    }

    connectedCallback() {
        this.actualizarVisibilidadFiltros();
        this.cargarArticulos();
    }

    actualizarVisibilidadFiltros() { // Renombramos a un nombre más general
        if (servicioAuth.estaLogueado()) {
            this.favoritesFilter.style.display = 'inline-block';
            this.myArticlesFilter.style.display = 'inline-block';
            this.createPostBtn.style.display = 'inline-block'; // Mostramos el botón
        } else {
            this.favoritesFilter.style.display = 'none';
            this.myArticlesFilter.style.display = 'none';
            this.createPostBtn.style.display = 'none'; // Ocultamos el botón
        }
    }

    async cargarArticulos() {
        const respuesta = await fetch('http://localhost:3000/api/blog');
        const articulos = await respuesta.json();
        this.renderizarArticulos(articulos);
    }

    renderizarArticulos(articulos) {
        this.postsContainer.innerHTML = '';
        articulos.forEach(post => {
            // El problema estaba aquí. Ahora llamamos a la función corregida.
            const postHTML = this.crearHtmlParaPost(post);
            this.postsContainer.innerHTML += postHTML;
        });
    }

    // SOLUCIÓN: Reemplazamos la lógica del marcador de posición con el renderizado real.
    crearHtmlParaPost(post) {
        const fecha = new Date(post.fecha_creacion);
        const opcionesFecha = { year: 'numeric', month: 'short', day: 'numeric' };
        const fechaFormateada = fecha.toLocaleDateString('en-US', opcionesFecha).toUpperCase().replace(',', "'");
        
        const resumen = post.contenido 
            ? `${post.contenido.substring(0, 100)}...` 
            : 'No hay resumen disponible.';
    
        const nombreAutor = post.usuarios ? post.usuarios.nombre : 'Autor Desconocido';
        
        // El enlace ahora apunta a /#/blog/ seguido del ID del post
        return `
            <a href="#/blog/${post.id}" class="blog-post-summary" data-link>
                <div class="blog-post-summary__image-wrapper">
                    <img src="${post.imagen_url}" alt="${post.titulo}" class="blog-post-summary__image">
                    <button class="favorite-button" aria-label="Añadir a favoritos">
                        <img src="./assets/icons/star.svg" class="favorite-button__icon">
                    </button>
                </div>
                <div class="blog-post-summary__content">
                    <p class="blog-post-summary__date">${fechaFormateada}</p>
                    <h3 class="blog-post-summary__title">${post.titulo}</h3>
                    <p class="blog-post-summary__excerpt">${resumen}</p>
                    <p class="blog-post-summary__author">${nombreAutor}</p>
                </div>
            </a>
        `;
    }
}

customElements.define('blog-page', BlogPage);
