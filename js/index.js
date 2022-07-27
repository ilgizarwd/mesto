import Cards from "./Card.js";
import FormValidator from "./FormValidator.js";
const cardTemplate = document.querySelector(".card__template").content;

const profileContainer = document.querySelector(".profile__container");
const buttonEdit = profileContainer.querySelector(".profile__button-edit");
const buttonAdd = profileContainer.querySelector(".profile__button-add");
const profileTitle = profileContainer.querySelector(".profile__title");
const profileRole = profileContainer.querySelector(".profile__text");

const popupProfileEdit = document.querySelector(".popup_profile-edit");
const popupNewPlace = document.querySelector(".popup_new-place");
const popupCardShow = document.querySelector(".popup_card-show");
const formTitle = popupProfileEdit.querySelector(".form__input_text_title");
const formRole = popupProfileEdit.querySelector(".form__input_text_subtitle");
const popupFormEdit = popupProfileEdit.querySelector(".form_edit");
const popupFormPlace = popupNewPlace.querySelector(".form_new-place");

const formsConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  inactiveButtonClass: "form__button-save_disabled",
  inputErrorClass: "form__item_invalid",
  errorClass: "form__input-error",
};

const formValidator = new FormValidator(formsConfig);
formValidator.enableValidation();

// initialCards.forEach((item) => {
//   Card.render(item);
//   console.log(item);
// });

// function cardRender(item) {
//   const cardElement = cardTemplate.querySelector(".card__item").cloneNode(true);
//   const cardButtonlike = cardElement.querySelector(".card__button-like");
//   const cardButtonTrash = cardElement.querySelector(".card__button-trash");
//   const newCardPhoto = cardElement.querySelector(".card__photo");
//   const newCardTitle = cardElement.querySelector(".card__title");
//   cardButtonlike.addEventListener("click", () => {
//     cardButtonlike.classList.toggle("card__button-like_liked");
//   });
//   cardButtonTrash.addEventListener("click", () => {
//     cardButtonTrash.closest(".card__item").remove();
//   });

//   newCardPhoto.src = item.link;
//   newCardPhoto.alt = item.name;
//   newCardTitle.textContent = item.name;

//   newCardPhoto.addEventListener("click", () => {
//     popUpSlideShow(item);
//   });
//   return cardElement;
// }

function closePopup(item) {
  item.classList.remove("popup_opened");
  document.removeEventListener("keydown", escPopupClose);
}

function openPopup(item) {
  item.classList.add("popup_opened");

  document.addEventListener("keydown", escPopupClose);
}

const escPopupClose = (evt) => {
  if (evt.code === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
};

const mousePopupClose = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};
popupProfileEdit.addEventListener("mousedown", mousePopupClose);
popupNewPlace.addEventListener("mousedown", mousePopupClose);
popupCardShow.addEventListener("mousedown", mousePopupClose);

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
  popupFormPlace.reset();
  resetForm(popupFormPlace, formsConfig);
  openPopup(popupNewPlace);
});

const popupCloseButtonPlace = popupNewPlace.querySelector(
  ".popup__button-close"
);

popupCloseButtonPlace.addEventListener("click", function () {
  closePopup(popupNewPlace);
});

const formPlace = popupNewPlace.querySelector(".form__input_text_title");
const formLink = popupNewPlace.querySelector(".form__input_text_subtitle");

popupFormPlace.addEventListener("submit", formSubmitHandlerPlace);

function formSubmitHandlerPlace(evt) {
  evt.preventDefault();

  const formTitlePlace = formPlace.value;
  const formLinkPlace = formLink.value;
  const item = {
    link: formLinkPlace,
    name: formTitlePlace,
  };
  const card = new Cards(item, cardTemplate, popUpSlideShow);
  card.getElement();
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

// enableValidation(formsConfig);

initialCards.reverse().forEach((item) => {
  const card = new Cards(item, cardTemplate, popUpSlideShow);
  card.getElement();
});
