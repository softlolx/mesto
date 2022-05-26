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

const profileEditPopup = document.querySelector(".popup_content_profile");
const itemAddPopup = document.querySelector(".popup_content_add-item");
const profileEditForm = document.querySelector(".popup__form_content_profile");
const itemAddForm = document.querySelector(".popup__form_content_add-item");
const itemAddLinkInput = document.querySelector(".popup__input_type_item-link");
const itemAddNameInput = document.querySelector(".popup__input_type_item-name");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editProfileButton = document.querySelector(".profile__edit-button");
const addItemButton = document.querySelector(".profile__add-button");
const closePopupButton = document.querySelectorAll(".popup__close-button");
const itemImagePopup = document.querySelector(".popup_content_image");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description"
);
const itemsContainer = document.querySelector(".elements__grid");

initialCards.forEach((item) => createItems(item));
function createItems(item) {
  const itemTemplate = document.querySelector("#elements__item").content;
  const itemElement = itemTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
  itemElement.querySelector(".elements__item-img").src = item.link;
  itemElement.querySelector(".elements__item-img").alt = item.name;
  itemElement.querySelector(".elements__item-title").textContent = item.name;
  itemsContainer.prepend(itemElement);

  addCardListeners();
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function itemImagePopupHandler(evt) {
  document.querySelector(".popup__image").src = evt.src;
  document.querySelector(".popup__image-caption").textContent = evt.alt;
}

function itemAddSubmitHandler(evt) {
  evt.preventDefault();
  const itemTemplate = document.querySelector("#elements__item").content;
  const itemElement = itemTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
  itemElement.querySelector(".elements__item-img").src = itemAddLinkInput.value;
  itemElement.querySelector(".elements__item-img").alt = itemAddNameInput.value;
  itemElement.querySelector(".elements__item-title").textContent =
    itemAddNameInput.value;
  itemsContainer.prepend(itemElement);
  itemAddForm.reset();
  addCardListeners();

  closePopup(evt);
}

function closePopup(evt) {
  evt.target.closest(".popup").classList.remove("popup_opened");
}

function setInputValues() {
  profileEditForm.reset();
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

function deleteItem(evt) {
  evt.target.closest(".elements__item").remove();
}

function addCardListeners() {
  const itemLikeButton = document.querySelectorAll(
    ".elements__item-like-button"
  );
  itemLikeButton.forEach((element) =>
    element.addEventListener("click", likeItem)
  );
  const itemDeleteButton = document.querySelectorAll(
    ".elements__item-delete-button"
  );
  itemDeleteButton.forEach((element) =>
    element.addEventListener("click", deleteItem)
  );
  const itemImage = document.querySelectorAll(".elements__item-img");
  itemImage.forEach((element) =>
    element.addEventListener("click", () => {
      openPopup(itemImagePopup);
      itemImagePopupHandler(element);
    })
  );
}

editProfileButton.addEventListener("click", () => {
  openPopup(profileEditPopup);
  setInputValues();
});
addItemButton.addEventListener("click", () => {
  openPopup(itemAddPopup);
});
closePopupButton.forEach((item) => item.addEventListener("click", closePopup));
profileEditForm.addEventListener("submit", profileEditSubmitHandler);

itemAddForm.addEventListener("submit", itemAddSubmitHandler);
