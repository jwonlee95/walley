import React, { useEffect, useReducer, useState } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { AuthRoute } from "components";
import CircularProgress from "@mui/material/CircularProgress";
import logging from "config/logging";
import routes from "config/routes";

import {
  initialUserState,
  UserContextProvider,
  userReducer,
} from "./contexts/user";
import { Validate } from "modules/auth/auth";

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [authStage, setAuthStage] = useState<string>(
    "Checking localstorage ..."
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      CheckLocalStorageForCredentials();
    }, 1000);

    // eslint-disable-next-line
  }, []);

  const CheckLocalStorageForCredentials = () => {
    setAuthStage("Checking credentials ...");

    const fire_token = localStorage.getItem("fire_token");

    if (fire_token === null) {
      userDispatch({ type: "logout", payload: initialUserState });
      setAuthStage("No credentials found");
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else {
      return Validate(fire_token, (error, user) => {
        if (error) {
          logging.error(error);
          userDispatch({ type: "logout", payload: initialUserState });
          setLoading(false);
        } else if (user) {
          setAuthStage("User Authentificated");
          userDispatch({ type: "login", payload: { user, fire_token } });
          setLoading(false);
        }
      });
    }
  };

  const userContextValues = {
    userState,
    userDispatch,
  };

  if (loading) return <CircularProgress color="inherit" />;

  return (
    <UserContextProvider value={userContextValues}>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={(routeProps: RouteComponentProps<any>) => {
              if (route.protected)
                return (
                  <AuthRoute>
                    <route.component {...routeProps} />
                  </AuthRoute>
                );

              return <route.component {...routeProps} />;
            }}
          />
        ))}
      </Switch>
    </UserContextProvider>
  );
};

export default Application;
