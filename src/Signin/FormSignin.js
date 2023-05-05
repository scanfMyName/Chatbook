import React, { useEffect } from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import './Signin.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';

const FormSignin = (props) => {
  const { handleChange, handleSubmit, values, errors, setErrors } = useForm(
    submitForm,
    validate
  );
  function submitForm(values) {
  props.loginUser(values);
  }
  useEffect(() => {
    if(props.errors){
      
      setErrors(props.errors)
    }
    else if(props.auth.isAuthenticated){
      console.log("After the authentication going to the dashboard"); 
      props.history.push('/Dashboard');
    }
    return null;
  }, [props]);
  return (
    <div className='form1-content'>
      <form onSubmit={handleSubmit} className='form1' noValidate>
        <h1>
          Let's get started with chatbook by login to your account
        </h1>
        <div className='form1-inputs'>
          <label className='form1-label'>Email</label>
          <input
            className='form1-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='form1-inputs'>
          <label className='form1-label'>Password</label>
          <input
            className='form1-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button className='form1-input-btn' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
};
FormSignin.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {loginUser}) (FormSignin); 