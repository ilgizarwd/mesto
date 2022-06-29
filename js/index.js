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
const popupTitle = popupProfileEdit.querySelector(".popup__input_text_name");
const popupRole = popupProfileEdit.querySelector(".popup__input_text_role");
const popupFormEdit = popupProfileEdit.querySelector(".popup__form");
const popupFormPlace = popupNewPlace.querySelector(".popup__form");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.forEach(function (item) {
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

function closePopup(item) {
  item.classList.remove("popup_opened");
}

function openPopup(item) {
  item.classList.add("popup_opened");
  item.addEventListener("mousedown", (evt) => {
    if (evt.target === item) {
      closePopup(item);
    }
  });
  document.addEventListener("keydown", (evt) => {
    if (evt.code === "Escape") {
      closePopup(item);
    }
  });
}

popupFormEdit.addEventListener("submit", formSubmitHandlerEdit);

const popupCloseButtonEdit = popupProfileEdit.querySelector(
  ".popup__button-close"
);

buttonEdit.addEventListener("click", () => {
  openPopup(popupProfileEdit);
  popupTitle.value = profileTitle.textContent;
  popupRole.value = profileRole.textContent;
});

popupCloseButtonEdit.addEventListener("click", () => {
  closePopup(popupProfileEdit);
});

function formSubmitHandlerEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupTitle.value;
  profileRole.textContent = popupRole.value;
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

const popupPlace = popupNewPlace.querySelector(".popup__input_text_place");
const popupLink = popupNewPlace.querySelector(".popup__input_text_link");

popupFormPlace.addEventListener("submit", formSubmitHandlerPlace);

function formSubmitHandlerPlace(evt) {
  evt.preventDefault();
  const popupTitlePlace = popupPlace.value;
  const popupLinkPlace = popupLink.value;
  const item = {
    link: popupLinkPlace,
    name: popupTitlePlace,
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
