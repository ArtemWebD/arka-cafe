import "../styles/global.scss";
import { DeliveryPage } from "./delivery";
import { FeedbackForm } from "./modules/feedback-form";

const deliveryPage = new DeliveryPage();
const feedbackForm = new FeedbackForm();

deliveryPage.init();
feedbackForm.init();
