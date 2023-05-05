import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";

function Nav(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;

  const navStyle = {
    color: "white",
  };
  //  h

  function onLogoutClick(e) {
    e.preventDefault();
    props.logoutUser();
  }
  const authLinks = (
    <div>
      <ul className="nav-links">
        
        <Link style={navStyle} to="/Dashboard">
          <li>Dashboard</li>
        </Link>
        <Link style={navStyle}>
          <li>
              <img
                src={user.avatar}
                alt={user.username}
                style={{ width: "3vw", height: "3vh" }}
                title="You must have a gravatar connected to your email to display an image"
              ></img>
          </li>
        </Link>
        <Link style={navStyle} to="/Logout">
          <li>LogOut</li>
        </Link>
      </ul>
    </div>
  );
  const guestLinks = (
    <ul className="nav-links">
      <Link style={navStyle} to="/">
        <li>Sign in</li>
      </Link>
      <Link style={navStyle} to="/Signup">
        <li>Sign up</li>
      </Link>
    </ul>
  );
  return (
    <nav>
      <h3>Logo</h3>
      {/* <ul className="nav-links">
                {/* <Link style={navStyle} to="/Dashboard">
                    <li>Dashboard</li>
                </Link> 
<Link style={navStyle} to="/Logout">
          <li>LogOut</li>
        </Link><a href="" onClick={onLogoutClick} 
          // style={navStyle}
          >
            LogOut
            <img
              src={user.avatar}
              alt={user.username}
              style={{ width: "3vw", height: "3vh", marginRight: "50vw" }}
              title="You must have a gravatar connected to your email to display an image"
            ></img>
          </a>
                <Link style={navStyle} to="/">
                    <li>Sign in</li>
                </Link>
                <Link style={navStyle} to="/Signup">
                    <li>Sign up</li>
                </Link>
            </ul> 
            */}
      {isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
}
Nav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Nav);
