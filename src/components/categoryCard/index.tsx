import React, { useState } from "react";
import { Card, Icon } from "@mui/material";
import { PlusButton } from "components";
import { ICategory } from "interfaces/category";
import { CategoryDetailModal } from "components/categoryDetailModal";

interface CategoryCardProps {
  empty: boolean;
  category?: ICategory | undefined;
  onClickCard?: (
    e: React.MouseEvent<HTMLDivElement>,
    card: ICategory | undefined
  ) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: string;
  name?: string;
  budget?: number;
  remain?: number;
  color?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  empty,
  category,
  onClickCard,
  onClick,
  icon,
  name,
  budget,
  remain,
  color,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >(undefined);

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement>,
    card: ICategory | undefined
  ) => {
    setSelectedCategory(card);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
      onClick={(e) => handleClick(e, category)}
    >
      <CategoryDetailModal
        open={open}
        onClose={handleClose}
        selectedCategory={selectedCategory}
      />
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
