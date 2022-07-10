const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(
    `.form__input-error_field_${inputElement.name}`
  );
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(
    `.form__input-error_field_${inputElement.name}`
  );
  // console.log(errorElement);
  inputElement.classList.remove(config.inputErrorClass);
  // debugger;
  // errorElement.classList.remove(formsConfig.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    console.log(inputElement.validity.valid);
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
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
const toggleButtonState = (inputList, buttonElement, config) => {
  // Если есть хотя бы один невалидный инпут
  // console.log(inputList);
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    config.submitButtonSelector
  );

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

const enableValidation = (config) => {
  // debugger;
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  // console.log(formList);
  formList.forEach((formElement) => {
    // formElement.addEventListener("submit", function (evt) {
    //   evt.preventDefault();
    // });
    setEventListeners(formElement, config);
    // const fieldsetList = Array.from(
    //   formElement.querySelectorAll(config.formFieldset)
    // );
    // // console.log(formElement);

    // fieldsetList.forEach((fieldSet) => {
    //   setEventListeners(fieldSet);
    // });
  });
};

const buttonElement = form.querySelector(
  config.submitButtonSelector
);
toggleButtonState(listInputs, buttonElement, config);
