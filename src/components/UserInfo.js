export class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      about: this._userInfo.textContent,
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.about;
  }
}
