/**
 * Class is responsible for burger menu. It takes object config.
 * Config:
 * @param burgerSelector: selector for burger element
 * @param menuSelector: selector for mobile menu
 */
export class Burger {
  constructor(config) {
    this._burger = document.querySelector(config.burgerSelector);
    this._menu = document.querySelector(config.menuSelector);
    this._init();
  }

  _init() {
    this._setBurgerListener();
  }

  _setBurgerListener() {
    if (!this._burger) {
      throw new Error('Burger element was not found');
    }
    this._burger.onclick = (event) => {
      event.preventDefault();
      this._burger.classList.toggle('burger_active');
      this._menu.classList.toggle('mobile-nav_active');
      this._toggleOverlay();
      this._lockBody();
    }
  }

  _toggleOverlay() {
    if (this._burger.classList.contains('burger_active')) {
      return document.body.insertAdjacentHTML('beforeend', '<div class="mobile-overlay"></div>');
    }
    const overlay = document.querySelector('.mobile-overlay');
    overlay.remove();
  }

  _lockBody() {
    document.body.style.overflow = this._burger.classList.contains('burger_active')
      ? 'hidden' : 'auto';
  }
}