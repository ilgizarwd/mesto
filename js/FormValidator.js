export default class FormValidator {
  constructor(config, formElement) {
    this.config = config;
    this._formSelector = config.formSelector;
    this._formElement = document.querySelector(formElement);
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClass = config.errorClass;
  }

  enableValidation = () => {
    this._setEventListeners();
  };

  _setEventListeners = () => {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState(inputList, buttonElement, this.config);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this._formElement, inputElement, this._config);
        this._toggleButtonState(inputList, buttonElement, this._config);
      });
    });
  };

  _toggleButtonState = (inputList, buttonElement, config) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", "disabled");
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
      // console.log(formElement);
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        config
      );
    } else {
      this._hideInputError(formElement, inputElement, config);
    }
  };

  _hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(
      `.form__input-error_field_${inputElement.name}`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  };

  _showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(
      `.form__input-error_field_${inputElement.name}`
    );
    inputElement.classList.add(this._inputErrorClas);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  resetForm = (form, config) => {
    const listInputs = Array.from(form.querySelectorAll(config.inputSelector));
    listInputs.forEach((inputElement) => {
      this._hideInputError(form, inputElement, config);
    });
    const buttonElement = form.querySelector(config.submitButtonSelector);
    this._toggleButtonState(listInputs, buttonElement, config);
  };
}
