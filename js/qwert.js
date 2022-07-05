const profileContainer = document.querySelector(".profile__container");
const buttonEdit = profileContainer.querySelector(".profile__button-edit");
const buttonAdd = profileContainer.querySelector(".profile__button-add");
const profileTitle = profileContainer.querySelector(".profile__title");
const profileRole = profileContainer.querySelector(".profile__text");
const cardTemplate = document.querySelector(".card__template").content;
const cardList = document.querySelector(".card__list");

const popupProfileEdit = document.querySelector(".popup_profile-edit");
const popupNewPlace = document.querySelector(".popup_new-place");
const popupCardShow = document.querySelector(".popup_card-show");
const formTitle = popupProfileEdit.querySelector(".form__input_text_name");
const formRole = popupProfileEdit.querySelector(".form__input_text_role");

initialCards.forEach((item) => {
  cardList.append(cardRender(item));
});

function cardRender(item) {
  const cardElement = cardTemplate.querySelector(".card__item").cloneNode(true);
  const cardButtonlike = cardElement.querySelector(".card__button-like");
  const cardButtonTrash = cardElement.querySelector(".card__button-trash");
  const newCardPhoto = cardElement.querySelector(".card__photo");
  const newCardTitle = cardElement.querySelector(".card__title");
  cardButtonlike.addEventListener("click", () => {
    cardButtonlike.classList.toggle("card__button-like_liked");
  });
  cardButtonTrash.addEventListener("click", () => {
    cardButtonTrash.closest(".card__item").remove();
  });

  newCardPhoto.src = item.link;
  newCardPhoto.alt = item.name;
  newCardTitle.textContent = item.name;

  newCardPhoto.addEventListener("click", () => {
    popUpSlideShow(item);
  });
  return cardElement;
}

const formsConfig = {
  formSelector: "formPlace",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  inactiveButtonClass: "form__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};



const formPlace = document.forms.place;
const formPlaceFields = Array.from(formPlace.querySelectorAll(".form__input"));
const buttonSubmitFormPlace = formPlace.querySelector(".form__button-save");

const formEdit = document.forms.edit;
const formEditFields = Array.from(formEdit.querySelectorAll(".form__input"));
const buttonSubmitFormEdit = formEdit.querySelector(".form__button-save");


const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  popup.addEventListener("mousedown", mousePopupClose);
  document.addEventListener("keydown", escPopupClose);
};

const openPopupPlace = () => {
  formPlace.reset();
  formPlace.submit.setAttribute("disabled", "disabled");
  openPopup(popupNewPlace);
};

function closePopup(item) {
  item.classList.remove("popup_opened");
}

const escPopupClose = (evt) => {
  const popup = document.querySelector(".popup_opened");
  if (evt.code === "Escape") {
    closePopup(popup);
    document.removeEventListener("keydown", escPopupClose);
  }
};

const mousePopupClose = (evt) => {
  const popup = document.querySelector(".popup_opened");
  if (evt.target === popup) {
    closePopup(popup);
  }
};

formEdit.addEventListener("submit", formSubmitHandlerEdit);

const popupCloseButtonEdit = popupProfileEdit.querySelector(
  ".popup__button-close"
);

buttonEdit.addEventListener("click", () => {
  openPopup(popupProfileEdit);
  formTitle.value = profileTitle.textContent;
  formRole.value = profileRole.textContent;
});

popupCloseButtonEdit.addEventListener("click", () => {
  closePopup(popupProfileEdit);
});

function formSubmitHandlerEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = formTitle.value;
  profileRole.textContent = formRole.value;
  closePopup(popupProfileEdit);
}

buttonAdd.addEventListener("click", () => {
  openPopupPlace(popupNewPlace);
});

const popupCloseButtonPlace = popupNewPlace.querySelector(
  ".popup__button-close"
);

popupCloseButtonPlace.addEventListener("click", function () {
  closePopup(popupNewPlace);
});

const inputPlace = popupNewPlace.querySelector(".form__input_text_place");
const inputLink = popupNewPlace.querySelector(".form__input_text_link");

formPlace.addEventListener("submit", formSubmitHandlerPlace);

function formSubmitHandlerPlace(evt) {
  evt.preventDefault();
  const formTitlePlace = inputPlace.value;
  const formLinkPlace = inputLink.value;
  const item = {
    link: formLinkPlace,
    name: formTitlePlace,
  };
  cardList.prepend(cardRender(item));
  closePopup(popupNewPlace);
}

const popupCloseButtonShow = popupCardShow.querySelector(
  ".popup__button-close"
);

popupCloseButtonShow.addEventListener("click", function () {
  closePopup(popupCardShow);
});

const cardLink = popupCardShow.querySelector(".popup__slide_link");
const cardDesc = popupCardShow.querySelector(".popup__slide_desc");

function popUpSlideShow(item) {
  openPopup(popupCardShow);
  cardLink.src = item.link;
  cardLink.alt = item.name;
  cardDesc.textContent = item.name;
}

formPlaceFields.forEach((elementField) => {
  // console.log(elementField);
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
    const formIsValid = formPlaceFields.every(({ validity }) => validity.valid);
    if (formIsValid) {
      buttonSubmitFormPlace.removeAttribute("disabled");
    } else {
      buttonSubmitFormPlace.setAttribute("disabled", "disabled");
    }
  });
});

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
    const formIsValid = formEditFields.every(({ validity }) => validity.valid);
    if (formIsValid) {
      buttonSubmitFormEdit.removeAttribute("disabled");
    } else {
      buttonSubmitFormEdit.setAttribute("disabled", "disabled");
    }
  });
});
