let buttonEdit = document.querySelector('.profile__button-edit');
let buttonAdd = document.querySelector('.profile__button-add');
let profileTitle = document.querySelector('.profile__title');
let profileRole = document.querySelector('.profile__text');

let popupCloseButton;
let popupForm;
let buttonType;

const popup = document.querySelector('.popup');
const popupTemplate = document.querySelector('.popup__template').content;
const popupElement = popupTemplate.querySelector('.popup__container').cloneNode(true);

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
});

let liked = document.querySelectorAll('.card__button-like');

liked.forEach(function (item) {
  item.addEventListener('click', () => {
    item.classList.toggle('card__button-like_liked');
  });
})

const cardButtonTrash = document.querySelectorAll('.card__button-trash');
cardButtonTrash.forEach(function (item) {
  item.addEventListener('click', () =>  {
    item.parentElement.offsetParent.remove();
  })
});

buttonEdit.addEventListener('click', () =>  {
  popupElement.querySelector('.popup__title').textContent = "Редактировать профиль";
  popupElement.querySelector('.popup__input_field_first').value = profileTitle.textContent;
  popupElement.querySelector('.popup__input_field_second').value = profileRole.textContent;
  popupElement.querySelector('.popup__button-save').textContent = "Сохранить";
  popup.classList.add('popup_opened');
  popupForm = popupElement.querySelector('.popup__form');
  buttonType = 0;
  popupForm.addEventListener('submit', formSubmitHandler);
  popupCloseButton = popupElement.querySelector('.popup__button-close');
  popupCloseButton.addEventListener('click', () =>  {
    popupElement.remove();
    closePopup();
  });
  popup.append(popupElement);
});

buttonAdd.addEventListener('click', () =>  {
  popupElement.querySelector('.popup__title').textContent = "Новое место";
  popupElement.querySelector('.popup__input_field_first').value = "";
  popupElement.querySelector('.popup__input_field_second').value = "";
  popupElement.querySelector('.popup__input_field_first').placeholder = "Название";
  popupElement.querySelector('.popup__input_field_second').placeholder = "Ссылка";
  popupElement.querySelector('.popup__button-save').textContent = "Создать";
  popup.classList.add('popup_opened');
  popupForm = popupElement.querySelector('.popup__form');
  buttonType = 1;
  popupForm.addEventListener('submit', formSubmitHandler);
  popupCloseButton = popupElement.querySelector('.popup__button-close');
  popupCloseButton.addEventListener('click', () =>  {
    popupElement.remove();
    closePopup();
  });

  popup.append(popupElement);
});

const cardPhoto = document.querySelectorAll('.card__photo');
cardPhoto.forEach(function (item) {
  item.addEventListener('click', function () {
    popupElement.querySelector('.popup__photo').src = this.currentSrc;
    popupElement.querySelector('.popup__title').style.display = "none";
    popupElement.querySelector('.popup__form').style.display = "none";
    popup.classList.add('popup_opened');

    popupCloseButton = popupElement.querySelector('.popup__button-close');
    popupCloseButton.addEventListener('click', () => {
      popupElement.remove();
      closePopup();
    });
    popup.append(popupElement);
    popup.querySelector('.popup__container').style.padding = "0";
    popup.querySelector('.popup__container').style.width = "auto";
  })
});

function closePopup() {
  // const popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
  // popup.closest();
  // popup.remove();
};

function formSubmitHandler(e) {
  e.preventDefault();

  // const cardElement = cardTemplate.querySelector('.card__item').cloneNode(true);
  if (buttonType === 0) {
    profileTitle.textContent = popupElement.querySelector('.popup__input_field_first').value;
    profileRole.textContent = popupElement.querySelector('.popup__input_field_second').value;
  } else {
    const cardElement = cardTemplate.querySelector('.card__item').cloneNode(true);
    cardElement.querySelector('.card__photo').src = popupElement.querySelector('.popup__input_field_second').value;
    cardElement.querySelector('.card__photo').alt = popupElement.querySelector('.popup__input_field_first').value;
    cardElement.querySelector('.card__title').textContent = popupElement.querySelector('.popup__input_field_first').value;

    cardElement.querySelector('.card__button-like').addEventListener('click', () => {
      cardElement.querySelector('.card__button-like').classList.toggle('card__button-like_liked');
    });
    cardElement.querySelector('.card__button-trash').addEventListener('click', () =>  {
      cardElement.querySelector('.card__button-like').parentElement.offsetParent.remove();
    })

    cardList.prepend(cardElement);
  };

  closePopup();
};




