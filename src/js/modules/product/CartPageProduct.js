import { Product } from "./Product";

export class CartPageProduct extends Product {
  constructor(element) {
    super(element);
    this._order = this._getOrder();
  }

  _init() {
    this._initCounter();
    this._setRemoveTrigger();
  }

  _getOrder() {
    const order = this._cart.getById(this._id);
    const price = +this._element.querySelector('.price')
      .textContent
      .replace('₽', '')
      .replaceAll(' ', '');
    return {
      title: this._element.querySelector('.title').innerHTML,
      image: this._element.querySelector('.image').src,
      price: price / order.count,
      count: 1,
    }
  }

  _update(orders) {
    const order = orders[this._id];
    if (!order) {
      return;
    }
    const price = this._element.querySelector('.price');
    if (price) {
      price.innerText = new Intl.NumberFormat('ru-RU').format(order.price * order.count) + ' ₽';
    }
  }

  _initCounter() {
    const order = this._cart.getById(this._id);
    new Counter({
      element: this._element.querySelector('.counter-block'),
      min: 1,
      count: order.count,
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

  _setRemoveTrigger() {
    const button = this._element.querySelector('.clear-button');
    if (!button) {
      return;
    }
    button.onclick = (event) => {
      event.preventDefault();
      this._cart.remove(this._id);
      this._element.remove();
    }
  }
}