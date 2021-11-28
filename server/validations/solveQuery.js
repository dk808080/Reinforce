const Validator = require('validator');
const isEmpty = require('./isEmpty');


const validateSolveQueryInput = (data) => {
    let errors = {}
    data.queryId = !isEmpty(data.queryId) ? data.queryId : '';
    data.solutions = !isEmpty(data.solutions) ? data.solutions : '';

    if (Validator.isEmpty(data.queryId)) {
        errors.queryId = 'Query Id field is required';
    }
    if (Validator.isEmpty(data.solution)) {
        errors.solution = 'Solution field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateSolveQueryInput