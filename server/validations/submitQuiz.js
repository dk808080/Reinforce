const Validator = require('validator');
const isEmpty = require('./isEmpty');


const validateSubmitQuizInput = (data) => {
    let errors = {}
    data.score = !isEmpty(data.score) ? data.score : '';
    data.quizId = !isEmpty(data.quizId) ? data.quizId : '';
    data.totalMarks = !isEmpty(data.totalMarks) ? data.totalMarks : '';

    if (Validator.isEmpty(data.score)) {
        errors.score = 'score field is required';
    }

    if (Validator.isEmpty(data.quizId)) {
        errors.quizId = 'Quiz Id field is required';
    }

    if (Validator.isEmpty(data.totalMarks)) {
        errors.totalMarks = 'Quiz Id field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateSubmitQuizInput