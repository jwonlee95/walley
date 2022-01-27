import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Stack, Button, IconButton } from "@mui/material";
import { IMAGES } from "assets";
import { UserContext } from "contexts";

export const NavBar: React.FC<{}> = () => {
  const history = useHistory();
  const { user } = useContext(UserContext).userState;
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setIsLogin(true);
    }
  }, []);
  const handleClickLogo = () => {
    if (isLogin) {
      history.push("/home");
    } else {
      history.push("/walley");
    }
  };

  const handleProfileClick = () => {
    history.push("/profile");
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
        {isLogin ? (
          <IconButton onClick={handleProfileClick} disableRipple>
            <AccountCircleIcon sx={{ color: "#83b0f3", fontSize: "45px" }} />
          </IconButton>
        ) : (
          <Link className="link" to="/login">
            <Button className="loginBtn">SIGN IN / SIGN UP</Button>
          </Link>
        )}
      </Stack>
    </nav>
  );
};
