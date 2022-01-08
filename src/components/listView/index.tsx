import React from "react";

export interface IlistViewProps {
  _id: string;
  category: string;
  user: string;
  description?: string;
  amount: string;
  balance: string;
  createdAt: string;
  updatedAt: string;
}

export const listView: React.FC<IlistViewProps> = (props) => {
  const {
    _id,
    children,
    category,
    user,
    createdAt,
    updatedAt,
    description,
    amount,
    balance,
  } = props;

  return (
    <div>
      <h1>{category}</h1>
      <h1>{user}</h1>
      <h1>{description}</h1>
      <h1>{amount}</h1>
      <h1>{balance}</h1>
      <br />
      {createdAt !== updatedAt ? (
        <p>
          Updated by {user} at {new Date(updatedAt).toLocaleString()}
        </p>
      ) : (
        <p>
          Posted by {user} at {new Date(createdAt).toLocaleString()}
        </p>
      )}
      {children}
    </div>
  );
};
