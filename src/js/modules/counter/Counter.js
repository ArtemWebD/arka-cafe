export class Counter {
  constructor(config) {
    this.config = config;
    this.count = this.config.count || 1;
    this._init();
  }

  get getCount() {
    return this.count;
  }

  _init() {
    this._setListeners();
  }

  _setListeners() {
    document.onclick = (event) => {
      const id = event.target.dataset?.counter;
      const action = event.target.dataset?.action;

      if (id === this.config.id && action === 'plus') {
        event.preventDefault();
        this._add();
      }

      if (id === this.config.id && action === 'minus') {
        event.preventDefault();
        this._subtract();
      }
    }
  }

  _add() {
    this.count += 1;
    this._render();
  }

  _subtract() {
    if (this.count == this.config.min) {
      return;
    }
    this.count -= 1;
    this._render();
  }

  _render() {
    const element = document.getElementById(this.config.id);
    if (element) {
      element.innerText = this.count;
    }
  }
}
