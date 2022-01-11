import React from "react";
import { Link } from "react-router-dom";
import { AppWrapper } from "components";
import IPageProps from "interfaces/page";

export const HomePage: React.FunctionComponent<IPageProps> = (props) => {
  return (
    <AppWrapper title="Home">
      <p>Welcome to this page that is protected by Friebase auth!</p>
      <p>
        Change your password <Link to="/change">here</Link>.
      </p>
      <p>
        Click <Link to="/logout">here</Link> to logout.
      </p>
    </AppWrapper>
  );
};
