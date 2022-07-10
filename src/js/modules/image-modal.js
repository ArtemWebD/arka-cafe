import { CardModal } from './modal/CardModal';

export class ImageModals {
  constructor(selectors) {
    this._selectors = selectors;
  }

  init() {
    this._initModals();
  }

  _initModals() {
    const elements = this._getElements();
    elements.forEach((element) => {
      const image = element.querySelector('img');
      const html = `
        <div class='modal__body image-modal__body'>
          <img src='${image?.src}' alt='${image?.alt}'>
        </div>
      `;
      new CardModal(element, {
        id: 'image-modal',
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
