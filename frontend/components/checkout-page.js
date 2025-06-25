const checkoutPageTemplate = document.createElement('template');
checkoutPageTemplate.innerHTML = `
    <link rel="stylesheet" href="blocks/layout-split/layout-split.css">
    <link rel="stylesheet" href="blocks/site-header/site-header.css">
    <link rel="stylesheet" href="blocks/checkout-form/checkout-form.css">

    <style>
        .layout-split__main {
            background-image: url('./assets/images/main-reservation.png');
        }
        .layout-split__sidebar {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px;
        }
    </style>

    <div class="layout-split">
        <main class="layout-split__main">
            <site-header></site-header>
            <h1 class="layout-split__title">CHECKOUT</h1>
        </main>

        <aside class="layout-split__sidebar">
            <div class="checkout-container">
                <section class="order-summary">
                    <div class="order-summary__total">
                        <span>Total</span>
                        <span id="summary-total-price">$0.00</span>
                    </div>
                </section>
                
                <form class="checkout-form">
                    <label for="name" class="checkout-form__label">Full Name</label>
                    <input type="text" id="name" name="name" class="checkout-form__input" required>
                    
                    <label for="phone" class="checkout-form__label">Phone Number</label>
                    <input type="tel" id="phone" name="phone" class="checkout-form__input" required>

                    <label for="address" class="checkout-form__label">Address</label>
                    <input type="text" id="address" name="address" class="checkout-form__input" required>

                    <label for="city" class="checkout-form__label">City</label>
                    <input type="text" id="city" name="city" class="checkout-form__input" required>

                    <button type="submit" class="checkout-form__submit-btn">PLACE ORDER</button>
                </form>
            </div>
        </aside>
    </div>
`;

class CheckoutPage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(checkoutPageTemplate.content.cloneNode(true));
    }
}

customElements.define('checkout-page', CheckoutPage);