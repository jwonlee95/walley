import React from "react";

interface IErrorTextProps {
  error: string;
}

export const ErrorText: React.FC<IErrorTextProps> = (props) => {
  const { error } = props;

  if (error === "") return null;

  return <small className="text-danger">{error}</small>;
};
