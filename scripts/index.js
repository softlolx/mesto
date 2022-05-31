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
const itemBigImage = itemImagePopup.querySelector(".popup__image");
const itemBigImageDescription = itemImagePopup.querySelector(".popup__image-caption");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const itemsContainer = document.querySelector(".elements__grid");
const itemTemplate = document.querySelector("#elements__item").content;

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function createItem(item) {
  const itemElement = itemTemplate
  .querySelector(".elements__item")
  .cloneNode(true);

  itemElement.querySelector(".elements__item-img").src = item.link;
  itemElement.querySelector(".elements__item-img").alt = item.name;
  itemElement.querySelector(".elements__item-title").textContent = item.name;

  itemElement.querySelector(".elements__item-like-button").addEventListener("click", likeItem);
  itemElement.querySelector(".elements__item-delete-button").addEventListener("click", deleteItem);
  itemElement.querySelector(".elements__item-img").addEventListener("click", () => {
    openPopup(itemImagePopup);
    itemBigImage.src = item.link;
    itemBigImage.alt = `Фото ${item.name}.`;
    itemBigImageDescription.textContent = item.name;   
  });
  
  return itemElement;
}

function renderItem(item) {
  const readyItem = createItem(item);
  itemsContainer.prepend(readyItem);  
}

initialCards.forEach((item) => renderItem(item));

function itemAddSubmitHandler(evt) {
  evt.preventDefault();
  const newItem = {
    name: itemAddNameInput.value,
    link: itemAddLinkInput.value,
  }
  renderItem(newItem);  
  itemAddForm.reset();
  closePopup(itemAddPopup);
}

function profileEditSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(profileEditPopup);
}

function setInputValues() {
  profileEditForm.reset();
  nameInput.setAttribute("value", profileName.textContent);
  descriptionInput.setAttribute("value", profileDescription.textContent);
}

function likeItem(evt) {
  evt.target.classList.toggle("elements__item-like-button_active");
}

function deleteItem(evt) {
  evt.target.closest(".elements__item").remove();
}

editProfileButton.addEventListener("click", () => {
  openPopup(profileEditPopup);
  setInputValues();
});

addItemButton.addEventListener("click", () => {openPopup(itemAddPopup);});

closePopupButton.forEach((item) => item.addEventListener("click", () => {
  const currentPopup = item.closest(".popup")
  closePopup(currentPopup)}));

profileEditForm.addEventListener("submit", profileEditSubmitHandler);

itemAddForm.addEventListener("submit", itemAddSubmitHandler);
