import { CircularProgress, styled } from "@mui/material";
import React from "react";

const CMCircularProgress = styled(CircularProgress)({
  color: "#83B0F3",
});
export const ActivityIndicator: React.FC = () => {
  return (
    <div className="activity-indicator-wrapper">
      <CMCircularProgress size="5rem" />
    </div>
  );
};
