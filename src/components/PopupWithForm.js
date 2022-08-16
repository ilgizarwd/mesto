import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, formSubmit) {
    super(selector);
    this._selector = selector;
    this._formSubmit = formSubmit;
    this._form = this._selector.querySelector(".form");
    this._formData = this._selector.querySelectorAll(".form__input");
    this.setEventListeners();
  }

  close() {
    super.close();
    // this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._selector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
    });
  }

  _getInputValues() {
    this._inputValues = {};
    this._formData.forEach((item) => {
      this._inputValues[item.name] = item.value;
    });
    return this._inputValues;
  }
}
