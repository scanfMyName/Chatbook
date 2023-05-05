import React, { useEffect } from 'react';
import './Form.css';
import FormSignup from './User/FormSignup';
import hcbgImage from "./signup-page.png";
const Form = () => {
  return (
    <>
      <div className='form-container'
      style={{
        backgroundImage:"url("+hcbgImage+")",
        backgroundSize: "cover",
        height: "131vh",
      }}
      >
      <FormSignup />
      </div>
    </>
  );
};

export default Form;