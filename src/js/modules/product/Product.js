import { CART_ID } from "../../constants";
import { Cart } from "../cart/Cart";

export class Product {
  constructor(element) {
    this._element = element;
    this._id = this._element.dataset?.id
    this._cart = new Cart({
      id: CART_ID,
      renderSubscribers: [
        (orders) => this._update(orders),
      ],
    });
    this._order = {
      title: this._element.querySelector('.title').innerHTML,
      image: this._element.querySelector('.image').src,
      price: +this._element.querySelector('.price')
        .textContent
        .replace('₽', '')
        .replaceAll(' ', ''),
      count: 1,
    }

    this._init();
  }

  _init() {
    this._setCartTrigger();
  }

  _update(orders) {
    const order = orders[this._id];
    const counter = this._element.querySelector('.dish-count');
    if (!counter) {
      return;
    }
    if (!order) {
      counter.innerText = '';
      return;
    }
    counter.innerText = `+ ${order.count}`;
  }

  _setCartTrigger() {
    const button = this._element.querySelector('.basket-button');
    if (!button) {
      return;
    }
    button.onclick = (event) => {
      event.preventDefault();
      this._cart.add(this._order, this._id);
    }
  }
}