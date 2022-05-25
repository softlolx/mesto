const profileEditPopup = document.querySelector(".popup_content_profile");
const itemAddPopup = document.querySelector(".popup_content_add-item");
const profileEditForm = document.querySelector(".popup__form_content_profile");
const itemAddForm = document.querySelector(".popup__form_content_add-item");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editProfileButton = document.querySelector(".profile__edit-button");
const addItemButton = document.querySelector(".profile__add-button");
const closePopupButton = document.querySelectorAll(".popup__close-button");
const itemImage = document.querySelectorAll(".elements__item-img");
const itemImagePopup = document.querySelector(".popup_content_image");
const itemLikeButton = document.querySelectorAll(
  ".elements__item-like-button "
);
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description"
);

function openPopup(popup, form) {
  popup.classList.add("popup_opened");
  form.reset();
}

function closePopup(evt) {
  evt.target.parentElement.parentElement.classList.remove("popup_opened");
}

function setInputValues() {
  nameInput.setAttribute("value", profileName.innerText);
  descriptionInput.setAttribute("value", profileDescription.innerText);
}

function profileEditSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(evt);
}

function likeItem(evt) {
  evt.target.classList.toggle("elements__item-like-button_active");
}

editProfileButton.addEventListener("click", () => {
  openPopup(profileEditPopup, profileEditForm);
  setInputValues();
});
addItemButton.addEventListener("click", () => {
  openPopup(itemAddPopup, itemAddForm);
});
itemImage.forEach((item) =>
  item.addEventListener("click", () => {
    openPopup(itemImagePopup, itemAddForm);
  })
);
closePopupButton.forEach((item) => item.addEventListener("click", closePopup));
profileEditForm.addEventListener("submit", profileEditSubmitHandler);
itemLikeButton.forEach((item) => item.addEventListener("click", likeItem));

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
