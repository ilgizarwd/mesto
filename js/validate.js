const formsConfig = {
  formSelector: "formPlace",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  inactiveButtonClass: "form__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const enableValidation = (config) => {
  const formPlace = document.forms.place;
  const formPlaceFields = Array.from(
    formPlace.querySelectorAll(".form__input")
  );
  const buttonSubmitFormPlace = formPlace.querySelector(".form__button-save");
  formPlaceFields.forEach((elementField) => {
    const errorTextContainerSelector = `.form__item-error_field_${elementField.name}`;
    const elementError = formPlace.querySelector(errorTextContainerSelector);

    elementField.addEventListener("input", (e) => {
      const fieldIsValid = elementField.validity.valid;
      elementError.textContent = elementField.validationMessage;
      if (!fieldIsValid) {
        elementField.classList.add("form__item_invalid");
      } else {
        elementField.classList.remove("form__item_invalid");
      }
      const formIsValid = formPlaceFields.every(
        ({ validity }) => validity.valid
      );
      if (formIsValid) {
        buttonSubmitFormPlace.removeAttribute("disabled");
      } else {
        buttonSubmitFormPlace.setAttribute("disabled", "disabled");
      }
    });
  });

  const formEdit = document.forms.edit;
  const formEditFields = Array.from(formEdit.querySelectorAll(".form__input"));
  const buttonSubmitFormEdit = formEdit.querySelector(".form__button-save");
  formEditFields.forEach((elementField) => {
    // console.log(elementField);
    const errorTextContainerSelector = `.form__item-error_field_${elementField.name}`;
    const elementError = formEdit.querySelector(errorTextContainerSelector);

    elementField.addEventListener("input", (e) => {
      const fieldIsValid = elementField.validity.valid;
      elementError.textContent = elementField.validationMessage;
      if (!fieldIsValid) {
        elementField.classList.add("form__item_invalid");
      } else {
        elementField.classList.remove("form__item_invalid");
      }
      const formIsValid = formEditFields.every(
        ({ validity }) => validity.valid
      );
      if (formIsValid) {
        buttonSubmitFormEdit.removeAttribute("disabled");
      } else {
        buttonSubmitFormEdit.setAttribute("disabled", "disabled");
      }
    });
  });
};
