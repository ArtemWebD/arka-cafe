import { Modal } from "./Modal";

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
    // this.modal.offsetHeight;

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
