import "../styles/global.scss";
import { CartPage } from "./cart-page";
import { DeliveryPage } from "./delivery";
import { CartFeedback } from "./modules/cart-feedback";
import { FeedbackForm } from "./modules/feedback-form";
import { ImageModals } from "./modules/image-modal";
import { initSliders } from "./modules/initSliders";

window.onload = () => {
  initSliders();

  const deliveryPage = new DeliveryPage();
  const imageModals = new ImageModals(['.banquet-menu__slide']);
  const galleryModals = new ImageModals(['.gallery-images__body__item'], 'gallery-modal');
  const cartPage = new CartPage();

  new FeedbackForm();
  new CartFeedback();

  deliveryPage.init();
  imageModals.init();
  galleryModals.init();
  cartPage.init();
}
