import React, { useEffect, useState, useContext } from "react";
import { TabPanelProps } from "components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut, Chart } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { StateContext, UserContext } from "contexts";
import { ITransaction } from "interfaces";
import { reducerState } from "common/store";
import moment from "moment";

const TabSectionHeading: React.FC<{ title: string }> = (props) => {
  return <div className="tab-section-heading">{props.title}</div>;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const barOptions = {
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

// const barData = {
//   labels: ["January", "February", "March", "April", "May", "June", "July"],
//   datasets: [
//     {
//       label: "Budget",
//       data: [1, 2, 3, 4, 5, 6, 7],
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//       label: "Spent",
//       data: [7, 6, 5, 4, 3, 2, 1],
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };

interface IParseData {
  value: number;
}

const BarChartSection = () => {
  const dispatch = useDispatch();
  const { user } = useContext(UserContext).userState;
  const { transaction } = useContext(StateContext);
  const userSelector = useSelector((state: reducerState) => state.user);

  const now = Date.now();
  const nowYear = new Date(now).getFullYear(); //2022
  const nowMonth = new Date(now).getMonth(); //1월 = 0, 2월 = 1....

  const nowDate = new Date(now).getUTCDate(); //지금 날짜
  const nowDay = moment(now).day(1).day();
  console.log("Now is", nowDay);
  const monthData: number[] = [];

  var temp = 0;
  const sortedTransaction = transaction.sort((x, y) =>
    y.date.toLocaleString().localeCompare(x.date.toLocaleString())
  );

  for (var i = 0, max = sortedTransaction.length; i < max; i++) {
    if (sortedTransaction[i].type === "expense") {
      if (i === 0) {
        const ele = sortedTransaction[i];
        var dt = new Date(ele.date);
        const month = dt.getMonth();
        monthData[month] = temp + ele.amount;
        temp = monthData[month];
      } else {
        const ele = sortedTransaction[i];
        const previous = sortedTransaction[i - 1];
        var dt = new Date(ele.date);
        var pdt = new Date(previous.date);
        const previousMonth = pdt.getMonth();
        const month = dt.getMonth();
        if (month === previousMonth) {
          monthData[month] = temp + ele.amount;
          temp = monthData[month];
        } else {
          temp = 0;
          monthData[month] = temp + ele.amount;
          temp = monthData[month];
        }
      }
    }
  }

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Budget",
        data: [100, 200, 300, 400, 500, 600, 700, 800],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Spent",
        data: monthData,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  console.log("Not UseEffect", monthData);
  return (
    <div style={{ width: 1523 }}>
      <Bar options={barOptions} data={barData} />
    </div>
  );
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: false,
    },
    doughnutlabel: {
      labels: [
        {
          text: "55555",
          font: {
            size: "40",
          },
          color: "black",
        },
      ],
    },
  },
};

const plugins = [
  {
    beforeDraw: function (chart: ChartJS) {
      var width = chart.width,
        height = chart.height,
        ctx = chart.ctx;
      ctx.restore();
      var fontSize = (height / 160).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "top";
      var text = "Foo-bar",
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  },
];

const pieData = {
  labels: ["Food", "Gift", "Pet", "Others"],
  datasets: [
    {
      data: [550, 550, 500, 550],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#555555"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#555555"],
    },
  ],
  text: "123",
};

const PieChartSection = () => {
  return (
    <div style={{ width: 500 }}>
      <Doughnut options={pieOptions} data={pieData} />
    </div>
  );
};

export const SummaryTab: React.FC<TabPanelProps> = ({ value, index }) => {
  return (
    <>
      {value === index && (
        <>
          <BarChartSection />
          <PieChartSection />
        </>
      )}
    </>
  );
};
