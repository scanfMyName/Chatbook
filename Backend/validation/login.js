const validator = require('validator');
const isEmpty = require('./is-empty');

const validateOldUser = (data) =>{

    console.log(data);
    
    const errors = {};
    data.email = ((!isEmpty(data.email))?data.email:'');
    data.password = ((!isEmpty(data.password))?data.password:'');
    if(!validator.isLength(data.password, { min:6, max:30 })){
        errors.password = 'Password field must contain minimum 6 and maximum 30 characters'
    }
    if(validator.isEmpty(data.password)){
        errors.password = 'Password field is required'
    }
    if(!validator.isEmail(data.email)){
        errors.email = 'Email is invalid'
    }
    if(validator.isEmpty(data.email)){
        errors.email = 'Email field is required'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateOldUser