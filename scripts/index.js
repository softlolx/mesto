let popup = document.querySelector(".popup");
let editProfileButton = document.querySelector(".profile__edit-button");
let closePopupButton = document.querySelector(".popup__close-button");

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

editProfileButton.addEventListener("click", openPopup);
closePopupButton.addEventListener("click", closePopup);
