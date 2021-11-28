const Validator = require('validator');
const isEmpty = require('./isEmpty');


const validateAddQuizInput = (data) => {
    let errors = {}
    data.facultyRegistrationNumber = !isEmpty(data.facultyRegistrationNumber) ? data.facultyRegistrationNumber : '';
    data.facultyName = !isEmpty(data.facultyName) ? data.facultyName : '';
    data.department = !isEmpty(data.department) ? data.department : '';
    data.purpose = !isEmpty(data.purpose) ? data.purpose : '';
    data.semester = !isEmpty(data.semester) ? data.semester : '';
    data.subjectCode = !isEmpty(data.subjectCode) ? data.subjectCode : '';
    

    if (Validator.isEmpty(data.facultyRegistrationNumber)) {
        errors.facultyRegistrationNumber = 'faculty registration number field is required';
    }
    if (Validator.isEmpty(data.facultyName)) {
        errors.facultyName = 'faculty name field is required';
    }

    if (Validator.isEmpty(data.department)) {
        errors.department = 'Department field is required';
    }

    if (Validator.isEmpty(data.purpose)) {
        errors.purpose = 'purpose field is required';
    }

    if (Validator.isEmpty(data.semester)) {
        errors.semester = 'semester field is required';
    }
    if (Validator.isEmpty(data.subjectCode)) {
        errors.subjectCode = 'subject code field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}


module.exports = validateAddQuizInput