import React from "react";
import { Link, useHistory } from "react-router-dom";
import "styles/styles.scss";
import Logo from "assets/logo.png";
import { Stack, Button } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const NavBar: React.FC<{}> = () => {
  const history = useHistory();

  const handleClickLogo = () => {
    history.push("/walley");
  };
  return (
    <nav>
      <div className="logo">
        <img src={Logo} alt="logo" onClick={handleClickLogo} />
      </div>
      <Stack className="buttons" spacing={5} direction="row">
        <Stack className="menuStack" spacing={3} direction="row">
          <Link className="link" to="/about">
            <Button className="aboutBtn">ABOUT US</Button>
          </Link>
        </Stack>
        <Stack className="authStack" spacing={2} direction="row">
          <Link className="link" to="/login">
            <Button className="loginBtn">LOGIN</Button>
          </Link>
          <Link className="link" to="/signup">
            <Button className="signUpBtn">SIGN UP</Button>
          </Link>
          <Link className="link" to="/account">
            <AccountCircleIcon
              className="accountIcon"
              fontSize="large"
              color="disabled"
            />
          </Link>
        </Stack>
      </Stack>
    </nav>
  );
};
