export class Cart {
  static orders = [];

  constructor(config) {
    this._config = config;
    this._init();
  }

  get total() {
    return Cart.orders.reduce((acc, value) => {
      acc += value.count * value.price;
      return acc;
    }, 0);
  }

  get orders() {
    return Cart.orders.filter((value) => value.count > 0);
  }

  add(order) {
    const existedOrder = Cart.orders.find((value) => value.id === order.id);
    if (existedOrder) {
      existedOrder.count += order.count;
    } else {
      Cart.orders.push(order);
    }
    this._render();
  }

  clear() {
    Cart.orders = [];
    localStorage.removeItem('orders');
    this._render();
  }

  update(id, count) {
    const order = Cart.orders.find((value) => value.id === id);
    if (!order) {
      return;
    }
    order.count = count;
    this._render();
  }

  remove(id) {
    Cart.orders = Cart.orders.filter((value) => value.id !== id);
    this._render();
  }

  getById(id) {
    return Cart.orders.find((value) => value.id === id);
  }

  renderOrderCount(order) {
    const elements = document.querySelectorAll(`div[data-id="${order.id}"] .dish-count`);
    elements.forEach((element) => {
      if (element.classList.contains('cart-counter')) {
        element.innerText = order.count;
      } else {
        element.innerText = order.count > 0 ? '+ ' + order.count : '';
      }
    });
  }

  _init() {
    this._getOrders();
    this._setUnloadListener();
  }

  _setUnloadListener() {
    window.onunload = () => {
      if (Cart.orders && Cart.orders.length) {
        localStorage.setItem('orders', JSON.stringify(Cart.orders));
      }
    }
  }

  _getOrders() {
    const orders = JSON.parse(localStorage.getItem('orders'));
    Cart.orders = orders || [];
    this._render();
  }

  _render() {
    const element = document.getElementById(this._config.id);
    if (!Cart.orders || !Cart.orders.length) {
      element.innerHTML = 'Корзина';
      return;
    }
    const ordersTotal = Cart.orders.reduce((acc, value) => {
      acc.total += value.count * value.price;
      acc.count += value.count;
      return acc;
    }, { total: 0, count: 0 });
    element.innerHTML = `
      <span id='products'>${ordersTotal.count} /&nbsp;</span>
      <span id='total'>${new Intl.NumberFormat('ru').format(ordersTotal.total)} ₽</span>
    `;
    Cart.orders.forEach((order) => this.renderOrderCount(order));
  }
}
