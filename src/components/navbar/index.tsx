import React from "react";
import { Link, useHistory } from "react-router-dom";

import { Stack, Button } from "@mui/material";
import IMAGES from "assets";

export const NavBar: React.FC<{}> = () => {
  const history = useHistory();

  const handleClickLogo = () => {
    history.push("/walley");
  };
  return (
    <nav>
      <div className="logo">
        <img src={IMAGES.logo} alt="logo" onClick={handleClickLogo} />
      </div>

      <Stack className="authStack" spacing={2} direction="row">
        <Link className="link" to="/about">
          <Button className="aboutBtn">ABOUT US</Button>
        </Link>

        <Link className="link" to="/login">
          <Button className="loginBtn">SIGN IN / SIGN UP</Button>
        </Link>
      </Stack>
    </nav>
  );
};
