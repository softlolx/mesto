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
};
