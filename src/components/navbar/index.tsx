import React from "react";
import { Link } from "react-router-dom";
export const NavBar: React.FC = () => {
  return (
    <>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
      <Link to="about">
        <button>About Us</button>
      </Link>
    </>
  );
};
