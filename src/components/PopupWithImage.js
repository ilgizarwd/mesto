import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._selector = selector
    this._cardLink = this._selector.querySelector(".popup__slide_link");
    this._cardDesc = this._selector.querySelector(".popup__slide_desc");
  }

  open( { link, name}) {
    this._cardLink.src = link;
    this._cardLink.alt = name;
    this._cardDesc.textContent = name;
    super.open();
  }
}
