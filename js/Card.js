export default class Cards {
  constructor(item, cardTemplate, handleCardClick) {
    this._name = item.name;
    this._link = item.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;

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
  }

  generateCard = () => {
    this._newCardPhoto.src = this._link;
    this._newCardPhoto.alt = this._name;
    this._newCardTitle.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  };

  _setEventListeners = () => {
    this._cardButtonlike.addEventListener("click", () => {
      this._cardButtonlike.classList.toggle("card__button-like_liked");
    });
    this._cardButtonTrash.addEventListener("click", () => {
      this._cardButtonTrash.closest(".card__item").remove();
    });
    this._newCardPhoto.addEventListener("click", () => {
      this._handleCardClick({ link: this._link, name: this._name });
    });
  };
}
