import React, { useState } from "react";
import { Card, Icon, CardActionArea } from "@mui/material";
import { PlusButton } from "components";
import { ICategory } from "interfaces";

interface CategoryCardProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  category?: ICategory | undefined;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  onClick,
  category,
}) => {
  return category ? (
    <div className="card-wrapper" onClick={onClick}>
      <Card variant="outlined" className="card" sx={{ cursor: "pointer" }}>
        <div className="card-heading">
          <Icon
            className="icon"
            fontSize="medium"
            sx={{ color: category.color }}
          >
            {category.icon}
          </Icon>
          {category.name}
        </div>
        <div className="card-content-wrapper">
          <div className="card-content">{`Budget: $ ${category.budget}`}</div>
          <div className="card-content">{`Remain: $ ${category.budget}`}</div>
        </div>
      </Card>
    </div>
  ) : (
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
  );
};
