import { FeedbackForm } from "./feedback-form";
import { Modal } from "./modal/Modal";
import { InputMask } from "imask";

const modalHtml = `
  <div class='modal__body feedback__body'>
    <div class='modal__body__title feedback__body__title'>
      <span>
        Оставьте свои контакты и наш менеджер свяжется с вами в ближайшее время
      </span>
    </div>
    <form class='modal__body__form feedback__body__form'>
      <input type='text' name='name' placeholder='Имя'>
      <input type='tel' name='phone' placeholder='Телефон'>
      <button type='submit' class='btn'>Оставить заявку</button>
      <input type='checkbox' name='agreement' id='agreement' checked='true'>
      <label for='agreement'>Согласие на обработку персональных данных</label>
    </form>
  </div>
`;

export class CartFeedback extends FeedbackForm {
  constructor() {
    super();
  }

  _createModal() {
    return new Modal({
      id: 'cart-feedback',
      html: modalHtml,
      openAnimationDuration: 300,
      closeAnimationDuration: 300,
      openCallback: (modal) => {
        const input = modal.querySelector('input[type=tel]');
        new InputMask(input, {
          mask: '+7 (000) 000-00-00',
        });

        this._setFormListener(modal);
        super._setCheckboxListener(modal);
      },
    });
  }

  _insertFinalBlock() {
    if (!this.modal.modal) {
      return;
    }
    const body = this.modal.modal.querySelector('.modal__body');
    body.innerHTML = `
      <div class='modal__body__title feedback__body__title'>
        <h3>
          Ваш заказ принят
        </h3>
      </div>
      <div class='modal__body__subtitle feedback__body__subtitle'>
        <span>
          Наш менеджер свяжется с вами в ближайшее время,<br>
          для более быстрого подтверждения заказа,<br>
          вы так же можете позвонить нам по телефону +7 (963) 466-12-26
        </span>
      </div>
      <div class='modal__body__button feedback__body__button'>
        <button class='btn' data-modal='cart-feedback' data-action='close'>
          Закрыть
        </button>
      </div>
    `;
    this.modal.setListeners();
  }
}