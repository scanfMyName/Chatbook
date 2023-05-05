import React from 'react';
import { useEffect , useState} from 'react';
import { Provider } from 'react-redux';
import store from "./store"
import { BrowserRouter as Router, Route, Switch } from'react-router-dom';
// import React, { useState } from 'react';

import Dashboard from './Dashboard/Dashboard';
import Navbar from './Navbar/Navbar';
import Form1 from './Signin/Signin';
import Form from './Signup/Signup';
import './Manage.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './actions/authActions';

const Logout = () => {
  store.dispatch(logoutUser());
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(logout())
  //     .then(() => {
  //       navigate("/", { replace: true });
  //     });

  // }, []);

  // return <LoadingSpinner />;
  window.location.href = "/";
};

function Manage() {
  const [signin, setSignin] = useState(false)
  const [postStatus, setPostStatus] = useState(false);


  useEffect(() => {
    // check for token

    if(localStorage.jwtToken != undefined){
      console.log("jwt token is present", localStorage.jwtToken)  
      // set the auth token to jwt.token
      console.log("jwt token is present", localStorage.jwtToken)
      setAuthToken(localStorage.jwtToken)
      
      const decode = jwt_decode(localStorage.jwtToken);
      // set user and isAuthenticated 
      store.dispatch(setCurrentUser(decode));
    
      // Check for expire token 
      const currentTime = Date.now()/1000;
      if(decode.exp<currentTime){
        store.dispatch(logoutUser());
        window.location.href = "/";
      }
        
    }
    
    
  
    
  }, [])
  
  return (
    <Provider store={ store }>
    <Router>
      <div className="Manage">
        <Navbar />
        <Switch>
        
          <Route exact path="/Dashboard"  component={ Dashboard } />
          <Route exact path="/" component={ Form1 } />
          <Route  path="/Signup" exact component={ Form } />
          <Route  path="/Logout" exact component={ Logout } />  
          {/* <Route exact path="/Signup" render={(props) => <Form {...props } setSignin={setSignin} signin={signin} />} /> */}
        </Switch>
      </div>
    </Router>
    </Provider>
  );
}
export default Manage;