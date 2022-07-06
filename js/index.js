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
const popupFormEdit = popupProfileEdit.querySelector(".form_edit");
const popupFormPlace = popupNewPlace.querySelector(".form_new-place");

initialCards.forEach(function (item) {
  cardList.append(cardRender(item));
});

const formsConfig = {
  formSelector: "form",
  formFieldset: "form__set",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  inactiveButtonClass: "form__button-save_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

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

function closePopup(item) {
  item.classList.remove("popup_opened");
}

function openPopup(item) {
  item.classList.add("popup_opened");
  item.addEventListener("mousedown", mousePopupClose);
  document.addEventListener("keydown", escPopupClose);
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

popupFormEdit.addEventListener("submit", formSubmitHandlerEdit);

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
  openPopup(popupNewPlace);
  popupFormPlace.reset();
});

const popupCloseButtonPlace = popupNewPlace.querySelector(
  ".popup__button-close"
);

popupCloseButtonPlace.addEventListener("click", function () {
  closePopup(popupNewPlace);
});

const formPlace = popupNewPlace.querySelector(".form__input_text_place");
const formLink = popupNewPlace.querySelector(".form__input_text_link");

popupFormPlace.addEventListener("submit", formSubmitHandlerPlace);

function formSubmitHandlerPlace(evt) {
  evt.preventDefault();
  const formTitlePlace = formPlace.value;
  const formLinkPlace = formLink.value;
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

enableValidation(formsConfig);
