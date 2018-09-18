
export default class auctionUtil {
    static dateValidation(value) {
        let dateError = undefined;
        if (value === "") {
            dateError = "Date Not Valid";
        }
        else {

            var msecCurrentDate = Date.parse(new Date());
            var inputMsec = Date.parse(value);
            if (inputMsec < msecCurrentDate) {
                dateError = "Date Not Valid";
            }
        }

        return dateError;
    }
}