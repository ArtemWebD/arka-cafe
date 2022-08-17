export class Category {
  constructor() {
    this._init();
  }

  _init() {
    document.fonts.onloadingdone = () => {
      if (location.pathname !== '/delivery.html' && location.pathname !== '/cart.html') {
        return;
      }
      this._getCategory();
      this._setLinkTrigger();
    }
  }

  _getCategory() {
    const search = location.search
      .replace('?', '')
      .split('&');
    const category = search.find((value) => value.split('=')[0] === 'category');
    if (!category) {
      return;
    }
    this._changeTitle(category.split('=')[1]);
  }

  _setLinkTrigger() {
    document.body.onclick = (event) => {
      const category = event.target.dataset?.category;
      if (category) {
        event.preventDefault();
        this._changeTitle(category);
        this._changeUrl(category);
      }
    }
  }

  _setPopstateListener() {
    window.onpopstate = () => this._getCategory();
  }

  _changeTitle(category) {
    const categoryName = decodeURI(decodeURI(category));
    const title = document.getElementById('category');
    title.innerText = categoryName;
    
  }

  _changeUrl(category) {
    const url = new URL(location.href);
    url.searchParams.set('category', encodeURI(category));
    history.replaceState({ category }, 'Document', url.href);
  }
}