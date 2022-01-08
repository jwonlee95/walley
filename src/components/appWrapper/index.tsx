import React from "react";
import { NavBar } from "components";

interface AppWrapperProps {
  children: React.ReactNode;
}
export const AppWrapper: React.FC<AppWrapperProps> = (props) => {
  return (
    <div className="appWrapper">
      <NavBar />
      <div>{props.children}</div>
    </div>
  );
};
