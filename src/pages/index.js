import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import "./index.css";

import {
  elements,
  buttonEditProfile,
  cardAddButton,
  cardsContainer,
  buttonChangeAvatar,
} from "../utils/constants.js";

// Создание карточек

function createCard(data) {
  const card = new Card(
    {
      name: data.name,
      link: data.link,
      likes: data.likes,
      userId: userId,
      ownerId: data.owner._id,
      id: data._id,
    },
    "#elements__card",
    handleCardClick,

    //DELETE
    () => {
      popupConfirmation.open(card);
    },
    //LIKE
    async () => {
      try {
        const res = await api.addLike(data._id);
        card.addLike();
        card.setLikeQty(res);
      } catch (e) {
        console.log(e);
      }
    },
    //DISLIKE
    async () => {
      try {
        const res = api.removeLike(data._id);
        card.removeLike();
        card.setLikeQty(res);
      } catch (e) {
        console.log(e);
      }
    }
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

async function handleCardAddSubmit(data) {
  popupAddCard.renderLoading(true, "Сохранение...");
  try {
    const res = await api.addNewCard(data);
    const card = createCard(res);
    renderCards.addItem(card);
    popupAddCard.close();
  } catch (e) {
    console.log(e);
  } finally {
    popupAddCard.renderLoading(false);
  }
}

// function handleCardAddSubmit(data) {
//   popupAddCard.renderLoading(true, "Сохранение...");
//   api
//     .addNewCard(data)
//     .then((res) => {
//       const card = createCard(res);
//       renderCards.addItem(card);
//       popupAddCard.close();
//     })
//     .catch((e) => console.log(e))
//     .finally(() => popupAddCard.renderLoading(false));
// }

// Удаление карточек

const popupConfirmation = new PopupWithConfirmation(elements.confirmationPopup, async (card) => {
  try {
    await api.deleteCard(card._id);
    card.deleteCard();
    popupConfirmation.close();
  } catch (e) {
    console.log(e);
  }
});

popupConfirmation.setEventListeners();

// Редактирование профиля

const popupProfile = new PopupWithForm(elements.profileEditPopup, handleProfileEditSubmit);

popupProfile.setEventListeners();

const userInfo = new UserInfo(elements);

async function handleProfileEditSubmit(data) {
  popupProfile.renderLoading(true, "Сохранение...");
  try {
    const res = await api.setUserInfo(data);
    userInfo.setUserInfo(res);
    popupProfile.close();
  } catch (e) {
    console.log(e);
  } finally {
    popupProfile.renderLoading(false);
  }
}

// function handleProfileEditSubmit(data) {
//   popupProfile.renderLoading(true, "Сохранение...");
//   api
//     .setUserInfo(data)
//     .then((res) => {
//       userInfo.setUserInfo(res);
//       popupProfile.close();
//     })
//     .catch((e) => console.log(e))
//     .finally(() => popupProfile.renderLoading(false));
// }

buttonEditProfile.addEventListener("click", () => {
  formValidators["profile"].resetValidation();
  const info = userInfo.getUserInfo();
  popupProfile.setInputValues(info);
  popupProfile.open();
});

// Смена аватарки

const avatarPopup = new PopupWithForm(elements.avatarPopup, handleChangeAvatarSubmit);

avatarPopup.setEventListeners();

async function handleChangeAvatarSubmit(data) {
  avatarPopup.renderLoading(true, "Сохранение...");
  try {
    const res = await api.changeAvatar(data);
    userInfo.setUserAvatar(res);
    avatarPopup.close();
  } catch (e) {
    console.log(e);
  } finally {
    avatarPopup.renderLoading(false);
  }
}

// function handleChangeAvatarSubmit(data) {
//   avatarPopup.renderLoading(true, "Сохранение...");
//   api
//     .changeAvatar(data)
//     .then((res) => {
//       userInfo.setUserAvatar(res);
//       avatarPopup.close();
//     })
//     .catch((e) => console.log(e))
//     .finally(() => avatarPopup.renderLoading(false));
// }

buttonChangeAvatar.addEventListener("click", () => {
  avatarPopup.open();
  formValidators["avatar"].resetValidation();
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

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);

    renderCards.renderItems(cards.reverse());
  })
  .catch((e) => console.log(e));
