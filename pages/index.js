let button = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let popupCloseButton = document.querySelector('.popup__button-close');
let popupSaveButton = document.querySelector('.popup__button-save');
let profileTitle = document.querySelector('.profile__title');
let profileRole = document.querySelector('.profile__text');
let popupTitle = document.querySelector('.popup__name');
let popupRole = document.querySelector('.popup__role');

function closePopupESC(e) {
  if (e.code === 'Escape') {
    closePopup();
  }
};

function savePopupEnter(e) {
  if (e.code === 'Enter') {
    updateProfile();
    closePopup();
  }
};

function closePopup() {
  popup.classList.add('popup_hidden');
  document.removeEventListener('keydown', closePopupESC);
  document.removeEventListener('keydown', savePopupEnter);
}

function showPopup() {
  popup.classList.remove('popup_hidden');
  document.addEventListener('keydown', closePopupESC);
  document.addEventListener('keydown', savePopupEnter);
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

popup.addEventListener('click', function (e) {
  if (e.target === e.currentTarget) {
    closePopup();
  }
});

popupSaveButton.addEventListener('click', function () {
  updateProfile();
  closePopup();
})



