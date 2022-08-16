export default class UserInfo {
    constructor(formTitle, formRole) {
        this._formTitle = formTitle
        this._formRole = formRole
        console.log(this._formTitle.textContent)
    }
    getUserInfo() {
console.log(this._formTitle.textContent)
    }
    setUserInfo() {

    }
}