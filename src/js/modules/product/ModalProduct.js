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

  _update() {}

  _initCounter() {
    const order = this._cart.getById(this._id);
    new Counter({
      element: this._element.querySelector('#counter'),
      min: 0,
      count: order ? order.count : 0,
      actionCallback: (count) => {
        const order = this._cart.getById(this._id);
        if (!order || order.count < count) {
          this._cart.add(this._order, this._id);
        } else {
          this._cart.update(this._id, count);
        }
      },
    });
  }
}