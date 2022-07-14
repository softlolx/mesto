export class FormValidator {
  constructor(elements, form) {
    this._form = form;
    this._inputSelector = elements.inputSelector;
    this._errorClass = elements.errorClass;
    this._inputErrorClass = elements.inputErrorClass;
    this._inactiveButtonClass = elements.inactiveButtonClass;
    this._submitButtonSelector = elements.submitButtonSelector;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
  }

  // Показать/скрыть ошибку поля ввода

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  // Проверяем валидность ввода (при каждом изменении инпута)

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Вкл/выкл кнопку сабмита

  _toggleSubmitButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.setAttribute("disabled", "");
    } else {
      this._buttonElement.removeAttribute("disabled", "");
    }
  }

  // Очистка формы, ошибок валидации и выключение кнопки. Используется в индексе при каждом открытии формы.

  resetValidation() {
    this._toggleSubmitButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _setEventListeners() {
    this._toggleSubmitButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButtonState();
      });
    });
  }
}
