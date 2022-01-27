import React from "react";
import { Card, Icon } from "@mui/material";

interface CategoryCardProps {
  icon: string;
  name: string;
  budget: number;
  remain: number;
  color: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  name,
  budget,
  remain,
  color,
}) => {
  return (
    <Card variant="outlined" className="card">
      <div className="card-heading">
        <Icon className="icon" fontSize="medium" sx={{ color: color }}>
          {icon}
        </Icon>
        {name}
      </div>
      <div className="card-content-wrapper">
        <div className="card-content">{`Budget: $ ${budget}`}</div>
        <div className="card-content">{`Remain: $ ${remain}`}</div>
      </div>
    </Card>
  );
};
