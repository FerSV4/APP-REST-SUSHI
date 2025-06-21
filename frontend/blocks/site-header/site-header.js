
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
                color: white;
                text-decoration: none;
                font-family: 'Times New Roman', serif;
                font-weight: bold;
                font-size: 1.5rem;
            }

            .hamburger {
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
                transition: color 0.2s ease;
            }
            nav a:hover {
                color: white;
            }

            .nav-link--highlight {
                background-color: #181818;
                color: white;
                padding: 6px 12px;
                border-radius: 8px;
            }


            .action-link {
                background-color: black;
                border-radius: 12px;
                width: 40px;
                height: 40px;
                display: inline-flex;
                justify-content: center;
                align-items: center;
            }

            .action-link img {
                height: 18px;
            }
    </style>
    
    <div class="left-panel">
        <button class="hamburger">≡</button>
        <a href="/frontend" class="logo">QITCHEN</a>
        <nav>
    <a href="#/" data-link>MENU</a>
    <a href="#/about" data-link>ABOUT</a>
    <a href="#/contact" data-link class="nav-link--highlight">BOOK A TABLE</a>
</nav>
    </div>
    <div class="right-panel">
        <a href="#" class="action-link"><img src="assets/icons/user.svg" alt="Login"></a>
        <a href="#" class="action-link"><img src="assets/icons/cart.svg" alt="Shopping Cart"></a>
    </div>
`;

class SiteHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('site-header', SiteHeader);