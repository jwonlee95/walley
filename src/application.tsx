import React, { useEffect, useReducer, useState } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { ActivityIndicator, AuthRoute } from "components";
import logging from "config/logging";
import routes from "config/routes";

import { initialUserState, UserContextProvider, userReducer } from "contexts";
import { Validate } from "modules/auth/auth";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  const theme = createTheme({
    components: {
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontSize: "14px",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: "14px",
          },
        },
      },
    },
  });
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [authStage, setAuthStage] = useState<string>(
    "Checking localstorage ..."
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      CheckLocalStorageForCredentials();
    }, 1000);
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

  if (loading) return { authStage } && <ActivityIndicator />;

  return (
    <UserContextProvider value={userContextValues}>
      <ThemeProvider theme={theme}>
        <Switch>
          {routes.map((route, index) => {
            if (route.protected) {
              return (
                <Route
                  path={route.path}
                  exact={route.exact}
                  key={index}
                  render={(routeProps: RouteComponentProps) => (
                    <AuthRoute>
                      <route.component {...routeProps} />
                    </AuthRoute>
                  )}
                />
              );
            }

            return (
              <Route
                path={route.path}
                exact={route.exact}
                key={index}
                render={(routeProps: RouteComponentProps) => (
                  <route.component {...routeProps} />
                )}
              />
            );
          })}
        </Switch>
      </ThemeProvider>
    </UserContextProvider>
  );
};

export default Application;
