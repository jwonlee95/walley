import React from "react";
import { styled } from "@mui/material/styles";
import { Tab, Tabs } from "@mui/material";
import { IMAGES } from "assets";

const { DollarIcon, DollarIconClicked, ChartIcon, ChartIconClicked } =
  IMAGES.home;

const TabIcon: React.FC<{ _label: string; _clicked: boolean }> = (props) => {
  return (
    <img
      src={
        props._label === "Expense" && props._clicked
          ? DollarIconClicked
          : props._label === "Expense" && !props._clicked
          ? DollarIcon
          : props._label === "Summary" && props._clicked
          ? ChartIconClicked
          : ChartIcon
      }
      alt={`${props._label}-icon `}
    />
  );
};
export const CMTabs = styled(Tabs)({
  borderBottom: "2px solid rgba(0,0,0,0.12)",
  "& .MuiTabs-indicator": {
    display: "none",
  },
});

export interface TabPanelProps {
  index: number;
  value: number;
}

interface CMTabProps {
  label: string;
  clicked: boolean;
}

export const CMTab = styled((props: CMTabProps) => (
  <Tab
    icon={<TabIcon _label={props.label} _clicked={props.clicked} />}
    iconPosition="start"
    {...props}
  />
))(() => ({
  // content: DollarIcon,
  textTransform: "none",
  justifyContent: "space-evenly",
  color: "#83B0F3",
  width: "180px",
  height: "60px",
  borderRadius: "10px 10px 0px 0px",
  fontFamily: ["Raleway", "sans-serif"],
  fontSize: "18px",
  fontWeight: 600,
  "&.Mui-selected": {
    backgroundColor: "#83B0F3",
    color: "#fff",
  },
}));
