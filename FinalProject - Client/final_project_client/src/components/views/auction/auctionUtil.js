
export default class auctionUtil {
    static dateValidation(value) {
        let dateError = undefined;
        if (value === "") {
            dateError = "Date Not Valid";
        }
        else {
            let currDate = new Date();
            let givenDate = new Date(value);
            let m1 = givenDate.getTime();
            let m2 = currDate.getTime();
            if (m1 < m2) {
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
}