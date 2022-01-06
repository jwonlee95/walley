import React from "react";
import { Link } from "react-router-dom";
import "styles/index.scss";
import Logo from "assets/logo.png";
import { Stack, Button } from "@mui/material";
export const NavBar: React.FC<{}> = () => {
  return (
    <nav>
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <Stack className="stack" spacing={2} direction="row">
        <Link to="/about">
          <Button variant="contained">About Us</Button>
        </Link>
        <Link to="/login">
          <Button variant="contained">Login</Button>
        </Link>
        <Link to="/signup">
          <Button variant="contained">Sign Up</Button>
        </Link>
      </Stack>
    </nav>
  );
};
