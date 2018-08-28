export default class StringUtil {
    static isEmptyString(value){
       return value == undefined || !value.trim();
    }

    static isString(value) {
        return value && typeof value.trim() === 'string' || value.trim() instanceof String;
    }
    
    static hasNumber(value) {
        return /\d/.test(value);
    }
      
}