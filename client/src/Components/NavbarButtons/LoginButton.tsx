import { Link } from "react-router-dom";
import "./Navbarbuttons.css";
import Button from 'react-bootstrap/Button';
import React from "react";

function LoginButton() {
  return (
    <h3>
      <Link to={"/login"}>
        <Button className="loginBtn" variant="outline-secondary" size="lg">
          Log In / Sign Up
        </Button>
        {/* <Button className="signupBtn" variant="success" size="lg">
          Sign UP
        </Button> */}
      </Link>
    </h3>
  );
}

export default LoginButton;
