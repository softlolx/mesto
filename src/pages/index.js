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
  profileEditPopup,
  cardAddPopup,
  profileName,
  profileDescription,
  buttonEditProfile,
  cardAddButton,
  cardImagePopup,
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
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      renderCards.addItem(card);
    },
  },
  cardsContainer
);

renderCards.renderItems();

// Добавление карточек

const popupAddCard = new PopupWithForm(cardAddPopup, handleCardAddSubmit);

popupAddCard.setEventListeners();

cardAddButton.addEventListener("click", () => {
  formValidators["addcard"].resetValidation();
  popupAddCard.open();
});

function handleCardAddSubmit(data) {
  const card = createCard(data);
  renderCards.addItem(card);
}

// Попап картинки

const popupImg = new PopupWithImage(cardImagePopup);

popupImg.setEventListeners();

function handleCardClick(link, name) {
  popupImg.open(link, name);
}

//Редактирование профиля

const popupProfile = new PopupWithForm(profileEditPopup, handleProfileEditSubmit);

popupProfile.setEventListeners();

const userInfo = new UserInfo(elements);

function setInputValues({ name, info }) {
  nameInput.value = name;
  descriptionInput.value = info;
}

function handleProfileEditSubmit(data) {
  userInfo.setUserInfo(data);
}

buttonEditProfile.addEventListener("click", () => {
  formValidators["profile"].resetValidation();
  const info = userInfo.getUserInfo();
  setInputValues(info);
  popupProfile.open();
});

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
