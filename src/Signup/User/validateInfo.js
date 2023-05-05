export default function validateInfo(values) {
    let errors = {};
  
    if (!(values.username.trim())) {
      errors.username = 'Username field is required';
    }
    // else if (!(/^[A-Z0-9._%+-]{2,}$/i.test(values.name.trim()))) {
    //   errors.name = 'Enter a valid name';
    // }
  
    if (!values.email) {
      errors.email = 'Email field is required';
    }
    else if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))) {
      errors.email = 'Email address is invalid';
    }

    if (!values.mobile) {
      errors.mobile = 'Mobile-No. required';
    } else if ((values.mobile.length < 10)||(values.mobile.length >15)) {
      errors.mobile = 'Mobile no. must have min. 10 digits and max. 15 digits ';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more';
    }
  
    if (!values.password2) {
      errors.password2 = 'Password is required';
    } else if (values.password2 !== values.password) {
      errors.password2 = 'Passwords do not match';
    }
    return errors;
  }