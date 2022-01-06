import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import { AppWrapper } from "components";
import { auth } from "config/firebase";
import logging from "config/logging";
import IPageProps from "interfaces/page";

export const ChangePasswordPage: React.FunctionComponent<IPageProps> = (
  props
) => {
  const [changing, setChanging] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [old, setOld] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const history = useHistory();

  const passwordChangeRequest = () => {
    if (password !== confirm) {
      setError("Make sure your passwords are matching");
      return;
    }

    if (error !== "") setError("");

    setChanging(true);

    auth.currentUser
      ?.updatePassword(password)
      .then(() => {
        logging.info("Password change successful.");
        history.push("/home");
      })
      .catch((error) => {
        logging.error(error);
        setChanging(false);
        setError(error.message);
      });
  };

  if (auth.currentUser?.providerData[0]?.providerId !== "password")
    return <Redirect to="/home" />;

  return (
    <AppWrapper>
      <div>Change Password</div>
      <form>
        <input
          autoComplete="new-password"
          type="password"
          name="oldPassword"
          id="oldPassword"
          placeholder="Current Password"
          onChange={(event) => setOld(event.target.value)}
          value={old}
        />
      </form>
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
        onClick={() => passwordChangeRequest()}
      >
        Change Password
      </button>
      {/* <ErrorText error={error} /> */}
    </AppWrapper>
  );
};
