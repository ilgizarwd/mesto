const profileContainer = document.querySelector('.profile__container');
const buttonEdit = profileContainer.querySelector('.profile__button-edit');
const buttonAdd = profileContainer.querySelector('.profile__button-add');
const profileTitle = profileContainer.querySelector('.profile__title');
const profileRole = profileContainer.querySelector('.profile__text');
const cardTemplate = document.querySelector('.card__template').content;
const cardList = document.querySelector('.card__list');

const popupProfileEdit = document.querySelector('.popup_profile-edit');
const popupTitle = popupProfileEdit.querySelector('.popup__input_text_name');
const popupRole = popupProfileEdit.querySelector('.popup__input_text_role');

const popupNewPlace = document.querySelector('.popup_new-place');
const popupFormPlace = popupNewPlace.querySelector('.popup__form');
const popupCardShow = document.querySelector('.popup_card-show');


// const cardElement = cardTemplate.querySelector('.card__item');

// let popup = document.querySelectorAll('.popup');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


initialCards.forEach(function (item) {
  cardList.append(cardRender(item));
});

function cardRender(item) {
  const cardElement = cardTemplate.querySelector('.card__item').cloneNode(true);
  const cardButtonlike = cardElement.querySelector('.card__button-like');
  const cardButtonTrash = cardElement.querySelector('.card__button-trash');
  cardButtonlike.addEventListener('click', () => {
    cardButtonlike.classList.toggle('card__button-like_liked');
  });
  cardButtonTrash.addEventListener('click', () => {
    cardButtonTrash.parentElement.offsetParent.remove();
  });
  cardElement.querySelector('.card__photo').src = item.link;
  cardElement.querySelector('.card__photo').alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__photo').addEventListener('click', () => {
    popUpSlideShow(item);
  });
  return cardElement;
};
function closePopup(item) {
  item.classList.remove('popup_opened');
};
buttonEdit.addEventListener('click', () => {
  popupProfileEdit.classList.add('popup_opened');
  const popupFormEdit = popupProfileEdit.querySelector('.popup__form');
  popupFormEdit.addEventListener('submit', formSubmitHandler);
  popupTitle.value = profileTitle.textContent;
  popupRole.value = profileRole.textContent;
  function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupTitle.value;
    profileRole.textContent = popupRole.value;
    closePopup(popupProfileEdit);
  };
  const popupCloseButton = popupProfileEdit.querySelector('.popup__button-close');
  popupCloseButton.addEventListener('click', function () {
    closePopup(popupProfileEdit);
  });
});

buttonAdd.addEventListener('click', () => {
  popupNewPlace.classList.add('popup_opened');
  popupFormPlace.addEventListener('submit', formSubmitHandler);

  function formSubmitHandler(evt) {
    evt.preventDefault();
    const popupTitlePlace = popupNewPlace.querySelector('.popup__input_text_place').value;
    const popupLinkPlace = popupNewPlace.querySelector('.popup__input_text_link').value;
    const item = {
      link: popupLinkPlace,
      name: popupTitlePlace
    };
    cardList.prepend(cardRender(item));
    closePopup(popupNewPlace);

  };
  const popupCloseButton = popupNewPlace.querySelector('.popup__button-close');
  popupCloseButton.addEventListener('click', function () {
    closePopup(popupNewPlace);
  });
  popupFormPlace.reset();
});

function popUpSlideShow(item) {
  popupCardShow.classList.add('popup_opened');
  popupCardShow.querySelector('.popup__slide_link').src = item.link;
  console.log(item.link);
  const popupCloseButton = popupCardShow.querySelector('.popup__button-close');
  popupCloseButton.addEventListener('click', function () {
    closePopup(popupCardShow);
  });
};
