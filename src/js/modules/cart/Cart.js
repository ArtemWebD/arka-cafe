import { Observer } from "../observer/Observer";

/**
 * The config object takes the following properties:
 * @param id ID element of the cart
 * @param renderSubscribers array of callbacks caused by changing the basket
 */
export class Cart {
  static _orders = [];
  static _observer = new Observer();

  constructor(config) {
    this._config = config;
    this._init();
  }

  get total() {
    return Object.values(Cart._orders).reduce((acc, value) => {
      acc += value.count * value.price;
      return acc;
    }, 0);
  }

  get ordersId() {
    return Object.keys(Cart._orders);
  }

  _init() {
    this._getOrders();
    this._setUnloadListener();
    if (this._config.renderSubscribers) {
      this._config.renderSubscribers.forEach((subscriber) => {
        Cart._observer.subscribe(subscriber);
      });
    } 
  }

  add(order, id) {
    const existedOrder = Cart._orders[id];
    if (existedOrder) {
      existedOrder.count += 1;
    } else {
      Cart._orders[id] = order;
    }
    this._save();
    this._render();
  }

  clear() {
    Cart._orders = {};
    localStorage.removeItem('orders');
    this._render();
  }

  update(id, count) {
    const order = Cart._orders[id];
    if (count === 0) {
      delete Cart._orders[id];
    } else {
      order.count = count;
    }
    this._save();
    this._render();
  }

  remove(id) {
    delete Cart._orders[id];
    this._save();
    this._render();
  }

  getById(id) {
    return Cart._orders[id];
  }

  _setUnloadListener() {
    window.onunload = () => {
      this._save();
    }
  }

  _save() {
    localStorage.setItem('orders', JSON.stringify(Cart._orders));
  }

  _getOrders() {
    const orders = localStorage.getItem('orders');
    Cart._orders = orders === 'undefined' ? {} : JSON.parse(orders);
    this._render();
  }

  _render() {
    const element = document.getElementById(this._config.id);
    const ordersTotal = Object.values(Cart._orders).reduce((acc, value) => {
      acc.total += value.count * value.price;
      acc.count += value.count;
      return acc;
    }, { total: 0, count: 0 });

    if (!ordersTotal.count) {
      element.innerHTML = 'Корзина';
    } else {
      element.innerHTML = `
        <span id='products'>${ordersTotal.count} /&nbsp;</span>
        <span id='total'>${new Intl.NumberFormat('ru').format(ordersTotal.total)} ₽</span>
      `;
    }

    Cart._observer.observe(Cart._orders);
  }
}
