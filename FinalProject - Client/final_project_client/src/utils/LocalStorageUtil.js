import SessionStorageUtil from './SessionStorageUtil';

export default class LocalStorageUtil {
    static SaveLoggedUser(userLogged) {
        if (typeof (Storage) !== "undefined") {
            SessionStorageUtil.RemoveLoggedUser();
            this.RemoveLoggedUser();
            localStorage.setItem("userLogged", JSON.stringify(userLogged));
        } else {
            alert("No Web Storage support");
        }
    }

    static GetLoggedUser() {
        if (typeof (Storage) !== "undefined") {
            return JSON.parse(localStorage.getItem("userLogged"));
        } else {
            alert("No Web Storage support");
        }
    }

    static RemoveLoggedUser() {
        if (typeof (Storage) !== "undefined") {
            localStorage.removeItem("userLogged");
        } else {
            alert("No Web Storage support");
        }
    }
}