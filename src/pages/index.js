import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";

import {
  initialCards,
  elements,
  profileEditPopup,
  cardAddPopup,
  profileEditForm,
  cardAddForm,
  cardAddLinkInput,
  cardAddNameInput,
  profileName,
  profileDescription,
  buttonEditProfile,
  cardAddButton,
  closeButtons,
  cardImagePopup,
  cardBigImage,
  cardBigImageDescription,
  nameInput,
  descriptionInput,
  cardsContainer,
} from "../utils/constants.js";
import { PopupWithImage } from "../components/PopupWithImage.js";

// Открытие и закрытие попапов

// function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   popup.addEventListener("mousedown", closePopupByOverlay);
//   document.addEventListener("keydown", closePopupByEsc);
// }

// function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   popup.removeEventListener("mousedown", closePopupByOverlay);
//   document.removeEventListener("keydown", closePopupByEsc);
// }

// function closePopupByOverlay(evt) {
//   if (evt.target == evt.currentTarget) {
//     closePopup(evt.target);
//   }
// }

// function closePopupByEsc(evt) {
//   if (evt.key == "Escape") {
//     const currentPopup = document.querySelector(".popup_opened");
//     closePopup(currentPopup);
//   }
// }

// Универсальная функция создания карточки

function createCard(cardElement) {
  const card = new Card(cardElement, "#elements__card", handleCardClick);
  return card.generateCard();
}

// Создание начальных 6 карточек

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

// Обработчики действий с формами и кликов по карточке

function handleCardAddSubmit(evt) {
  evt.preventDefault();
  const readyCard = createCard({ link: cardAddLinkInput.value, name: cardAddNameInput.value });
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
  const card = new PopupWithImage(cardImagePopup);
  card.open(link, name);
  card.setEventListeners();
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

// closeButtons.forEach((item) => {
//   const currentPopup = item.closest(".popup");
//   item.addEventListener("click", () => {
//     closePopup(currentPopup);
//   });
// });

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

renderCards.renderItems();
