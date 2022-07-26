export default class Cards {
  constructor(item, cardTemplate) {
    this._name = item.name;
    this._link = item.link;
    this._cardTemplate = cardTemplate;
    // this._cardTemplate = document.querySelector(".card__template").content;
    this._cardList = document.querySelector(".card__list");
    this._cardElement = this._cardTemplate
      .querySelector(".card__item")
      .cloneNode(true);
    this._cardButtonlike =
      this._cardElement.querySelector(".card__button-like");
    this._cardButtonTrash = this._cardElement.querySelector(
      ".card__button-trash"
    );
    this._newCardPhoto = this._cardElement.querySelector(".card__photo");
    this._newCardTitle = this._cardElement.querySelector(".card__title");

    this._popupCardShow = document.querySelector(".popup_card-show");
    this._popupCloseButtonShow = this._popupCardShow.querySelector(
      ".popup__button-close"
    );
    this._cardLink = this._popupCardShow.querySelector(".popup__slide_link");
    this._cardDesc = this._popupCardShow.querySelector(".popup__slide_desc");
    // console.log(this._cardList);
  }

  render = () => {
    // console.log(this._link);
    // console.log(this._name);
    // console.log(this._item.name);
    this._cardButtonlike.addEventListener("click", () => {
      this._cardButtonlike.classList.toggle("card__button-like_liked");
    });
    this._cardButtonTrash.addEventListener("click", () => {
      this._cardButtonTrash.closest(".card__item").remove();
    });

    this._newCardPhoto.src = this._link;
    this._newCardPhoto.alt = this._name;
    this._newCardTitle.textContent = this._name;

    this._newCardPhoto.addEventListener("click", () => {
      // console.log(item);
      this._popUpSlideShow(this._item);
      // console.log(this._newCardPhoto);
    });
    // console.log(this._cardElement);
    this._popupCloseButtonShow.addEventListener("click", () => {
      this._closePopup();
    });

    this._cardList.prepend(this._cardElement);
  };

  _popUpSlideShow() {
    this._openPopup(this._popupCardShow);
    this._cardLink.src = this._link;
    this._cardLink.alt = this._name;
    this._cardDesc.textContent = this._name;
  }

  _openPopup(item) {
    item.classList.add("popup_opened");
    document.addEventListener("mousedown", this._mousePopupClose);
    document.addEventListener("keydown", this._escPopupClose);
  }

  _escPopupClose = (evt) => {
    if (evt.code === "Escape") {
      // const popup = document.querySelector(".popup_opened");
      // console.log("gfdgdf")
      this._closePopup();
    }
  };

  _mousePopupClose = (evt) => {
    console.log(evt.target)
    console.log(evt.currentTarget)
    if (evt.target === evt.currentTarget) {
      this._closePopup();
    }
  };

  _closePopup() {
    this._popupCardShow.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._escPopupClose);
  }
}
