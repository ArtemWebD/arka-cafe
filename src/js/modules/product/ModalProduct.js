import { Counter } from "../counter/Counter";
import { Product } from "./Product";

export class ModalProduct extends Product {
  constructor(element) {
    super(element);
    this._order = {
      title: this._element.querySelector('h3').innerHTML,
      image: this._element.querySelector('img').src,
      price: +this._element.querySelector('.dishes-modal__body__price')
        .textContent
        .replace('₽', '')
        .replaceAll(' ', ''),
      count: 1,
    }
  }

  _init() {
    super._setCartTrigger();
    this._initCounter();
  }

  _initCounter() {
    const order = this._cart.getById(this._id);
    new Counter({
      element: this._element.getElementById('counter'),
      min: 0,
      count: order ? order.count : 0,
      actionCallback: (count) => this._cart.update(this._id, count),
    });
  }
}