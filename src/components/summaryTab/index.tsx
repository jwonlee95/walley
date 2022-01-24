import React from "react";
import { TabPanelProps } from "components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const TabSectionHeading: React.FC<{ title: string }> = (props) => {
  return <div className="tab-section-heading">{props.title}</div>;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: false,
    },
  },
};
const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [1, 2, 3, 4, 5, 6, 7],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [7, 6, 5, 4, 3, 2, 1],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const BarChartSection = () => {
  return (
    <>
      <div style={{ width: 1523 }} className="liquidity-planner-app">
        <Bar options={options} data={data} />
      </div>
    </>
  );
};

export const SummaryTab: React.FC<TabPanelProps> = ({ value, index }) => {
  return (
    <>
      {value === index && (
        <>
          <BarChartSection />
        </>
      )}
    </>
  );
};
