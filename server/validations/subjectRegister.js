const Validator = require('validator');
const isEmpty = require('./isEmpty');


const validateSubjectRegisterInput = (data) => {
    let errors = {}
    data.subjectName = !isEmpty(data.subjectName) ? data.subjectName : '';
    data.subjectCode = !isEmpty(data.subjectCode) ? data.subjectCode : '';
    data.year = !isEmpty(data.year) ? data.year : '';
    data.semester = !isEmpty(data.semester) ? data.semester : '';
    data.department = !isEmpty(data.department) ? data.department : '';

    if (Validator.isEmpty(data.subjectName)) {
        errors.subjectName = ' Subject Name field is required';
    }

    if (Validator.isEmpty(data.subjectCode)) {
        errors.subjectCode = 'Subject Code field is required';
    }

    if (Validator.isEmpty(data.year)) {
        errors.year = 'Year field is required';
    }

    if (Validator.isEmpty(data.department)) {
        errors.department = 'Department field is required';
    }

    if (Validator.isEmpty(data.semester)) {
        errors.semester = 'Semester field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateSubjectRegisterInput