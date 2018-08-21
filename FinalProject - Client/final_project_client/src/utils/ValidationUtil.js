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

    static validateLink(value) {
        //var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
        return regex.test(String(value).toLowerCase());
    }
    
}