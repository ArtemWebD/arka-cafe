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
      <input type='checkbox' name='agreement' id='agreement'>
      <label for='agreement'>Согласие на обработку персональных данных</label>
    </form>
  </div>
`;

export class FeedbackForm {
  constructor() {
    this.modal = new Modal({
      id: 'feedback',
      html: modalHtml,
      openAnimationDuration: 300,
      closeAnimationDuration: 300,
      openCallback: (modal) => {
        const input = modal.querySelector('input[type=tel]');
        new InputMask(input, {
          mask: '+7 (000) 000 00 00',
        });

        this._setFormListener(modal);
      },
    });
  }

  init() {
    
  }

  _setFormListener(modal) {
    const form = modal.querySelector('form');
    form.onsubmit = (event) => {
      event.preventDefault();
      const data = Object.values(form).reduce((acc, field) => {
        acc[field.name] = field.type === 'checkbox' ? field.checked : field.value;
        return acc;
      }, {});

      if (!this._validate(data)) {
        return;
      }

      this._insertFinalBlock();
    };
  }

  _validate(data) {
    return data.name && 
      data.agreement && 
      data.phone.length === 18;
  }

  _insertFinalBlock() {
    if (!this.modal.modal) {
      return;
    }
    const body = this.modal.modal.querySelector('.modal__body');
    body.innerHTML = `
      <div class='modal__body__title feedback__body__title'>
        <h3>
          Ваша заявка успешно оставлена
        </h3>
      </div>
      <div class='modal__body__subtitle feedback__body__subtitle'>
        <span>
          Для более быстрого подтверждения заявки, <br>
          вы так же можете позвонить нам по телефону +7 (963) 466-12-26
        </span>
      </div>
      <div class='modal__body__button feedback__body__button'>
        <button class='btn' data-modal='feedback' data-action='close'>
          Закрыть
        </button>
      </div>
    `;
    this.modal.setListeners();
  }
}
