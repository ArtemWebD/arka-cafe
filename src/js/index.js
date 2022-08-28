import "../styles/global.scss";
import { CartPage } from "./cart-page";
import { MOBILE_BREAKPOINT } from "./constants";
import { DeliveryPage } from "./delivery-page";
import { Burger } from "./modules/burger/Burger";
import { CartFeedback } from "./modules/cart-feedback";
import { Category } from "./modules/category/Category";
import { FeedbackForm } from "./modules/feedback-form";
import { ImageModals } from "./modules/image-modal";
import { initSliders } from "./modules/initSliders";
import { Lightbox } from "./modules/lightbox/Lightbox";
import { ScrollButton } from "./modules/scroll-top/ScrollButton";

window.onload = () => {
  initSliders();

  const deliveryPage = new DeliveryPage();
  const imageModals = new ImageModals(['.banquet-menu__slide']);
  const galleryModals = new ImageModals(['.gallery-images__body__item', '.slide__image'], 'gallery-modal');
  const cartPage = new CartPage();

  new FeedbackForm();
  new CartFeedback();
  new Category();
  new ScrollButton({
    triggerElement: '#trigger-scroll',
    button: '.scroll-button',
  });
  new Burger({
    burgerSelector: '.burger',
    menuSelector: '.mobile-nav',
  });

  if (window.innerWidth <= MOBILE_BREAKPOINT) {
    new Lightbox();
  }

  deliveryPage.init();
  imageModals.init();
  galleryModals.init();
  cartPage.init();
}
