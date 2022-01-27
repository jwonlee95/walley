import React from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import styled from "@emotion/styled";

interface PlusButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fontSize?: string;
}
const CMIconButton = styled(IconButton)({
  color: "#83b0f3",
});
export const PlusButton: React.FC<PlusButtonProps> = ({
  onClick,
  fontSize,
}) => {
  return (
    <CMIconButton className="plus-button" onClick={onClick} disableRipple>
      <AddCircleIcon fontSize="large" sx={{ fontSize: fontSize }} />
    </CMIconButton>
  );
};
