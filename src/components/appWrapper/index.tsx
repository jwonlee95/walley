import React from "react";
import { NavBar, SEO } from "components";

interface AppWrapperProps {
  children: React.ReactNode;
  title: string;
}
export const AppWrapper: React.FC<AppWrapperProps> = (props) => {
  return (
    <div className="appWrapper">
      <SEO title={props.title} />
      <NavBar />
      <div>{props.children}</div>
    </div>
  );
};
