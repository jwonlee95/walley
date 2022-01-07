import React from "react";
import { useHistory } from "react-router-dom";

import { AppWrapper } from "components";
import { auth } from "config/firebase";
import logging from "config/logging";
import IPageProps from "interfaces/page";

export const LogoutPage: React.FunctionComponent<IPageProps> = (props) => {
  const history = useHistory();

  const Logout = () => {
    auth
      .signOut()
      .then(() => history.push("/login"))
      .catch((error) => logging.error(error));
  };

  return (
    <AppWrapper>
      <div>Logout</div>

      <p className="text-center">Are you sure you want to logout?</p>
      <div className="text-center">
        <button
          color="danger"
          className="mr-2"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
        <button color="info" className="mr-2" onClick={() => Logout()}>
          Logout
        </button>
      </div>
    </AppWrapper>
  );
};
