import React from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import styled from "@emotion/styled";
import { Avatar } from "@mui/material";

interface CMButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fontSize?: number;
  disabled?: boolean;
  ml?: number;
}
const CMIconButton = styled(IconButton)({
  color: "#83b0f3",
});

export const PlusButton: React.FC<CMButtonProps> = ({
  onClick,
  fontSize,
  disabled,
}) => {
  return (
    <CMIconButton
      className="plus-button"
      onClick={onClick}
      disableRipple
      disabled={disabled}
    >
      <AddCircleIcon fontSize="large" sx={{ fontSize: fontSize }} />
    </CMIconButton>
  );
};

export const EditButton: React.FC<CMButtonProps> = ({
  onClick,
  fontSize,
  ml,
  ...props
}) => {
  return (
    <CMIconButton
      sx={{ ml: ml }}
      className="edit-button"
      onClick={onClick}
      disableRipple
    >
      <Avatar sx={{ bgcolor: "#83b0f3", width: 30, height: 30 }}>
        <EditIcon fontSize="medium" sx={{ fontSize: fontSize }} />
      </Avatar>
    </CMIconButton>
  );
};
