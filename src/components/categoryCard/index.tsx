import React, { useState } from "react";
import { Card, Icon } from "@mui/material";
import { PlusButton } from "components";

interface CategoryCardProps {
  empty: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: string;
  name?: string;
  budget?: number;
  remain?: number;
  color?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  empty,
  onClick,
  icon,
  name,
  budget,
  remain,
  color,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    console.log("HELLO");
  };
  return empty ? (
    <Card
      variant="outlined"
      className="card"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PlusButton fontSize={70} onClick={onClick} />
    </Card>
  ) : (
    <Card
      variant="outlined"
      className="card"
      sx={{ cursor: "pointer" }}
      onClick={handleClick}
    >
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
