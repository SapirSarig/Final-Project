
export default class auctionUtil {
    static dateValidation(value) {
        let dateError = undefined;
        if (value === "") {
            dateError = "Date Not Valid";
        }
        else {
            let currDate = new Date();
            currDate.setHours(0,0,0,0);
            let givenDate = new Date(value);
            if (givenDate < currDate) {
                dateError = "Date Not Valid";
            }
        }

        // if (value === "") {
        //     dateError = "Date Not Valid";
        // }
        // else {

        //     var msecCurrentDate = Date.parse(new Date());
        //     var inputMsec = Date.parse(value);
        //     if (inputMsec < msecCurrentDate) {
        //         dateError = "Date Not Valid";
        //     }
        // }

        return dateError;
    }

    static endDateValidation(startDate, endDate){
        let dateError = auctionUtil.dateValidation(endDate);
        if (dateError === undefined){
            let startDateVal = new Date(startDate);
            let endDateVal = new Date(endDate);
            if(endDate < startDate){
                dateError = "Date Not Valid";
            }
        }
        return dateError;
    }

    static isNegativeNum(value){
        let num = parseInt(value);
        if(num<0){
            return "Value not valid";
        }
        return undefined;
    }
}