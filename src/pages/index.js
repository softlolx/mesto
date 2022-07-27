import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import "./index.css";

import { elements, buttonEditProfile, cardAddButton, cardsContainer } from "../utils/constants.js";

// Создание карточек

let userId;

function createCard(data) {
  const card = new Card(
    {
      name: data.name,
      link: data.link,
      likes: data.likes,
      userId: userId,
      ownerId: data.owner._id,
    },
    "#elements__card",
    handleCardClick
  );
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

// Добавление карточек

const popupAddCard = new PopupWithForm(elements.cardAddPopup, handleCardAddSubmit);

popupAddCard.setEventListeners();

cardAddButton.addEventListener("click", () => {
  formValidators["addcard"].resetValidation();
  popupAddCard.open();
});

function handleCardAddSubmit(data) {
  api.addNewCard(data).then((res) => {
    const card = createCard({ name: res.name, link: res.link });
    renderCards.addItem(card);
  });
}

// Удаление карточек

// Редактирование профиля

const popupProfile = new PopupWithForm(elements.profileEditPopup, handleProfileEditSubmit);

popupProfile.setEventListeners();

const userInfo = new UserInfo(elements);

function handleProfileEditSubmit(data) {
  api.setUserInfo(data).then((res) => userInfo.setUserInfo(res));
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

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-47",
  headers: {
    authorization: "0fb97600-e542-48f7-932b-9df7c5fc21d8",
    "Content-Type": "application/json",
  },
});

api.getUserInfo().then((userData) => {
  {
    userId = userData._id;

    userInfo.setUserInfo(userData);
  }
});

api.getInitialCards().then((data) => renderCards.renderItems(data.reverse()));
