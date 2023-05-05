const validator = require('validator');
const isEmpty = require('./is-empty');

const validatePost = data => {

    const errors = {};
    data.text = ((!isEmpty(data.text))?data.text:'');
    
    if(!validator.isLength(data.text, { min: 10, max: 300 })){
        errors.text = 'A Post must contain atleast 10 and maximum 300 characters'
    }
    if(validator.isEmpty(data.text)){
        errors.text = "The post field can't be empty"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validatePost