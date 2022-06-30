const cardsContainer = document.querySelector(".elements__grid");
class Card {
  constructor(data, templateSelector) {
    this._image = data.link;
    this._name = data.name;
    this._template = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".elements__card-img").src = this._image;
    this._element.querySelector(".elements__card-img").alt = this._image;
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
        console.log("im openpopup");
      });
  }
  //   cardElement
  //     .querySelector(".elements__card-img")
  //     .addEventListener("click", () => {
  //       openPopup(cardImagePopup);
  //       cardBigImage.src = item.link;
  //       cardBigImage.alt = `Фото ${item.name}.`;
  //       cardBigImageDescription.textContent = item.name;
  //     });
}

initialCards.forEach((item) => {
  const card = new Card(item, "#elements__card");
  const readyCard = card.createCard();

  cardsContainer.prepend(readyCard);
});
