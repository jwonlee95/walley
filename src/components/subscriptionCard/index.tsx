import { Card } from "@mui/material";
import React from "react";
import { PlusButton } from "..";

interface SubscriptionCarddProps {
  empty: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  name?: string;
  amount?: number;
  remainingDay?: number;
}
export const SubscriptionCard: React.FC<SubscriptionCarddProps> = ({
  empty,
  onClick,
  name,
  amount,
  remainingDay,
}) => {
  return empty ? (
    <Card
      variant="outlined"
      className="card"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <PlusButton fontSize="70px" onClick={onClick} />
    </Card>
  ) : (
    <Card variant="outlined" className="card">
      <div className="card-heading">{name}</div>
      <div className="sub-amount">{`$ ${amount}`}</div>
      <div className="sub-remaining">
        {remainingDay === 0 ? "D-Day" : `D-${remainingDay}`}
      </div>
    </Card>
  );
};
