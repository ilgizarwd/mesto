import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector, { item }) {
    super(selector);
    this._selector = selector
    this._link = item.link
    this._name = item.name
    this._cardLink = this._selector.querySelector(".popup__slide_link");
    this._cardDesc = this._selector.querySelector(".popup__slide_desc");
  }

  open() {
    this._cardLink.src = this._link;
    this._cardLink.alt = this._name;
    this._cardDesc.textContent = this._name;
    super.open();
  }
}
