export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteCard,
    handleLike,
    handleDislike
  ) {
    this._link = data.link;
    this._name = data.name;
    this._id = data.id;
    this._likes = data.likes;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeAdd = handleLike;
    this._handleLikeRemove = handleDislike;
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
    this._likeCounter = this._element.querySelector(".elements__card-like-counter");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._likeCounter.textContent = `${this._likes.length}`;
    this._isLiked();
    this._setEventListeners();
    this.isOwner();
    return this._element;
  }

  isOwner() {
    if (this._userId !== this._ownerId) {
      this._deleteButton.remove();
      this._deleteButton = null;
    }
  }

  _isLiked() {
    this._likes.forEach((user) => {
      if (user._id === this._userId) {
        this.addLike();
      } else {
        this.removeLike();
      }
    });
  }

  addLike() {
    this._likeButton.classList.add("elements__card-like-button_active");
  }

  removeLike() {
    this._likeButton.classList.remove("elements__card-like-button_active");
  }

  setLikeQty(res) {
    this._likeCounter.textContent = `${res.likes.length}`;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.contains("elements__card-like-button_active")
        ? this._handleLikeRemove()
        : this._handleLikeAdd();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this._id);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }
}
