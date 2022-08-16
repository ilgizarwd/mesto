export default class UserInfo {
    constructor({title, role}) {
        this._formTitle = title;
        this._formRole = role;
    }
    getUserInfo() {
      const userInfo = {
        title: this._formTitle.textContent,
        role: this._formRole.textContent,
      };

      return userInfo;
    }
    setUserInfo(title, role) {
      this._formTitle.textContent = title.value;
      this._formRole.textContent = role.value;
    }
}
