import { CART_ID } from "./constants";
import { Cart } from "./modules/cart/Cart";
import { CartPageProduct } from "./modules/product/CartPageProduct";

export class CartPage {
  constructor() {
    this.element = document.querySelector('.cart-block');
    this.cart = new Cart({ 
      id: CART_ID,
      renderSubscribers: [
        () => this._update(),
      ],
    });
  }

  init() {
    this._setClearListener();
    this._render();
  }

  _setClearListener() {
    if (!this.element) {
      return;
    }
    const button = this.element.querySelector('.cart-block__clear-all .btn');
    button.onclick = (event) => {
      event.preventDefault();
      this.cart.clear();
      this._render();
    }
  }

  _update() {
    if (!this.element) {
      return;
    }
    const total = this.element.querySelector('.cart-block__total .total-counter');
    total.innerText = new Intl.NumberFormat('ru-RU').format(this.cart.total) + ' ₽';
  }

  _render() {
    if (!this.element) {
      return;
    }
    const body = this.element.querySelector('.cart-block__orders');
    const ordersId = this.cart.ordersId;
    
    body.innerHTML = '';

    ordersId.forEach((id) => {
      const order = this.cart.getById(id);
      const html = this._getHtml(order, id);
      body.insertAdjacentHTML('beforeend', html);

      const element = body.querySelector(`.order[data-id="${id}"]`);
      new CartPageProduct(element);
    });
  }

  _getHtml(order, id) {
    return `
      <div class="order" data-id='${id}'>
        <div class="order__body">
          <div class="order__body__image rounded">
            <img src="${order.image}" alt="${order.title}" class='image'>
          </div>
          <div class="order__body__title">
            <h3 class='title'>
              ${order.title}
            </h3>
          </div>
          <div class="order__body__counter counter-block">
            <span class="minus" data-action='minus'></span>
            <span class="counter">${order.count}</span>
            <span class="plus" data-action='plus'></span>
          </div>
          <div class="order__body__price">
            <span class='price'>
              ${new Intl.NumberFormat('ru-RU').format(order.price * order.count)} ₽
            </span>
          </div>
          <div class="order__body__button">
            <button class="btn clear-button"></button>
          </div>
        </div>
      </div>
    `;
  }
}