import { Modal } from "./Modal";

// export class DishModal extends Modal {
//   constructor(element, modalClass, weight, description, closeSelectors = []) {
//     super(modalClass, closeSelectors);
//     this.element = element;
//     this.title = element.querySelector('h3').innerText;
//     this.weight = weight;
//     this.description = description;
//     this.price = element.querySelector('.dishes__item__price span').innerText;
//     this.image = element.querySelector('img').src;
//     this.imageAlt =  element.querySelector('img').alt;
//     this._scale = 0.5;
//   }

//   create() {
//     const html = this._build();

//     document.body.insertAdjacentHTML('beforeend', html);
//     super._lockBody();

//     this.modal = document.querySelector(`.modal.${this.modalClass}`);
//     const coords = this._getCoords();

//     this._setToggleStyles(coords.left, coords.top);
//     setTimeout(() => this._setEnterStyles());
//     document.body.insertAdjacentHTML('beforeend', '<div class="blur"></div>');
//     super._setScrollListener();
//     super.setListeners();
//   }

//   remove() {
//     if (!this.modal) {
//       return;
//     }
//     const blur = document.querySelector('.blur');
//     const coords = this._getCoords();
//     const modal = this.modal;

//     this._setToggleStyles(coords.left, coords.top);
//     const duration = +this.modal.style.transitionDuration.replace('s', '') * 1000;
//     blur.remove();

//     setTimeout(() => {
//       modal.remove();
//     }, duration);
//     this._unlockBody();
//     this.modal = null;
//   }

//   _setToggleStyles(x, y) {
//     const size = this._getSize();
//     this.modal.style.left = x + 'px';
//     this.modal.style.top = y + 'px';
//     this.modal.style.transform = `translate(0, 0) scale(${this._scale})`;
//     this.modal.style.transformOrigin = `left top`;
//     this.modal.style.opacity = '0';
//   }

//   _setEnterStyles() {
//     this.modal.style.left = '50%';
//     this.modal.style.top = '50%';
//     this.modal.style.transform = 'translate(-50%, -50%) scale(1)';
//     this.modal.style.opacity = '1';
//     this.modal.style.transition = '.3s ease-in';
//   }

//   _build() {
    // return `
    //   <div class='modal ${this.modalClass}'>
    //     <div class='modal__body ${this.modalClass}__body'>
    //       <div class='modal__body__image ${this.modalClass}__body__image'>
    //         <img src='${this.image}' alt='${this.imageAlt || ''}'>
    //       </div>
    //       <div class='modal__body__title ${this.modalClass}__body__title'>
    //         <h3>${this.title}</h3>
    //       </div>
    //       <div class='modal__body__weight ${this.modalClass}__body__weight'>
    //         <span>${this.weight}</span>
    //       </div>
    //       <div class='modal__body__description ${this.modalClass}__body__description'>
    //         <span>${this.description}</span>
    //       </div>
    //       <div class='modal__body__price ${this.modalClass}__body__price'>
    //         <span>${this.price}</span>
    //       </div>
    //       <div class='modal__body__button ${this.modalClass}__body__button'>
    //         <a href='#' class='basket-button'>Добавить в корзину</a>
    //       </div>
    //       <div class='modal__body__count ${this.modalClass}__body__count'>
    //         <span class='minus'></span>
    //         <span class='counter'>1</span>
    //         <span class='plus'></span>
    //       </div>
    //     </div>
    //     <span class='modal__close'></span>
    //   </div>
    // `;
//   }

  // _getCoords() {
  //   const box = this.element.getBoundingClientRect();
  //   return {
  //     top: box.y,
  //     left: box.x,
  //   }
  // }

//   _getSize() {
//     const box = this.element.getBoundingClientRect();
//     return { width: box.width, height: box.height }
//   }
// }

export class CardModal extends Modal {
  constructor(element, config) {
    super(config);
    this.element = element;
  }

  open() {
    if (!this.modal) {
      return;
    }

    this._setPosition();
    super.open();
  }

  close() {
    if (!this.modal) {
      return;
    }

    const blur = document.querySelector('.blur');

    if (blur) {
      blur.remove();
    }

    this.modal.classList.remove('modal-active');
    this.modal.classList.add('modal-close');
    super._unlockBody();

    setTimeout(() => {
      this.modal.classList.remove('modal-close');
      this.modal.innerHTML = this.modalHtml;
      this._removePosition();
    }, this.config.closeAnimationDuration + 50);
  }

  _setPosition() {
    const coords = this._getCoords();

    this.modal.classList.add('no-animation');

    this.modal.style.top = coords.top + 'px';
    this.modal.style.left = coords.left + 'px';
    this.modal.offsetHeight;

    this.modal.classList.remove('no-animation');
  }

  _removePosition() {
    this.modal.style.top = '';
    this.modal.style.left = '';
  }

  _getCoords() {
    const box = this.element.getBoundingClientRect();
    return {
      top: box.y,
      left: box.x,
    }
  }
}
