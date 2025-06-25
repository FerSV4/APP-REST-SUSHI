import { servicioAuth } from '../../services/auth-service.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host { 
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            font-family: 'Montserrat', sans-serif; 
        }
        .left-panel {
            display: flex;
            align-items: center;
            gap: 20px;
            background-color: black;
            padding: 10px 25px;
            border-radius: 50px;
        }
        .right-panel {
            display: flex;
            margin-right: 5%;
            align-items: center;
            gap: 15px;
        }
        .logo {
            margin-top: 5px;
        }
        .hamburger-button { /* Renombrado para consistencia */
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        }
        nav {
            display: flex;
            align-items: center;
            gap: 20px;
        }
        nav a {
            color: #a0a0a0;
            text-decoration: none;
            font-size: 0.8rem;
        }
        nav a:hover {
            color: white;
        }
        .nav-link--highlight {
            background-color: #333;
            color: white !important;
            padding: 6px 12px;
            border-radius: 8px;
            font-weight: bold;
        }
        .action-link {
            background-color: black;
            border-radius: 8px;
            width: 40px;
            height: 40px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
        }
        .action-link img {
            height: 18px;
        }
        /* Estilo para el nuevo botón de registro */
        .registration-button {
            background-color: black;
            border: 1px solidrgb(26, 26, 26);
            color:rgb(246, 246, 246);
            padding: 12px 20px;
            border-radius: 8px;
            text-decoration: none;
            font-size: 0.8rem;
            font-weight: normal;
        }
        .registration-button:hover {
            background-color:rgb(194, 191, 184);
            color: black;
        }
        /* Contenedores para acciones de usuario y invitado */
        .user-actions, .guest-actions {
            display: flex;
            align-items: center;
            gap: 15px; /* Mismo gap que el right-panel */
        }
    </style>
    
    <div class="left-panel">
        <button class="hamburger-button">≡</button>
        <a href="#/" class="logo" data-link><img src="assets/icons/Qitchen.svg"></a>
        <nav>
            <a href="#/menu" data-link>MENU</a>
            <a href="#/about" data-link>ABOUT</a>
            <a href="#/booktable" data-link class="nav-link--highlight">BOOK A TABLE</a>
        </nav>
    </div>
    <div class="right-panel">
        <div class="user-actions">
            <a href="#/account" class="action-link" data-link><img src="assets/icons/user.svg"></a>
            <a href="#/cart" class="action-link" data-link><img src="assets/icons/cart.svg"></a>
        </div>
        <div class="guest-actions">
            <a href="#/register" class="registration-button" data-link>REGISTRATION</a>
            <a href="#/cart" class="action-link" data-link><img src="assets/icons/cart.svg"></a>
        </div>
    </div>
`;


class SiteHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.userActions = this.shadowRoot.querySelector('.user-actions');
        this.guestActions = this.shadowRoot.querySelector('.guest-actions');
        this.hamburgerButton = this.shadowRoot.querySelector('.hamburger-button');
    }

    connectedCallback() {

        servicioAuth.suscribir(this);
        this.update(servicioAuth);

        this.hamburgerButton.addEventListener('click', () => {
            const openMenuEvent = new CustomEvent('openMenu', {
                bubbles: true,
                composed: true
            });
            this.dispatchEvent(openMenuEvent);
        });
    }

    disconnectedCallback() {
        servicioAuth.desuscribir(this);
    }

    update(servicio) {
        if (servicio.estaLogueado()) {
            this.userActions.style.display = 'flex';
            this.guestActions.style.display = 'none';
        } else {
            this.userActions.style.display = 'none';
            this.guestActions.style.display = 'flex';
        }
    }
}

customElements.define('site-header', SiteHeader);