import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import "./index.css";

import {
  initialCards,
  elements,
  buttonEditProfile,
  cardAddButton,
  nameInput,
  descriptionInput,
  cardsContainer,
} from "../utils/constants.js";

// Создание карточек

function createCard(cardElement) {
  const card = new Card(cardElement, "#elements__card", handleCardClick);
  return card.generateCard();
}

const renderCards = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      renderCards.addItem(card);
    },
  },
  cardsContainer
);

renderCards.renderItems(initialCards);

// Добавление карточек

const popupAddCard = new PopupWithForm(elements.cardAddPopup, handleCardAddSubmit);

popupAddCard.setEventListeners();

cardAddButton.addEventListener("click", () => {
  formValidators["addcard"].resetValidation();
  popupAddCard.open();
});

function handleCardAddSubmit(data) {
  const card = createCard(data);
  renderCards.addItem(card);
}

// Редактирование профиля

const popupProfile = new PopupWithForm(elements.profileEditPopup, handleProfileEditSubmit);

popupProfile.setEventListeners();

const userInfo = new UserInfo(elements);

function handleProfileEditSubmit(data) {
  userInfo.setUserInfo(data);
}

buttonEditProfile.addEventListener("click", () => {
  formValidators["profile"].resetValidation();
  const info = userInfo.getUserInfo();
  popupProfile.setInputValues(info);
  popupProfile.open();
});

// Попап картинки

const popupImg = new PopupWithImage(elements.cardImagePopup);

popupImg.setEventListeners();

function handleCardClick(link, name) {
  popupImg.open(link, name);
}

// Валидация

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
