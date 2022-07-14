export class ScrollButton {
  constructor(config) {
    this._triggerElement = document.querySelector(config.triggerElement);
    this._button = document.querySelector(config.button);
    this._init();
  }

  _init() {
    this._setObserver();
    this._setButtonListener();
  }

  _setObserver() {
    const options = {
      threshold: [+this._triggerElement.dataset?.visible || 1, 1],
    };
    const observer = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        this._button.classList.add('scroll-visible');
        observer.unobserve(this._triggerElement);
      }
    }, options);
    observer.observe(this._triggerElement);
  }

  _setButtonListener() {
    this._button.onclick = (event) => {
      event.preventDefault();
      if (this._button.classList.contains('scroll-visible')) {
        document.body.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  }
}