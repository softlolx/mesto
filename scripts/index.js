import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";

const elements = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const profileEditPopup = document.querySelector(".popup_content_profile");
const cardAddPopup = document.querySelector(".popup_content_add-card");
const profileEditForm = document.querySelector(".popup__form_content_profile");
const cardAddForm = document.querySelector(".popup__form_content_add-card");
const cardAddLinkInput = document.querySelector(".popup__input_type_card-link");
const cardAddNameInput = document.querySelector(".popup__input_type_card-name");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close-button");
const cardImagePopup = document.querySelector(".popup_content_image");
const cardBigImage = cardImagePopup.querySelector(".popup__image");
const cardBigImageDescription = cardImagePopup.querySelector(".popup__image-caption");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const cardsContainer = document.querySelector(".elements__grid");

// Открытие и закрытие попапов

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("mousedown", closePopupByOverlay);
  document.addEventListener("keydown", closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("mousedown", closePopupByOverlay);
  document.removeEventListener("keydown", closePopupByEsc);
}

function closePopupByOverlay(evt) {
  if (evt.target == evt.currentTarget) {
    closePopup(evt.target);
  }
}

function closePopupByEsc(evt) {
  if (evt.key == "Escape") {
    const currentPopup = document.querySelector(".popup_opened");
    closePopup(currentPopup);
  }
}

// Универсальная функция создания карточки

function createCard(link, name) {
  const card = new Card(link, name, "#elements__card", handleCardClick);
  return card.generateCard();
}

// Создание начальных 6 карточек

initialCards.forEach((item) => {
  const readyCard = createCard(item.link, item.name);
  cardsContainer.prepend(readyCard);
});

// Обработчики действий с формами и кликов по карточке

function handleCardAddSubmit(evt) {
  evt.preventDefault();
  const readyCard = createCard(cardAddLinkInput.value, cardAddNameInput.value);
  cardsContainer.prepend(readyCard);
  closePopup(cardAddPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(profileEditPopup);
}

function setInputValues() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleCardClick(link, name) {
  cardBigImage.src = link;
  cardBigImage.alt = `Фото ${name}.`;
  cardBigImageDescription.textContent = name;
  openPopup(cardImagePopup);
}

//Event listeners

buttonEditProfile.addEventListener("click", () => {
  formValidators["profile"].resetValidation();
  openPopup(profileEditPopup);
  setInputValues();
});

cardAddButton.addEventListener("click", () => {
  formValidators["addcard"].resetValidation();
  openPopup(cardAddPopup);
});

closeButtons.forEach((item) => {
  const currentPopup = item.closest(".popup");
  item.addEventListener("click", () => {
    closePopup(currentPopup);
  });
});

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

cardAddForm.addEventListener("submit", handleCardAddSubmit);

// Создаем объект валидаторов всех форм, чтобы потом искать их по имени

const formValidators = {};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

enableValidation(elements);
