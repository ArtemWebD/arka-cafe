export class Cart {
  static total = 0;
  static products = 0

  constructor(config) {
    this.config = config;
    this._init();
  }

  _init() {
    this._setListeners();
  }

  _setListeners() {
    document.body.onclick = (event) => {
      const id = event.target.dataset.cart;

      if (id === this.config.id) {
        event.preventDefault();
        const price = +event.target.dataset.price;
        const counter = document.getElementById(event.target.dataset.count);
        this._add(price, counter ? +counter.innerText : 1);
      }
    }
  }

  _add(price, count) {
    Cart.total += price * count;
    Cart.products += count;
    this._render();
  }

  _render() {
    const element = document.getElementById(this.config.id);
    if (!element) {
      return;
    }
    if (!Cart.products) {
      element.innerHTML = '<span>Корзина</span>';
      return;
    }
    element.innerHTML = `
      <span id='products'>${Cart.products} /&nbsp;</span>
      <span id='total'>${Cart.total} ₽</span>
    `;
  }
}
