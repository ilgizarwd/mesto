import './index.css';
import Cards from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from '../components/cards.js';
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
const popupFormPlace = popupNewPlace.querySelector(".form_new-place");
const cardList = document.querySelector(".card__list");
const cardListSection = ".card__list";

const formsConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  inactiveButtonClass: "form__button-save_disabled",
  inputErrorClass: "form__item_invalid",
  errorClass: "form__input-error",
};

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Cards(item, cardTemplate, handleCardClick);
      const cardElement = card.generateCard();

      cardsList.addItem(cardElement);
    },
  },
  cardListSection
);

cardsList.renderItems();

const newPlaceValidator = new FormValidator(formsConfig, ".form_new-place");
newPlaceValidator.enableValidation();

const editValidator = new FormValidator(formsConfig, ".form_edit");
editValidator.enableValidation();

const profileEdit = new PopupWithForm(
  popupProfileEdit,
  handleProfileFormSubmit
);
const newPlace = new PopupWithForm(popupNewPlace, handlePlaceFormSubmit);
const userInfo = new UserInfo({title: profileTitle, role: profileRole });

buttonEdit.addEventListener("click", () => {
  profileEdit.open();

  const userData = userInfo.getUserInfo();
  formTitle.value = userData.title;
  formRole.value = userData.role;
  editValidator.resetForm();
});

function handleProfileFormSubmit({ formInputName, formInputRole }) {
  // const userInfo = new UserInfo({ formInputName, formInputRole });
  userInfo.setUserInfo(formTitle, formRole);
  // profileTitle.textContent = userData.title;
  // profileRole.textContent = userData.role;
  profileEdit.close();
}
function handlePlaceFormSubmit(data) {
  const card = new Cards(data, cardTemplate, handleCardClick);
  const cardElement = card.generateCard();
  cardList.prepend(cardElement);
  newPlace.close();
}

buttonAdd.addEventListener("click", () => {
  popupFormPlace.reset();
  newPlaceValidator.resetForm();
  newPlace.open();
});

function handleCardClick(item) {
  const cardShow = new PopupWithImage(popupCardShow, { item });
  cardShow.open();
}
