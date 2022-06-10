function showInputError(elements, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(elements.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(elements.errorClass);
}

function hideInputError(elements, formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(elements.inputErrorClass);
  errorElement.classList.remove(elements.errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(elements, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(
      elements,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(elements, formElement, inputElement);
  }
}

function setEventListeners(elements, formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(elements.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    elements.submitButtonSelector
  );
  toggleSubmitButtonState(elements, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(elements, formElement, inputElement);
      toggleSubmitButtonState(elements, inputList, buttonElement);
    });
  });
}

function enableValidation(elements) {
  const formList = Array.from(document.querySelectorAll(elements.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(elements, formElement);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleSubmitButtonState(elements, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.removeAttribute("disabled", "");
  }
}

//elements

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
