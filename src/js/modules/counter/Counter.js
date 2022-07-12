export class Counter {
  constructor(config) {
    this.config = config;
    this.element = document.getElementById(this.config.id);
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
    this.element.onclick = (event) => {
      const action = event.target.dataset?.action;

      if (action === 'plus') {
        event.preventDefault();
        this._add();
      }

      if (action === 'minus') {
        event.preventDefault();
        this._subtract();
      }
    }
  }

  _add() {
    this.count += 1;
    this._render();
    if (this.config.actionCallback) {
      this.config.actionCallback(this.count);
    }
  }

  _subtract() {
    if (this.count == this.config.min) {
      return;
    }
    this.count -= 1;
    this._render();
    if (this.config.actionCallback) {
      this.config.actionCallback(this.count);
    }
  }

  _render() {
    const counter = this.element.querySelector('.counter');
    if (counter) {
      counter.innerText = this.count;
    }
  }
}
