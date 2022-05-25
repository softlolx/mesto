const profileEditPopup = document.querySelector(".popup_content_profile");
const itemAddPopup = document.querySelector(".popup_content_add-item");
const profileEditForm = document.querySelector(".popup__form_content_profile");
const itemAddForm = document.querySelector(".popup__form_content_add-item");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editProfileButton = document.querySelector(".profile__edit-button");
const addItemButton = document.querySelector(".profile__add-button");
const closePopupButton = document.querySelector(".popup__close-button");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description"
);

function openPopup(popup, form) {
  popup.classList.add("popup_opened");
  form.reset();
  nameInput.setAttribute("value", profileName.innerText);
  descriptionInput.setAttribute("value", profileDescription.innerText);
}

function closePopup() {
  profileEditPopup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup();
}

editProfileButton.addEventListener("click", () => {
  openPopup(profileEditPopup, profileEditForm);
});
addItemButton.addEventListener("click", () => {
  openPopup(itemAddPopup);
});
closePopupButton.addEventListener("click", closePopup);
profileEditForm.addEventListener("submit", formSubmitHandler);
