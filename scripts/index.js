import Card from "./Card.js";
import { initialCards } from "./cards.js";
import { FormValidator } from "./FormValidator.js";

const formList = Array.from(document.querySelectorAll(".popup__form"));
const submitButton = document.querySelectorAll(".popup__submit-button");
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
const buttonClosePopup = document.querySelectorAll(".popup__close-button");
const cardImagePopup = document.querySelector(".popup_content_image");
const cardBigImage = cardImagePopup.querySelector(".popup__image");
const cardBigImageDescription = cardImagePopup.querySelector(
  ".popup__image-caption"
);
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description"
);

const cardsContainer = document.querySelector(".elements__grid");

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

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", closePopupByOverlay);
  document.addEventListener("keydown", closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  disableSubmitButton();
}

function renderCard(item) {
  const cardReady = createCard(item);
  cardsContainer.prepend(cardReady);
}

function cardAddSubmitHandler(evt) {
  evt.preventDefault();
  const card = new Card(
    cardAddLinkInput.value,
    cardAddNameInput.value,
    "#elements__card"
  );
  const readyCard = card.generateCard();
  cardsContainer.prepend(readyCard);
  cardAddForm.reset();
  closePopup(cardAddPopup);
}

function profileEditSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(profileEditPopup);
}

function setInputValues() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function disableSubmitButton() {
  Array.from(submitButton).forEach((item) => {
    item.classList.add("popup__submit-button_disabled");
    item.setAttribute("disabled", "");
  });
}

buttonEditProfile.addEventListener("click", () => {
  openPopup(profileEditPopup);
  setInputValues();
});

cardAddButton.addEventListener("click", () => {
  openPopup(cardAddPopup);
});

buttonClosePopup.forEach((item) =>
  item.addEventListener("click", () => {
    const currentPopup = item.closest(".popup");
    closePopup(currentPopup);
  })
);

profileEditForm.addEventListener("submit", profileEditSubmitHandler);

cardAddForm.addEventListener("submit", cardAddSubmitHandler);

initialCards.forEach((item) => {
  const card = new Card(item.link, item.name, "#elements__card");
  const readyCard = card.generateCard();
  cardsContainer.prepend(readyCard);
});

export const elements = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

formList.forEach((item) => {
  const form = new FormValidator(elements, item);
  form.enableValidation();
});

export {
  cardsContainer,
  cardImagePopup,
  cardBigImage,
  cardBigImageDescription,
  openPopup,
  renderCard,
};
