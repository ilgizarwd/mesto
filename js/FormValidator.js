export default class FormFalidator {
  constructor(config) {
    this._config = config;
    this._formSelector = config.formSelector;
    // console.log(config.formSelector);
  }

  enableValidation = () => {
    this._formList = Array.from(document.querySelectorAll(this._formSelector));

    this._formList.forEach((formElement) => {
      this._setEventListeners(formElement, this._config);
    });
  };
  _setEventListeners = (formElement, config) => {
    this._formElement = formElement;
    this._config = config;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    // console.log(this._config.submitButtonSelector);
    this._inputListbuttonElement = formElement.querySelector(
      this._config.submitButtonSelector
    );

    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState(
      this._inputList,
      this._config.submitButtonSelector,
      this._config
    );

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, config);
        // чтобы проверять его при изменении любого из полей
        toggleButtonState(
          this._inputList,
          this._config.submitButtonSelector,
          this._config
        );
      });
    });
  };

  _toggleButtonState = (inputList, buttonElement, config) => {
    this._inputList = inputList;
    this._config.submitButtonSelector =
      this._formElement.querySelector(buttonElement);
    // console.log(this._inputList);
    // Если есть хотя бы один невалидный инпут
    // console.log(inputList);
    if (this._hasInvalidInput(this._inputList)) {
      // сделай кнопку неактивной
      this._config.submitButtonSelector.classList.add(
        this._config.inactiveButtonClass
      );
      this._config.submitButtonSelector.setAttribute("disabled", "disabled");
    } else {
      // иначе сделай кнопку активной
      this._config.submitButtonSelector.classList.remove(
        this._config.inactiveButtonClass
      );
      this._config.submitButtonSelector.removeAttribute("disabled");
    }
  };

  _hasInvalidInput = (inputList) => {
    this._inputList = inputList;
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
}
