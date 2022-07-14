export class Category {
  constructor() {
    this._init();
  }

  _init() {
    if (location.pathname !== '/delivery.html' && location.pathname !== '/cart.html') {
      return;
    }
    const search = location.search
      .replace('?', '')
      .split('&');
    const category = search.find((value) => value.split('=')[0] === 'category');
    if (!category) {
      return;
    }
    const categoryName = decodeURIComponent(category.split('=')[1]);
    const title = document.getElementById('category');
    title.innerText = categoryName;
  }
}