export class UserInfo {
  constructor({ userName, userInfo }) {
    this._userName = userName;
    this._userInfo = userInfo;
  }

  getUserInfo() {
    const userInfo = {
      name: this._userName.textContent,
      info: this._userInfo.textContent,
    };
    return userInfo;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.info;
  }
}
