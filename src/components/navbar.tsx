import React from "react";
import { Link } from "react-router-dom";
const NavBar: React.FC = () => {
  return (
    <Link to="/login">
      <button>Login</button>
    </Link>
  );
};

export default NavBar;
