const Validator = require('validator');
const isEmpty = require('./isEmpty');


const validateSubmitQueryInput = (data) => {
    let errors = {}
    data.askedBy = !isEmpty(data.askedBy) ? data.askedBy : '';
    data.askedTo = !isEmpty(data.askedTo) ? data.askedTo : '';
    data.recipient= !isEmpty(data.recipient) ? data.recipient: '';
    data.body = !isEmpty(data.body) ? data.body : '';
    data.title= !isEmpty(data.title) ? data.title: '';

    if (Validator.isEmpty(data.askedBy)) {
        errors.askedBy = 'Registration number of sender field is required';
    }
    if (Validator.isEmpty(data.askedTo)) {
        errors.askedTo = 'Registration number of recipient field is required';
    }

    if (Validator.isEmpty(data.recipient)) {
        errors.recipient = 'Recipient field is required';
    }
    if (Validator.isEmpty(data.title)) {
        errors.title = 'Title is required';
    }

    if (Validator.isEmpty(data.body)) {
        errors.body= 'Body field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateSubmitQueryInput