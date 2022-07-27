export class UserInfo {
  constructor({ userNameSelector, userInfoSelector, avatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      about: this._userInfo.textContent,
      avatar: this._avatar.src,
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.about;
    this.setUserAvatar(data);
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
    this._avatar.alt = `${data.name} аватар`;
  }
}
