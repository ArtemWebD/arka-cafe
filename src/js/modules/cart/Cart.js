import { Observer } from "../observer/Observer";

/**
 * Объект конфиг принимает в себя следующие свойства:
 * @param id id элемента корзины
 * @param renderSubscribers массив коллбэков, вызываемых при изменении корзины
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

  get orders() {
    return Object.values(Cart._orders).filter((value) => value.count > 0);
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

  add(order) {
    const existedOrder = Cart._orders[order.id];
    if (existedOrder) {
      existedOrder.count += 1;
    } else {
      Cart._orders[order.id] = order;
      delete order.id;
    }
    Cart._observer.observe(Cart._orders);
    this._render();
  }

  clear() {
    Cart._orders = {};
    localStorage.removeItem('orders');
    Cart._observer.observe(Cart._orders);
    this._render();
  }

  update(id, count) {
    const order = Cart._orders[id];
    order.count = count;
    Cart._observer.observe(Cart._orders);
    this._render();
  }

  remove(id) {
    delete Cart._orders[id];
    Cart._observer.observe(Cart._orders);
    this._render();
  }

  getById(id) {
    return Cart._orders[id];
  }

  _setUnloadListener() {
    window.onunload = () => {
      localStorage.setItem('orders', JSON.stringify(Cart._orders));
    }
  }

  _getOrders() {
    const orders = localStorage.getItem('orders');
    Cart._orders = orders === 'undefined' ? {} : JSON.parse(orders) ;
    Cart._observer.observe(Cart._orders);
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
      return;
    }

    element.innerHTML = `
      <span id='products'>${ordersTotal.count} /&nbsp;</span>
      <span id='total'>${new Intl.NumberFormat('ru').format(ordersTotal.total)} ₽</span>
    `;
  }
}
