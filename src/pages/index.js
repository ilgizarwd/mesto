import "./index.css";
import Cards from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js"
import { initialCards } from "../utils/cards.js";
import image from "../images/content/avatar/image.jpg";
import logo from "../images/logo/logo.svg";

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
const popupFormEdit = popupProfileEdit.querySelector(".form_edit");
const cardListSection = ".card__list";

const formsConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button-save",
  inactiveButtonClass: "form__button-save_disabled",
  inputErrorClass: "form__item_invalid",
  errorClass: "form__input-error",
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-48',
  headers: {
    authorization: 'cc10f52f-9ca1-4d2e-8a59-ab54b230d125',
    'Content-Type': 'application/json'
  }
});

const cardsList = new Section(
  {
    renderer: (item) => {
      cardsList.addItem(handleCardCreate(item));
    },
  },
  cardListSection
);
console.log(api.getInitialCards())
cardsList.renderItems(api.getInitialCards());

const newPlaceValidator = new FormValidator(formsConfig, popupFormPlace);
newPlaceValidator.enableValidation();

const editValidator = new FormValidator(formsConfig, popupFormEdit);
editValidator.enableValidation();

const profileEdit = new PopupWithForm(
  popupProfileEdit,
  handleProfileFormSubmit
);
profileEdit.setEventListeners();
const newPlace = new PopupWithForm(popupNewPlace, handlePlaceFormSubmit);
newPlace.setEventListeners();
const userInfo = new UserInfo({ title: profileTitle, role: profileRole });

buttonEdit.addEventListener("click", () => {
  profileEdit.open();
  const { title, role } = userInfo.getUserInfo();
  formTitle.value = title;
  formRole.value = role;
  editValidator.resetForm();
});

function handleProfileFormSubmit({ formInputName, formInputRole }) {
  const setInfoData = { title: formInputName, role: formInputRole };
  userInfo.setUserInfo(setInfoData);
  profileEdit.close();
}
function handlePlaceFormSubmit(data) {
  cardsList.addItem(handleCardCreate(data));
  newPlace.close();
}

buttonAdd.addEventListener("click", () => {
  popupFormPlace.reset();
  newPlaceValidator.resetForm();
  newPlace.open();
});

const cardShow = new PopupWithImage(popupCardShow);
cardShow.setEventListeners();
function handleCardClick(item) {
  cardShow.open(item);
}

function handleCardCreate(item) {
  const card = new Cards(item, ".card__template", handleCardClick);
  return card.generateCard();
}
