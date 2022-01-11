import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { ErrorText, AppWrapper } from "components";
import CircularProgress from "@mui/material/CircularProgress";
import { auth } from "config/firebase";
import logging from "config/logging";
import { IPageProps } from "interfaces/page";
import queryString from "querystring";

export const ResetPasswordPage: React.FunctionComponent<
  IPageProps & RouteComponentProps
> = (props) => {
  const [verifying, setVerifying] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean>(false);
  const [changing, setChanging] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [oobCode, setOobCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const history = useHistory();

  useEffect(() => {
    logging.info("Extracting code");

    let stringParams = queryString.parse(props.location.search);
    console.log(props.location.search);
    console.log(stringParams);
    if (stringParams) {
      let oobCode = stringParams.oobCode as string;

      if (oobCode) {
        logging.info("Code found");
        verifyPasswordResetLink(oobCode);
      } else {
        logging.error("Unable to find code");
        setVerified(false);
        setVerifying(false);
      }
    } else {
      logging.error("Unable to find code");
      setVerified(false);
      setVerifying(false);
    }
    // eslint-disable-next-line
  }, []);

  const verifyPasswordResetLink = (_oobCode: string) => {
    auth
      .verifyPasswordResetCode(_oobCode)
      .then((result) => {
        logging.info(result);
        setOobCode(_oobCode);
        setVerified(true);
        setVerifying(false);
      })
      .catch((error) => {
        logging.error(error);
        setVerified(false);
        setVerifying(false);
      });
  };

  const passwordResetRequest = () => {
    if (password !== confirm) {
      setError("Make sure your passwords are matching");
      return;
    }

    if (error !== "") setError("");

    setChanging(true);

    auth
      .confirmPasswordReset(oobCode, password)
      .then(() => {
        history.push("/login");
      })
      .catch((error) => {
        logging.error(error);
        setError(error.message);
        setChanging(false);
      });
  };

  return (
    <AppWrapper>
      <div>Reset Password</div>

      {verifying ? (
        <CircularProgress color="inherit" />
      ) : (
        <>
          {verified ? (
            <>
              <p>Please enter a strong password.</p>
              <form>
                <input
                  autoComplete="new-password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                />
              </form>
              <form>
                <input
                  autoComplete="new-password"
                  type="password"
                  name="confirm"
                  id="confirm"
                  placeholder="Confirm Password"
                  onChange={(event) => setConfirm(event.target.value)}
                  value={confirm}
                />
              </form>
              <button
                disabled={changing}
                color="success"
                onClick={() => passwordResetRequest()}
              >
                Reset Password
              </button>
              <ErrorText error={error} />
            </>
          ) : (
            <p>Invalid link.</p>
          )}
        </>
      )}
    </AppWrapper>
  );
};
