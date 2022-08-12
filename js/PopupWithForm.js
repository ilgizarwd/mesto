import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector) {
    this._selector = selector;
  }

  open() {
    this._selector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._selector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._selector.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
          this.close();
        }
        if (evt.target.classList.contains("popup__button-close")) {
          this.close();
        }
      });


    // const popups = document.querySelector(this._selector);

    // popups.forEach((popup) => {
    //   popup.addEventListener("mousedown", (evt) => {
    //     if (evt.target.classList.contains("popup_opened")) {
    //       this.close();
    //     }
    //     if (evt.target.classList.contains("popup__button-close")) {
    //       this.close();
    //     }
    //   });
    // });
  }

  _handleEscClose = (evt) => {
    if (evt.code === "Escape") {
      this.close();
    }
  };
}
