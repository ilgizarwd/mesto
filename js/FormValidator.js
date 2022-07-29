export default class FormValidator {
  constructor(config) {
    this.config = config;
    this._formSelector = config.formSelector;
  }

  enableValidation = () => {
    this._setEventListeners();
  };

  _setEventListeners = (formElement, config) => {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );

    this._toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement, config);
        this._toggleButtonState(inputList, buttonElement, config);
      });
    });
  };

  _toggleButtonState = (inputList, buttonElement, config) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "disabled");
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
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
      console.log(formElement);
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
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = "";
  };

  _showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(
      `.form__input-error_field_${inputElement.name}`
    );
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  };

  resetForm = (form, config) => {
    const listInputs = Array.from(form.querySelectorAll(config.inputSelector));
    listInputs.forEach((inputElement) => {
      hideInputError(form, inputElement, config);
    });
    const buttonElement = form.querySelector(config.submitButtonSelector);
    toggleButtonState(listInputs, buttonElement, config);
  };
}
