const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(
    `.form__input-error_field_${inputElement.name}`
  );
  inputElement.classList.add(formsConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formsConfig.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `.form__input-error_field_${inputElement.name}`
  );
  // console.log(errorElement);
  inputElement.classList.remove(formsConfig.inputErrorClass);
  // debugger;
  // errorElement.classList.remove(formsConfig.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    console.log(inputElement.validity.valid);
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
const hasInvalidInput = (inputList) => {
  // inputList.forEach((inputElement) => {
  //   if (!inputElement.validity.valid && inputElement.value !=='') {
  //     console.log(inputElement.value);
  //     return inputElement.validity.valid;
  //   }
  // })
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
  //   // Если поле не валидно, колбэк вернёт true
  //   // Обход массива прекратится и вся функция
  //   // hasInvalidInput вернёт true
    // console.log(inputElement);
    return !inputElement.validity.valid;
  });
};
// const formIsValid = formPlaceFields.every(({ validity }) => validity.valid);
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  // console.log(inputList);
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(formsConfig.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(formsConfig.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};
const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(formsConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    formsConfig.submitButtonSelector
  );

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (config) => {
  // debugger;
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  // console.log(formList);
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(
      formElement.querySelectorAll(config.formFieldset)
    );
    // console.log(formElement);

    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};
