const elements = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__description",
  cardAddPopup: ".popup_content_add-card",
  profileEditPopup: ".popup_content_profile",
  cardImagePopup: ".popup_content_image",
};

const buttonEditProfile = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const cardsContainer = document.querySelector(".elements__grid");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export {
  initialCards,
  elements,
  buttonEditProfile,
  cardAddButton,
  nameInput,
  descriptionInput,
  cardsContainer,
};
