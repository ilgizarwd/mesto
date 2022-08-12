import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._selector = selector
    // this._item = item
    this._cardLink = this._selector.querySelector(".popup__slide_link");
    this._cardDesc = this._selector.querySelector(".popup__slide_desc");
  }

  open() {
    // console.log(this._item)
    this._selector.classList.add("popup_opened");
    // document.addEventListener("keydown", this._handleEscClose);
    // this._cardLink.src = item.link;
    // this._cardLink.alt = item.name;
    // this._cardDesc.textContent = item.name;
  }
}
