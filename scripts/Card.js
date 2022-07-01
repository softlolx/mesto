import {
  cardImagePopup,
  cardBigImage,
  cardBigImageDescription,
  openPopup,
} from "./index.js";

//BEGINNING, TO IMPORT EVERYTHING ABOVE
export default class Card {
  constructor(link, name, templateSelector) {
    this._image = link;
    this._name = name;
    this._template = templateSelector;
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
    this._setEventListeners();

    this._element.querySelector(".elements__card-img").src = this._image;
    this._element.querySelector(".elements__card-img").alt = this._name;
    this._element.querySelector(".elements__card-title").textContent =
      this._name;

    return this._element;
  }

  _handleLikeCard() {
    this._element
      .querySelector(".elements__card-like-button")
      .classList.toggle("elements__card-like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleOpenImagePopup() {
    cardBigImage.src = this._image;
    cardBigImage.alt = `Фото ${this._name}.`;
    cardBigImageDescription.textContent = this._name;
    openPopup(cardImagePopup);
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__card-like-button")
      .addEventListener("click", () => {
        this._handleLikeCard();
      });

    this._element
      .querySelector(".elements__card-delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector(".elements__card-img")
      .addEventListener("click", () => {
        this._handleOpenImagePopup();
      });
  }
}
