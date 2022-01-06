import React from "react";
import { NavBar } from "components";

interface AppWrapperProps {
  children: React.ReactNode;
}
export const AppWrapper: React.FC<AppWrapperProps> = (props) => {
  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
};
