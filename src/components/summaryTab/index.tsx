import React from "react";
import { TabPanelProps } from "components";

export const SummaryTab: React.FC<TabPanelProps> = ({ value, index }) => {
  return <>{value === index && <div>This is Summary Tab</div>}</>;
};
