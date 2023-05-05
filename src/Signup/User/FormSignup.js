import React, { useEffect } from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import './../Form.css';
import { connect } from 'react-redux';
import { registerUser } from "../../actions/authActions";
import PropsTypes from "prop-types";
import { withRouter } from "react-router-dom";

const FormSignup = (props) => {
  const { handleChange, handleSubmit, values, errors, setErrors } = useForm(
    submitForm,
    validate
  );
  function submitForm(values) {
    props.registerUser(values, props.history)}
    useEffect(() => {
      if(props.auth.isAuthenticated){
        props.history.push('/Dashboard');
      }
        if(props.errors){
          setErrors(props.errors)
        }
          return null;
    }, [props]);
    
  return (
    <div className='form-content'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Get started with us today! Create your account by filling out the
          information below.
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Username</label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Enter your username'
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Mobile-No.</label>
          <input
            className='form-input'
            type='number'
            name='mobile'
            placeholder='Enter your Mobile-No.'
            value={values.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <p>{errors.mobile}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Email</label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Enter your email'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Confirm Password</label>
          <input
            className='form-input'
            type='password'
            name='password2'
            placeholder='Confirm your password'
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button className='form-input-btn' type='submit'>
          Sign up
        </button>
      </form>
    </div>
  );
}

FormSignup.propTypes = {
  registerUser: PropsTypes.func.isRequired,
  auth: PropsTypes.object.isRequired,
  errors: PropsTypes.object.isRequired,

}
const mapStateToProps =(state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {registerUser}) (withRouter(FormSignup));