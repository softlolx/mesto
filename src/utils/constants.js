const elements = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  userNameSelector: ".profile__name",
  userInfoSelector: ".profile__description",
  avatarSelector: ".profile__avatar-image",
  avatarPopup: ".popup_content_avatar",
  cardAddPopup: ".popup_content_add-card",
  profileEditPopup: ".popup_content_profile",
  cardImagePopup: ".popup_content_image",
  confirmationPopup: ".popup_content_confirmation",
};

const buttonChangeAvatar = document.querySelector(".profile__avatar-image");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const cardsContainer = document.querySelector(".elements__grid");

export {
  elements,
  buttonEditProfile,
  cardAddButton,
  nameInput,
  descriptionInput,
  cardsContainer,
  buttonChangeAvatar,
};
