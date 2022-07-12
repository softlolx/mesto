export class FormValidator {
  constructor(elements, form) {
    this._form = form;
    this._inputSelector = elements.inputSelector;
    this._errorClass = elements.errorClass;
    this._inputErrorClass = elements.inputErrorClass;
    this._inactiveButtonClass = elements.inactiveButtonClass;
    this._submitButtonSelector = elements.submitButtonSelector;

    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _toggleSubmitButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.setAttribute("disabled", "");
    } else {
      this._buttonElement.removeAttribute("disabled", "");
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Эх, а я сам заметил через минуту после того, как отправил на ревью, поправил, но видимо уже поздно было :) Спасибо!

  resetValidation() {
    this._form.reset();
    this._toggleSubmitButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(this._form, inputElement);
    });
  }

  _setEventListeners() {
    this._toggleSubmitButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this._form, inputElement);
        this._toggleSubmitButtonState();
      });
    });
  }
}
