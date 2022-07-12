import { Cart } from "./modules/cart/Cart";
import { Counter } from "./modules/counter/Counter";

export class CartPage {
  constructor() {
    this.element = document.querySelector('.cart-block');
    this.cart = new Cart({ id: 'cart' });
  }

  init() {
    this._setClearListener();
    this._render();
  }

  _setClearListener() {
    const button = this.element.querySelector('.cart-block__clear-all .btn');
    button.onclick = (event) => {
      event.preventDefault();
      this.cart.clear();
      this._render();
    }
  }

  _render() {
    const body = this.element.querySelector('.cart-block__orders');
    const total = this.element.querySelector('.cart-block__total .total-counter');
    total.innerText = new Intl.NumberFormat('ru-RU').format(this.cart.total) + ' ₽';
    body.innerHTML = '';
    Cart.orders.forEach((order) => {
      const html = `
        <div class="order" data-id='${order.id}'>
          <div class="order__body">
            <div class="order__body__image rounded">
              <img src="${order.image}" alt="${order.title}">
            </div>
            <div class="order__body__title">
              <h3>
                ${order.title}
              </h3>
            </div>
            <div class="order__body__counter counter-block" id='counter-${order.id}'>
              <span class="minus" data-action='minus'></span>
              <span class="counter">${order.count}</span>
              <span class="plus" data-action='plus'></span>
            </div>
            <div class="order__body__price">
              <span>
                ${new Intl.NumberFormat('ru-RU').format(order.price * order.count)} ₽
              </span>
            </div>
            <div class="order__body__button">
              <button class="btn clear-button"></button>
            </div>
          </div>
        </div>
      `;
      body.insertAdjacentHTML('beforeend', html);
      new Counter({
        id: `counter-${order.id}`,
        count: order.count,
        min: 1,
        actionCallback: (count) => this._updateCount(order.id, count),
      });
    });
    this._setRemoveListeners();
  }

  _updateCount(id, count) {
    this.cart.update(id, count);
    this._render();
  }

  _setRemoveListeners() {
    const cards = this.element.querySelectorAll('.order');
    cards.forEach((card) => {
      const button = card.querySelector('.clear-button');
      const id = card.dataset?.id;

      button.onclick = (event) => {
        event.preventDefault();
        this.cart.remove(+id);
        this._render();
      }
    });
  }
}