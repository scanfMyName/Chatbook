// import { TEST_DISPATCH } from "./types"
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
// Register User

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => {
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Login Get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
    //   Save the token
    console.log("In authActions.js after login:",res);
      const { token,user } = res.data;

      console.log("In authActions.js after login:",token);
      if(token == null){
        console.log("Token is null");
        return res.json();
      }
      /// Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
    //   localStorage.getItem('token');
      setAuthToken(token);
  
      const decoded = jwt_decode(token);
      console.log("In authActions.js after login:",decoded);
      console.log(user)

      console.log("In authActions.js after login:",decoded);
      // Set current user
      dispatch(setCurrentUser(user));
      
      window.location.href = "/Dashboard";
      // success() 
    })
    .catch((err) => {
        console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// log out the user
export const logoutUser = () => (dispatch) => {
  // Remove the token
  localStorage.removeItem("jwtToken");
  // Remove the auth header for future request
  setAuthToken(false);
  // Set the current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  window.location.href = "/";
};
