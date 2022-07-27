import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputsList = this._popup.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector(".popup__submit-button");
    this._submitButtonStandardText = this._submitButton.textContent;
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

  renderLoading(isLoading, text) {
    if (isLoading) {
      this._submitButton.textContent = text;
    } else {
      this._submitButton.textContent = this._submitButtonStandardText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
