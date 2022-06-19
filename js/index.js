let profileContainer = document.querySelector('.profile__container');
let buttonEdit = profileContainer.querySelector('.profile__button-edit');
let buttonAdd = profileContainer.querySelector('.profile__button-add');
let profileTitle = profileContainer.querySelector('.profile__title');
let profileRole = profileContainer.querySelector('.profile__text');

let popup = document.querySelectorAll('.popup');

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

const cardTemplate = document.querySelector('.card__template').content;
const cardList = document.querySelector('.card__list');

initialCards.forEach(function (item) {
  const cardElement = cardTemplate.querySelector('.card__item').cloneNode(true);
  cardElement.querySelector('.card__photo').src = item.link;
  cardElement.querySelector('.card__photo').alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;
  cardList.append(cardElement);
  likeDraw();
  trashDraw();
});

function likeDraw() {
  let liked = document.querySelectorAll('.card__button-like');
  liked.forEach(function (item) {
    item.addEventListener('click', () => {
      item.classList.toggle('card__button-like_liked');
    });
  })
};


function trashDraw() {
  const cardButtonTrash = document.querySelectorAll('.card__button-trash');
cardButtonTrash.forEach(function (item) {
  item.addEventListener('click', () => {
    item.parentElement.offsetParent.remove();
  })
});
};


function closePopup(item) {
  popup[item].classList.remove('popup_opened');
};

buttonEdit.addEventListener('click', function () {
  if ((popup[0].querySelector('.popup__container_profile-edit'))) {
    popup[0].classList.add('popup_opened');
    let popupTitle = popup[0].querySelector('.popup__input_text_name');
    let popupRole = popup[0].querySelector('.popup__input_text_role');
    let popupForm = popup[0].querySelector('.popup__form');
    popupForm.addEventListener('submit', formSubmitHandler);
    popupTitle.value = profileTitle.textContent;
    popupRole.value = profileRole.textContent;
    function formSubmitHandler(evt) {
      evt.preventDefault();
      profileTitle.textContent = popupTitle.value;
      profileRole.textContent = popupRole.value;
      closePopup(0);
    };
    let popupCloseButton = popup[0].querySelector('.popup__button-close');
    popupCloseButton.addEventListener('click', function () {
      closePopup(0);
    });
  };
});

buttonAdd.addEventListener('click', function () {
  if ((popup[1].querySelector('.popup__container_new-place'))) {
    popup[1].classList.add('popup_opened');
    let popupForm = popup[1].querySelector('.popup__form');
    let popupTitle = popup[1].querySelector('.popup__input_text_name');
    let popupLink = popup[1].querySelector('.popup__input_text_link');
      const cardElement = cardTemplate.querySelector('.card__item').cloneNode(true);
    popupForm.addEventListener('submit', formSubmitHandler);


    function formSubmitHandler(evt) {
      evt.preventDefault();

      let cardPhoto = cardElement.querySelector('.card__photo');
      let cardTitle = cardElement.querySelector('.card__title');
      cardPhoto.src = popupLink.value;
      cardPhoto.alt = popupTitle.value;
      cardTitle.textContent = popupTitle.value;
      cardList.prepend(cardElement);
      // popupTitle.value = '';
      // popupLink.value = '';
      likeDraw();
      trashDraw();
      closePopup(1);
    };



    let popupCloseButton = popup[1].querySelector('.popup__button-close');
    popupCloseButton.addEventListener('click', function () {
      closePopup(1);
    });
  };
});

// function showPopup() {
//   popup.classList.add('popup_opened');
//   console.log(popup);
//   // popupTitle.value = profileTitle.textContent;
//   // popupRole.value = profileRole.textContent;
// }









