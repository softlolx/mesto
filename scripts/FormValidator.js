import { elements } from "./index.js";

export class FormValidator {
  constructor(elements, form) {
    this._settings = elements;
    this._form = form;
    this._inputSelector = elements.inputSelector;
    this._errorClass = elements.errorClass;
    this._inputErrorClass = elements.inputErrorClass;
    this._inactiveButtonClass = elements.inactiveButtonClass;
    this._submitButtonSelector = elements.submitButtonSelector;
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

  _toggleSubmitButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList) === true) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", "");
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled", "");
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._form.querySelector(this._submitButtonSelector);

    this._toggleSubmitButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this._form, inputElement);
        this._toggleSubmitButtonState(inputList, buttonElement);
      });
    });
  }
}
