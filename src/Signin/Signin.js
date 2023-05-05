import React from 'react';
import './Signin.css';
import FormSignin from './FormSignin';
import hcbgImage from "./loginPage.png";

const Form = () => {

  return (
    <>
      <div className='form1-container'
      style={{
        backgroundImage:"url("+hcbgImage+")",
        backgroundSize: "cover",
        height: "100vh",
      }}>
        <FormSignin />
      </div>
    </>
  );
};

export default Form
