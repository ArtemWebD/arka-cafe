/**
 * Lightbox for the mobile version
 */
export class Lightbox {
  constructor () {
    this._init();
  }

  _init() {
    this._setListener();
  }

  _setListener() {
    document.body.onclick = (event) => {
      const target = event.target;
      
      if (target.classList.contains('lightbox')) {
        event.preventDefault();
        target.classList.toggle('lightbox_active');
      }
    }
  }
}