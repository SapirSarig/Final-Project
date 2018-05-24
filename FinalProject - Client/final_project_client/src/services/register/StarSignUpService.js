export default class StarSignUpService {
    
    static dateValidation(value) {
        let dateError = undefined;
        var msecCurrentDate = Date.parse(new Date());
        var inputMsec = Date.parse(value);
        if(inputMsec > msecCurrentDate){
            dateError = "Date Not Valid";
        }
        return dateError;
    }
}