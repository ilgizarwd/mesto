export default class FormFalidator {
  constructor(config) {
    this.config = config;
    this._formSelector = config.formSelector;
    // console.log(config.formSelector);
  }

  enableValidation = () => {
    this._formList = Array.from(document.querySelectorAll(this._formSelector));
    this._formList.forEach((formElement) => {
      this._setEventListeners(formElement, this.config);
    });
  };

  _setEventListeners = (formElement, config) => {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement, config);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, config);
        // чтобы проверять его при изменении любого из полей
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  };
}
