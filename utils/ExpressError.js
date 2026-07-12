// class ExpressError extends Error {
//     constructor(statuscode, message){
//         super();
//         this.statuscode = statuscode;
//         this.message = message;
//     }
// }

class ExpressError extends Error {
    constructor(statuscode, message) {
        super(message); // ✅ pass the message to Error constructor
        this.statuscode = statuscode;
        this.name = "ExpressError"; // optional
    }
}


module.exports = ExpressError;