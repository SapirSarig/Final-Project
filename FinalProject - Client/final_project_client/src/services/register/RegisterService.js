import StringUtil from '../../utils/StringUtil';
import ValidationUtil from '../../utils/ValidationUtil';

export default class RegisterService {
    static nameValidation(value) {
        let nameError = undefined;
        if (!ValidationUtil.isNameValid(value)) {
            nameError = "Name Not Valid";
        }
        else if (StringUtil.hasNumber(value)) {
            nameError = "Please don't use numbers";
        }
        return nameError;
    }

    static emailValidation(value) {
        let emailError = undefined;
        if (!ValidationUtil.validateEmail(value)) {
            emailError = "Wrong Email Format";
        }
        return emailError;
    }

    static passwordValidation(value) {
        let passwordError = undefined;
        if (!ValidationUtil.validatePassword(value)) {
            passwordError = "Password Not Valid";
        }
        return passwordError;
    }


    static confirmValidation(newValue, exsistingValue) {
        let confirmPasswordError = undefined;
        if (StringUtil.isEmptyString(exsistingValue) || newValue !== exsistingValue) {
            confirmPasswordError = "Values don't match";
        }
        return confirmPasswordError;
    }

    static checkIfHaveErrors(errors) {
        let isValidInputs = true;
        for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
                if (errors[key]) {
                    isValidInputs = false;
                }
            }
        }

        return isValidInputs;
    }


}