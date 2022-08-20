export default class FormValidator {
  constructor(config, formElement) {
    this.config = config;
    this._formSelector = config.formSelector;
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorClass = config.errorClass;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  enableValidation = () => {
    this._setEventListeners();
  };

  _setEventListeners = () => {
    this._toggleButtonState(this._inputList, this._buttonElement, this.config);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        // console.log(inputElement);
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _checkInputValidity = (inputElement) => {
    this._inputElement = inputElement;
    if (!inputElement.validity.valid) {
      this._showInputError(this._formElement);
    } else {
      this._hideInputError(this._inputElement);
    }
  };

  _hideInputError = (inputElement) => {
    this._inputElement = inputElement;
    this._errorElement = this._formElement.querySelector(
      `.form__input-error_field_${this._inputElement.name}`
    );
    this._inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = "";
  };

  _showInputError = (inputElement) => {
    this._errorElement = this._formElement.querySelector(
      `.form__input-error_field_${this._inputElement.name}`
    );
    this._inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = this._inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  };

  resetForm = () => {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  };
}
