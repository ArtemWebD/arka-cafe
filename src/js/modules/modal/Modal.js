/**
 * Class takes a config object as a property
 * The config contains the following settings:
 * id: html id of modal,
 * openAnimationDuration: the duration of the animation of the appearance of the modal window,
 * closeAnimationDuration: modal hide animation duration,
 * overlayScroll: if true, then scrolling the document will cause a scroll inside the modal,
 * openCallback: callback called after the modal is created,
 * html: a string to put as html before the window is created
 */
export class Modal {
  constructor(config) {
    this.config = config;
    this.modal = null;
    this.modalHtml = '';
    this._init();
  }

  _init() {
    this._listenTriggers();
  }

  open() {
    if (!this.modal) {
      return;
    }

    this._lockBody();

    this.modalHtml = this.modal.innerHTML;
    this.modal.innerHTML += this.config.html;
    this.modal.classList.add('modal-enter');
    document.body.insertAdjacentHTML('beforeend', `<div class="blur" data-modal='${this.config.id}' data-action='close'></div>`);
    
    setTimeout(() => {
      this.modal.classList.remove('modal-enter');
      this.modal.classList.add('modal-active');
    }, this.config.openAnimationDuration + 50);

    if (this.config.overlayScroll) {
      this._setOverlayScroll();
    }

    if (this.config.openCallback) {
      this.config.openCallback(this.modal);
    }
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
    this._unlockBody();

    setTimeout(() => {
      this.modal.classList.remove('modal-close');
      this.modal.innerHTML = this.modalHtml;
    }, this.config.closeAnimationDuration + 50);
  }

  _listenTriggers() {
    const body = this.config.body || document;
    body.addEventListener('click', (event) => {
      const id = event.target.dataset?.modal;
      const action = event.target.dataset?.action;

      if (id === this.config.id && action === 'open') {
        event.preventDefault();
        this.modal = document.getElementById(id);
        this.open();
      }
    });

    document.addEventListener('click', (event) => {
      const id = event.target.dataset?.modal;
      const action = event.target.dataset?.action;

      if (id === this.config.id && action === 'close') {
        event.preventDefault();
        this.close();
      }
    });
  }

  _setOverlayScroll() {
    const blur = document.querySelector('.blur');
    if (!blur) {
      return;
    }
    const body = this.modal.querySelector('.modal__body');
    blur.addEventListener('mousewheel', (event) => {
      event.preventDefault();
      body.scrollTop += event.deltaY;
    });
  }

  _lockBody() {
    document.body.style.paddingRight = window.innerWidth - document.body.offsetWidth + 'px';
    document.body.style.overflow = 'hidden';
  }

  _unlockBody() {
    document.body.style.paddingRight = '0';
    document.body.style.overflow = '';
  }
}