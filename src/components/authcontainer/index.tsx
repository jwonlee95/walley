import React from "react";

export interface IAuthContainerProps {
  header?: any;
  children?: any;
}
export const AuthContainer: React.FunctionComponent<IAuthContainerProps> = (
  props
) => {
  const { children, header } = props;

  return (
    <div>
      <div>{header}</div>
      <div>{children}</div>
    </div>
  );
};
