import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppWrapper } from "components";
import { Providers } from "config/firebase";
import logging from "config/logging";
import { IPageProps } from "interfaces";
import firebase from "firebase/compat/app";
import { Authenticate, SignInWithSocialMedia } from "modules/auth/auth";
import UserContext from "contexts/user";
import { Button } from "@mui/material";
import IMAGES from "assets";

const { GoogleIcon, AppleIcon } = IMAGES.login;
export const LoginPage: React.FunctionComponent<IPageProps> = (props) => {
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const userContext = useContext(UserContext);
  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isLogin = window.location.pathname.includes("login");

  const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
    if (error !== "") setError("");

    setAuthenticating(true);

    SignInWithSocialMedia(provider)
      .then(async (result) => {
        logging.info(result);

        let user = result.user;

        if (user) {
          let uid = user.uid;
          let name = user.displayName;

          if (name) {
            try {
              let fire_token = await user.getIdToken();

              Authenticate(uid, name, fire_token, (error, _user) => {
                if (error) {
                  setError(error);
                  setAuthenticating(false);
                } else if (_user) {
                  userContext.userDispatch({
                    type: "login",
                    payload: { user: _user, fire_token },
                  });
                  history.push("/home");
                }
              });
            } catch (error) {
              setError("Invalid token.");
              logging.error(error);
              setAuthenticating(false);
            }
          } else {
            /**
             * We can set these manually with a new form
             * For example, the Twitter provider sometimes
             * does not provide a username as some users sign
             * up with a phone number.  Here you could ask
             * them to provide a name that would be displayed
             * on this website.
             * */
            setError("The identify provider is missing a display name.");
            setAuthenticating(false);
          }
        } else {
          setError(
            "The social media provider does not have enough information. Please try a different provider."
          );
          setAuthenticating(false);
        }
      })
      .catch((error) => {
        logging.error(error);
        setAuthenticating(false);
        setError(error.message);
      });
  };

  return (
    <AppWrapper>
      <div className="form-wrapper">
        <div className="heading">Get's Started</div>

        <div className="login-wrapper">
          <div className="btn-wrapper">
            <img src={GoogleIcon} alt="google-icon" />
            <Button
              className="login-btn google"
              variant="contained"
              disabled={authenticating}
              onClick={() => signInWithSocialMedia(Providers.google)}
            >
              <img src={GoogleIcon} alt="google-icon" />
              Sign in with Google
            </Button>
            <Button
              className="login-btn apple"
              variant="contained"
              disabled={authenticating}
              onClick={() => signInWithSocialMedia(Providers.google)}
            >
              <img src={AppleIcon} alt="apple-icon" />
              Sign in with Apple
            </Button>
          </div>
        </div>
        <div className="text-wrapper">
          <p>
            By signing in with “Sign in with Google and Apple” above, you
            acknowledge that you have read and understood, and agree to Walley’s{" "}
            <a href="/walley">Term’s Condition</a> and{" "}
            <a href="/walley">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </AppWrapper>
  );
};
