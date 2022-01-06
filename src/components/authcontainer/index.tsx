import React from "react";

export interface IAuthContainerProps {
  header: string;
  children: React.ReactNode;
}
export const AuthContainer: React.FC<IAuthContainerProps> = (props) => {
  return (
    <div>
      <div>{props.header}</div>
      <div>{props.children}</div>
    </div>
  );
};
