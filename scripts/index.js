let popup = document.querySelector(".popup");
let profileEditForm = document.querySelector(".popup__form");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let editProfileButton = document.querySelector(".profile__edit-button");
let closePopupButton = document.querySelector(".popup__close-button");
let nameInput = document.querySelector(".popup__input_type_name");
let descriptionInput = document.querySelector(".popup__input_type_description");

function openPopup() {
  popup.classList.add("popup_opened");
  profileEditForm.reset();
  nameInput.setAttribute("value", profileName.innerText);
  descriptionInput.setAttribute("value", profileDescription.innerText);
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup();
}

editProfileButton.addEventListener("click", openPopup);
closePopupButton.addEventListener("click", closePopup);
closePopupButton.addEventListener("keydown", closePopup);
profileEditForm.addEventListener("submit", formSubmitHandler);
