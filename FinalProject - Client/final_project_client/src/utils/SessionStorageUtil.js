export default class SessionStorageUtil {
    static SaveLoggedUser(userLogged) {
        if (typeof (Storage) !== "undefined") {
            sessionStorage.setItem("userLogged", JSON.stringify(userLogged));
        } else {
            alert("No Web Storage support");
        }
    }

    static GetLoggedUser() {
        if (typeof (Storage) !== "undefined") {
            return JSON.parse(sessionStorage.getItem("userLogged"));
        } else {
            alert("No Web Storage support");
        }
    }

    static RemoveLoggedUser() {
        if (typeof (Storage) !== "undefined") {
            sessionStorage.removeItem("userLogged");
        } else {
            alert("No Web Storage support");
        }
    }
}