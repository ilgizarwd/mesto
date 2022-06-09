let button = document.querySelector('.profile__button-edit');
let profileTitle = document.querySelector('.profile__title');
let profileRole = document.querySelector('.profile__text');
let popup = document.querySelector('.popup');
let popupCloseButton = popup.querySelector('.popup__button-close');
let popupForm = document.querySelector('.popup__form');
let popupTitle = popupForm.querySelector('.popup__input_text_name');
let popupRole = popupForm.querySelector('.popup__input_text_role');

function closePopup() {
  popup.classList.remove('popup_opened');
}

function showPopup() {
  popup.classList.add('popup_opened');
  popupTitle.value = profileTitle.textContent
  popupRole.value = profileRole.textContent;
}

function updateProfile(){
  profileTitle.textContent = popupTitle.value;
  profileRole.textContent = popupRole.value;
}

button.addEventListener('click', function () {
  showPopup();
});

popupCloseButton.addEventListener('click', function () {
  closePopup();
});

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = popupTitle.value;
    profileRole.textContent = popupRole.value;
    closePopup();
}

popupForm.addEventListener('submit', formSubmitHandler);
