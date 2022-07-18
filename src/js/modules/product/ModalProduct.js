import { Cart } from "../cart/Cart";
import { Counter } from "../counter/Counter";
import { Product } from "./Product";

export class ModalProduct extends Product {
  constructor(element) {
    super(element);
  }

  _init() {
    super._setCartTrigger();
    this._initCounter();
  }

  _update(orders) {
    const order = orders[this._id];
    const counter = this._element.querySelector('#counter .counter');
    counter.innerText = order ? order.count : 0;
  }

  _initCounter() {
    const order = this._cart.getById(this._id);
    const counter = this._element.querySelector('#counter');
    const counterText = counter.querySelector('.counter');
    const plusButton = counter.querySelector('.plus');
    const minusButton = counter.querySelector('.minus');

    counterText.innerText = order ? order.count : 0;

    plusButton.onclick = () => this._cart.add(this._order, this._id);
    minusButton.onclick = () => {
      if (order && order.count > 0) {
        this._cart.update(this._id, order.count - 1);
      }
    }
  }
}