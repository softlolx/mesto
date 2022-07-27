import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputsList = this._popup.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputsList.forEach((item) => {
      return (inputValues[item.name] = item.value);
    });

    return inputValues;
  }

  setInputValues(data) {
    this._inputsList.forEach((item) => {
      item.value = data[item.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log(this._getInputValues());
      this._handleSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
