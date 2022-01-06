import React from "react";

export interface IAuthContainerProps {
  header: any;
}
export const AuthContainer: React.FunctionComponent<IAuthContainerProps> = (
  props
) => {
  const { children, header } = props;

  return (
    <div>
      <div>
        <div>
          <div className="mt-5">
            <div className="bg-primary text-white">{header}</div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
