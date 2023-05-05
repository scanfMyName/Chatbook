const validator = require('validator');
const isEmpty = require('./is-empty');

const validateNewUser = (data) =>{

    const errors = {};
    data.username = (!isEmpty(data.username))? data.username:'';
    data.email = (!isEmpty(data.email))? data.email:'';
    data.mobile = (!isEmpty(data.mobile))? data.mobile:'';
    data.password = (!isEmpty(data.password))? data.password:'';
    data.password2 = (!isEmpty(data.password2))? data.password2:'';

    if(!validator.isEmail(data.email)){
        errors.email = 'Email is invalid'
    }
    if(validator.isEmpty(data.email)){
        errors.email = 'Email field is required'
    }
    if(!validator.isLength(data.username, { min:2, max:30 })){
        errors.username = 'Name must between 2 and 30 characters'
    }
    if(validator.isEmpty(data.username.trim())){
        errors.username = 'Username required'
    }
    
    if(!validator.isLength(data.mobile, { min:10, max:15 })){
        errors.mobile = 'Mobile no. must have minimum 10 and maximum 15 digits'
    }
    if(!validator.isNumeric(data.mobile)){
        errors.mobile = 'Mobile no. must contain only numeric character'
    }
    if(validator.isEmpty(data.mobile)){
        errors.mobile = 'Mobile no. field is required'
    }
    if(!validator.isLength(data.password, { min:6, max:30 })){
        errors.password = 'Password field must contain minimum 6 and maximum 30 characters'
    }
    if(validator.isEmpty(data.password)){
        errors.password = 'Password field is required'
    }
    

    if(validator.isEmpty(data.password2)){
        errors.password2 = 'Confirm Password field is required'
    }
    if(!validator.equals(data.password, data.password2)){
        errors.password2 = 'Passwords do not match'
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
module.exports = validateNewUser