import StringUtil from './StringUtil';

export default class ValidationUtil {
    static isNameValid(value) {
        return StringUtil.isString(value) && !StringUtil.isEmptyString(value);
    }

    static validateEmail(value) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
    }

    static validatePassword(value) {
        var re = new RegExp("^(?=.*?[a-z])(?=.*?[0-9]).{6,}$"); //at least one number, one lower case English letter, min 6 length, special characters are allowed
        return re.test(String(value).toLowerCase());
    }
}