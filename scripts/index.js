const profileEditPopup = document.querySelector(".popup_content_profile");
const cardAddPopup = document.querySelector(".popup_content_add-card");
const profileEditForm = document.querySelector(".popup__form_content_profile");
const cardAddForm = document.querySelector(".popup__form_content_add-card");
const cardAddLinkInput = document.querySelector(".popup__input_type_card-link");
const cardAddNameInput = document.querySelector(".popup__input_type_card-name");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editProfileButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const closePopupButton = document.querySelectorAll(".popup__close-button");
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
const cardTemplate = document.querySelector("#elements__card").content;

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function createCard(item) {
  const cardElement = cardTemplate
    .querySelector(".elements__card")
    .cloneNode(true);

  cardElement.querySelector(".elements__card-img").src = item.link;
  cardElement.querySelector(".elements__card-img").alt = item.name;
  cardElement.querySelector(".elements__card-title").textContent = item.name;

  cardElement
    .querySelector(".elements__card-like-button")
    .addEventListener("click", likeCard);
  cardElement
    .querySelector(".elements__card-delete-button")
    .addEventListener("click", deleteCard);
  cardElement
    .querySelector(".elements__card-img")
    .addEventListener("click", () => {
      openPopup(cardImagePopup);
      cardBigImage.src = item.link;
      cardBigImage.alt = `Фото ${item.name}.`;
      cardBigImageDescription.textContent = item.name;
    });

  return cardElement;
}

function renderCard(item) {
  const readyCard = createCard(item);
  cardsContainer.prepend(readyCard);
}

initialCards.forEach((item) => renderCard(item));

function cardAddSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardAddNameInput.value,
    link: cardAddLinkInput.value,
  };
  renderCard(newCard);
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
  profileEditForm.reset();
  nameInput.setAttribute("value", profileName.textContent);
  descriptionInput.setAttribute("value", profileDescription.textContent);
}

function likeCard(evt) {
  evt.target.classList.toggle("elements__card-like-button_active");
}

function deleteCard(evt) {
  evt.target.closest(".elements__card").remove();
}

editProfileButton.addEventListener("click", () => {
  openPopup(profileEditPopup);
  setInputValues();
});

cardAddButton.addEventListener("click", () => {
  openPopup(cardAddPopup);
});

closePopupButton.forEach((item) =>
  item.addEventListener("click", () => {
    const currentPopup = item.closest(".popup");
    closePopup(currentPopup);
  })
);

profileEditForm.addEventListener("submit", profileEditSubmitHandler);

cardAddForm.addEventListener("submit", cardAddSubmitHandler);
