import { Cart } from "./modules/cart/Cart";
import { CardModal } from "./modules/modal/CardModal";
import { ModalProduct } from "./modules/product/ModalProduct";
import { Product } from "./modules/product/Product";

export class DeliveryPage {
  constructor() {
    this.items = document.querySelectorAll('.dishes__item');
    this.cart = new Cart({ id: 'cart' });
  }

  init() {
    this._setModal();
    this.items.forEach((item) => {
      new Product(item);
    });
  }

  _setModal() {
    this.items.forEach((item) => {
      const modalHtml = this._getHtml(item);

      new CardModal(item, {
        id: 'dishes-modal',
        html: modalHtml,
        openAnimationDuration: 300,
        closeAnimationDuration: 300,
        body: item,
        overlayScroll: true,
        openCallback: (modal) => new ModalProduct(modal.querySelector('.modal__body')),
      });
    });
  }

  _getHtml(item) {
    const image = item.querySelector('.dishes__item__image img');
    const title = item.querySelector('.dishes__item__title h3');
    const price = item.querySelector('.dishes__item__price span');
    const order = this.cart.getById(+item.dataset?.id);
    return `
      <div class='modal__body dishes-modal__body' data-id='${item.dataset?.id}'>
        <div class='modal__body__image dishes-modal__body__image rounded'>
          <img src='${image.src}' alt='${image.alt || ''}'>
        </div>
        <div class='modal__body__title dishes-modal__body__title'>
          <h3>${title.innerText}</h3>
        </div>
        <div class='modal__body__weight dishes-modal__body__weight'>
          <span>250 г</span>
        </div>
        <div class='modal__body__description dishes-modal__body__description'>
          <span>Песочная основа с творожным муссом, покрытым карамельным соусом с белым шоколадом и кельтской солью.</span>
        </div>
        <div class='modal__body__price dishes-modal__body__price'>
          <span>${price.innerText}</span>
        </div>
        <div class='modal__body__button dishes-modal__body__button'>
          <a href='#' class='basket-button'>
            Добавить в корзину
          </a>
        </div>
        <div class='modal__body__count dishes-modal__body__count counter-block' id='counter'>
          <span class='minus' data-action='minus'></span>
          <span class='counter dish-count cart-counter'>${order?.count || 0}</span>
          <span class='plus' data-action='plus'></span>
        </div>
      </div>
  `;
  }
}
