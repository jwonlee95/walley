import React from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import styled from "@emotion/styled";

interface CMButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fontSize?: string;
}
const CMIconButton = styled(IconButton)({
  color: "#83b0f3",
});
export const PlusButton: React.FC<CMButtonProps> = ({ onClick, fontSize }) => {
  return (
    <CMIconButton className="plus-button" onClick={onClick} disableRipple>
      <AddCircleIcon fontSize="large" sx={{ fontSize: fontSize }} />
    </CMIconButton>
  );
};

export const EditButton: React.FC<CMButtonProps> = ({ onClick, fontSize }) => {
  return (
    <CMIconButton className="edit-button" onClick={onClick} disableRipple>
      <EditIcon fontSize="large" sx={{ fontSize: fontSize }} />
    </CMIconButton>
  );
};
