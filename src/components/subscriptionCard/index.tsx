import { Card } from "@mui/material";
import React from "react";

interface SubscriptionCarddProps {
  name: string;
  amount: number;
  remainingDay: number;
}
export const SubscriptionCard: React.FC<SubscriptionCarddProps> = ({
  name,
  amount,
  remainingDay,
}) => {
  return (
    <Card variant="outlined" className="card">
      <div className="card-heading">{name}</div>
      <div className="sub-amount">{`$ ${amount}`}</div>
      <div className="sub-remaining">
        {remainingDay === 0 ? "D-Day" : `D-${remainingDay}`}
      </div>
    </Card>
  );
};
