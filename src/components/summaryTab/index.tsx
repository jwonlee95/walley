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
import { daysToWeeks } from "date-fns";
import { Button } from "@mui/material";
import { elementAcceptingRef } from "@mui/utils";

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

const BarChartSection = () => {
  const { transaction } = useContext(StateContext);

  const sortedTransaction = transaction.sort((x, y) =>
    y.date.toLocaleString().localeCompare(x.date.toLocaleString())
  );

  var tempMonth = 0;

  const now = moment().format("MM-DD-YYYY");
  const nowYear = moment().year();
  const nowMonth = moment().month();
  const nowDay = moment().day(); //화요일: 2
  const nowDate = moment().date(); //1일

  //console.log("Now is", nowDate);
  const monthData: number[] = [];
  const sixMonthData: number[] = [];

  for (var i = 0, max = sortedTransaction.length; i < max; i++) {
    if (sortedTransaction[i].type === "expense") {
      if (i === 0) {
        const ele = sortedTransaction[i];
        var dt = new Date(ele.date);
        const month = dt.getMonth();
        monthData[month] = tempMonth + ele.amount;
        tempMonth = monthData[month];
      } else {
        const ele = sortedTransaction[i];
        const previous = sortedTransaction[i - 1];
        dt = new Date(ele.date);
        var pdt = new Date(previous.date);
        const previousMonth = pdt.getMonth();
        const month = dt.getMonth();
        if (month === previousMonth) {
          monthData[month] = tempMonth + ele.amount;
          tempMonth = monthData[month];
        } else {
          tempMonth = 0;
          monthData[month] = tempMonth + ele.amount;
          tempMonth = monthData[month];
        }
      }
    }
  }

  let nowMonthIndex = 0;
  const getNowMonth = () => {
    var dt = new Date();
    const nowMonth = dt.getMonth();
    nowMonthIndex = nowMonth;
    console.log("Now Month is: ", nowMonthIndex);
  };
  getNowMonth();

  const getSixData = (nowMonthIndex: number) => {
    sixMonthData[5] = monthData[nowMonthIndex];
    sixMonthData[4] = monthData[nowMonthIndex - 1];
    sixMonthData[3] = monthData[nowMonthIndex - 2];
    sixMonthData[2] = monthData[nowMonthIndex - 3];
    sixMonthData[1] = monthData[nowMonthIndex - 4];
    sixMonthData[0] = monthData[nowMonthIndex - 5];
    return sixMonthData;
  };

  const barDataMonth = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Current Month"],
    datasets: [
      {
        label: "Spent",
        data: getSixData(nowMonthIndex),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const handleLastMonth = () => {
    nowMonthIndex = nowMonthIndex - 1;
    if (nowMonthIndex === 0) {
      nowMonthIndex = 11;
    }
    return getSixData(nowMonthIndex);
  };

  return (
    <div>
      <Bar options={barOptions} data={barDataMonth} />
      <button id="0" type="button" onClick={handleLastMonth}>
        Previous Month
      </button>
    </div>
  );
};

const BarChartSectionWeek = () => {
  const { transaction } = useContext(StateContext);

  const sortedTransaction = transaction.sort((x, y) =>
    y.date.toLocaleString().localeCompare(x.date.toLocaleString())
  );

  var tempWeek = 0;
  const now = moment().format("MM-DD-YYYY");

  const weekData: number[] = [];
  const sixWeekData: number[] = [];

  const weekTest = () => {
    let mondayOfWeek = moment().year(2022).month(0).date(1).day(8);
    if (mondayOfWeek.date() > 7) mondayOfWeek.day(-6);

    let nextMondayOfWeek = mondayOfWeek.clone().add(7, "day");
    //console.log(mondayOfWeek.format("l"));
    //console.log(nextMondayOfWeek.format("l"));

    let count = 0;
    const weeklyRange: any[] = [];
    while (moment(mondayOfWeek).year() === moment(nextMondayOfWeek).year()) {
      const weekRange = {
        startDate: moment(mondayOfWeek).format("l"),
        endDate: moment(nextMondayOfWeek).subtract(1, "day").format("l"),
      };
      weeklyRange.push(weekRange);
      //console.log(count);
      mondayOfWeek.add(7, "days");
      nextMondayOfWeek.add(7, "day");
    }
    let weekNumber = 0;
    for (var i = 0, max = weeklyRange.length; i < max; i++) {
      for (var j = 0, maxT = sortedTransaction.length; j < maxT; j++) {
        if (sortedTransaction[j].type === "expense") {
          const ele = sortedTransaction[j];
          var dt = moment(ele.date).format("MM-DD-YYYY");
          if (
            moment(dt).isBetween(
              weeklyRange[i].startDate,
              weeklyRange[i].endDate,
              undefined,
              "[]"
            )
          ) {
            weekNumber = i;
            weekData[i] = tempWeek + ele.amount;
            tempWeek = weekData[i];
          }
        }
      }
    }
    for (i = 0, weeklyRange.length; i < max; i++) {
      if (
        moment(now).isBetween(
          weeklyRange[i].startDate,
          weeklyRange[i].endDate,
          undefined,
          "[]"
        )
      ) {
        weekNumber = i;
        console.log(weekData);
      }
    }
    if (weekNumber >= 5) {
      for (var i = 0; i < 6; i++) {
        sixWeekData[i] = weekData[weekNumber];
        weekNumber--;
      }
    } else {
      for (var i = 0; i < 6; i++) {
        if (weekNumber >= 0) {
          sixWeekData[i] = weekData[weekNumber];
          weekNumber--;
        } else {
          weekNumber = 52;
          sixWeekData[i] = weekData[weekNumber];
          weekNumber--;
        }
      }
    }

    console.log("Week Number is: ", sixWeekData);
    //console.log(weeklyRange);
  };

  weekTest();

  const barDataWeek = {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        label: "Weekly Spent",
        data: [
          sixWeekData[5],
          sixWeekData[4],
          sixWeekData[3],
          sixWeekData[2],
          sixWeekData[1],
          sixWeekData[0],
        ],
        backgroundColor: "red",
      },
    ],
  };
  return (
    <div>
      <Bar options={barOptions} data={barDataWeek} />
    </div>
  );
};

const BarChartSectionDay = () => {
  const { transaction } = useContext(StateContext);

  const sortedTransaction = transaction.sort((x, y) =>
    y.date.toLocaleString().localeCompare(x.date.toLocaleString())
  );

  const now = moment().format("MM-DD-YYYY");
  const nowq = moment().format("ll");
  const nowYear = moment().year();
  const nowMonth = moment().month();
  const yesterday = moment().subtract(1, "days").format("MM-DD-YYYY"); //화요일: 2
  const twoDaysBefore = moment().subtract(2, "days").format("MM-DD-YYYY");
  const threeDaysBefore = moment().subtract(3, "days").format("MM-DD-YYYY");
  const fourDaysBefore = moment().subtract(4, "days").format("MM-DD-YYYY");
  const fiveDaysBefore = moment().subtract(5, "days").format("MM-DD-YYYY");
  const sixDaysBefore = moment().subtract(6, "days").format("MM-DD-YYYY");

  const nowDate = moment().date(); //1일

  console.log("now is ", nowq);

  const dayData: number[] = [];

  let tempDayOne = 0;
  let tempDayTwo = 0;
  let tempDayThree = 0;
  let tempDayFour = 0;
  let tempDayFive = 0;
  let tempDaySix = 0;
  let tempDaySeven = 0;

  const getDayData = () => {
    for (var i = 0, max = sortedTransaction.length; i < max; i++) {
      const ele = sortedTransaction[i];
      console.log(ele);
      var dt = moment(ele.date).format("MM-DD-YYYY");
      console.log("dt is: ", dt);
      if (moment(dt).isSame(now)) {
        console.log("Today added");
        dayData[6] = tempDayOne + ele.amount;
        tempDayOne = dayData[6];
      } else if (moment(dt).isSame(yesterday)) {
        dayData[5] = tempDayTwo + ele.amount;
        tempDayTwo = dayData[5];
      } else if (moment(dt).isSame(twoDaysBefore)) {
        dayData[4] = tempDayThree + ele.amount;
        tempDayThree = dayData[4];
      } else if (moment(dt).isSame(threeDaysBefore)) {
        dayData[3] = tempDayFour + ele.amount;
        tempDayFour = dayData[3];
      } else if (moment(dt).isSame(fourDaysBefore)) {
        dayData[2] = tempDayFive + ele.amount;
        tempDayFive = dayData[2];
      } else if (moment(dt).isSame(fiveDaysBefore)) {
        dayData[1] = tempDaySix + ele.amount;
        tempDaySix = dayData[1];
      } else if (moment(dt).isSame(sixDaysBefore)) {
        dayData[0] = tempDaySeven + ele.amount;
        tempDaySeven = dayData[0];
      }
    }
    console.log("Day Data is: ", dayData);
  };

  getDayData();

  const barDataDay = {
    labels: [
      "6DayBefore",
      "5DayBefore",
      "4DayBefore",
      "3DayBefore",
      "2DayBefore",
      "1DayBefore",
      "Today",
    ],
    datasets: [
      {
        label: "Daily Spent",
        data: dayData,
        backgroundColor: "Blue",
      },
    ],
  };
  return (
    <div>
      <Bar options={barOptions} data={barDataDay} />
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

const PieChartSection = () => {
  const { transaction } = useContext(StateContext);
  const { category } = useContext(StateContext);

  const sortedTransaction = transaction.sort((x, y) =>
    y.date.toLocaleString().localeCompare(x.date.toLocaleString())
  );
  interface IData {
    temp: number;
    value: number;
  }
  const pieMonthData: IData[] = [];
  const categoryName: string[] = [];

  const pieData = {
    labels: categoryName,
    datasets: [
      {
        data: pieMonthData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#555555"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#555555"],
      },
    ],
    text: "123",
  };

  {
    category.map((ele, idx) => (categoryName[idx] = ele.name));
  }
  for (var i = 0; i < categoryName.length; i++) {
    pieMonthData[i] = {
      temp: 0,
      value: 0,
    };
  }
  console.log("pieMonthData: ", pieMonthData);
  const temp: number[] = [categoryName.length];
  for (var i = 0; i < categoryName.length; i++) {
    for (var j = 0; j < transaction.length; j++) {
      if (categoryName[i] === transaction[j].category) {
        pieMonthData[i].value = pieMonthData[i].temp + transaction[j].amount;
        pieMonthData[i].temp = pieMonthData[i].value;
        console.log(temp);
      }
    }
  }
  console.log("Categories are: ", categoryName);
  console.log("Categories are: ", pieMonthData);
  return (
    <div>
      <Doughnut options={pieOptions} data={pieData} />
    </div>
  );
};

export const SummaryTab: React.FC<TabPanelProps> = ({ value, index }) => {
  return (
    <>
      {value === index && (
        <>
          <BarChartSectionDay />
          <BarChartSectionWeek />
          <BarChartSection />
          <PieChartSection />
        </>
      )}
    </>
  );
};
