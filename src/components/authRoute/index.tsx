import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import logging from "config/logging";
import { UserContext } from "contexts";

interface IAuthRouteProps {}

export const AuthRoute: React.FC<IAuthRouteProps> = (props) => {
  const { children } = props;

  const userContext = useContext(UserContext);

  if (userContext.userState.user._id === "") {
    logging.info("Unauthorized, redirecting.");
    return <Redirect to="/login" />;
  } else {
    return <>{children}</>;
  }
};
