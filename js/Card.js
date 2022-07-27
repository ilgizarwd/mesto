export default class Cards {
  constructor(item, cardTemplate, popUpSlideShow) {
    this._name = item.name;
    this._link = item.link;
    this._cardTemplate = cardTemplate;
    this._popUpSlideShow = popUpSlideShow;
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
    this._newCardPhoto.src = this._link;
    this._newCardPhoto.alt = this._name;
    this._newCardTitle.textContent = this._name;
  }

  getElement = () => {
    this._setEventListeners();
    this._cardList.prepend(this._cardElement);
  };

  _setEventListeners = () => {
    this._cardButtonlike.addEventListener("click", () => {
      this._cardButtonlike.classList.toggle("card__button-like_liked");
    });
    this._cardButtonTrash.addEventListener("click", () => {
      this._cardButtonTrash.closest(".card__item").remove();
    });
    this._newCardPhoto.addEventListener("click", () => {
      this._popUpSlideShow({ link: this._link, name: this._name });
    });
  };
}
