export class Card {
  constructor(initialCards, templateSelector, handleCardClick) {
    this._link = initialCards.link;
    this._name = initialCards.name;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".elements__card-like-button");
    this._cardImage = this._element.querySelector(".elements__card-img");
    this._cardTitle = this._element.querySelector(".elements__card-title");
    this._deleteButton = this._element.querySelector(".elements__card-delete-button");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _handleLikeCard() {
    this._likeButton.classList.toggle("elements__card-like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }
}
