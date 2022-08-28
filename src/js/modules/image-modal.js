import { CardModal } from './modal/CardModal';

export class ImageModals {
  constructor(selectors, id = 'image-modal') {
    this._selectors = selectors;
    this._id = id;
  }

  init() {
    this._initModals();
  }

  _initModals() {
    const elements = this._getElements();

    elements.forEach((element) => {
      const image = element.querySelector('img');
      const slideNumber = element.querySelector('.slide__number');
      const html = `
        <div class='modal__body ${this._id}__body'>
          ${
            slideNumber 
              ? `
                  <div class='modal__number'>
                    <span>
                      ${slideNumber?.innerText}
                    </span>
                  </div>
                `
              : ''
          }
          <img class='lightbox' src='${image?.src}' alt='${image?.alt}'>
        </div>
      `;
      
      new CardModal(element, {
        id: this._id,
        body: element,
        html,
        openAnimationDuration: 300,
        closeAnimationDuration: 300,
        overlayScroll: true,
      });
    });
  }

  _getElements() {
    return this._selectors.reduce((acc, value) => {
      const elements = Array.from(document.querySelectorAll(value));
      acc.push(...elements);
      return acc;
    }, []);
  }
}
