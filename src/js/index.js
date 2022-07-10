import "../styles/global.scss";
import { DeliveryPage } from "./delivery";
import { FeedbackForm } from "./modules/feedback-form";
import { ImageModals } from "./modules/image-modal";
import { initSliders } from "./modules/initSliders";

initSliders();

const deliveryPage = new DeliveryPage();
const feedbackForm = new FeedbackForm();
const imageModals = new ImageModals(['.banquet-menu__slide'])

deliveryPage.init();
feedbackForm.init();
imageModals.init();
