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
import { StateContext } from "contexts";
import { ITransaction } from "interfaces";
import "styles/components/_chart.scss";
import moment from "moment";
import { Button } from "@mui/material";

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
  const [state, setState] = useState(0);

  const sortedTransaction = transaction.sort((x, y) =>
    y.date.toLocaleString().localeCompare(x.date.toLocaleString())
  );

  var tempMonth = 0;

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
    handleDaily();
    nowMonthIndex = nowMonthIndex - 1;
    if (nowMonthIndex === 0) {
      nowMonthIndex = 11;
    }
    getSixData(nowMonthIndex);
    console.log("qqqqqqqqqqqq", getSixData(nowMonthIndex));
  };
  const handleDaily = () => {
    setState(1);
  };

  return (
    <div>
      <Button onClick={handleLastMonth}>Previous Month</Button>
      {state === 0 && <Bar options={barOptions} data={barDataMonth} />}
      {state === 1 && <Bar options={barOptions} data={barDataMonth} />}
    </div>
  );
};

const WeeklyBarChartSection = () => {
  const { transaction } = useContext(StateContext);

  const sortedTransaction = transaction.sort((x, y) =>
    y.date.toLocaleString().localeCompare(x.date.toLocaleString())
  );

  interface IData {
    temp: number;
    value: number;
  }

  const now = moment().format("MM-DD-YYYY");

  const weekData: IData[] = [];
  const sixWeekData: number[] = [];

  const weekTest = () => {
    let mondayOfWeek = moment().year(2022).month(0).date(1).day(8);
    if (mondayOfWeek.date() > 7) mondayOfWeek.day(-6);

    let nextMondayOfWeek = mondayOfWeek.clone().add(7, "day");

    const weeklyRange: any[] = [];
    while (moment(mondayOfWeek).year() === moment(nextMondayOfWeek).year()) {
      const weekRange = {
        startDate: moment(mondayOfWeek).format("l"),
        endDate: moment(nextMondayOfWeek).subtract(1, "day").format("l"),
      };
      weeklyRange.push(weekRange);
      mondayOfWeek.add(7, "days");
      nextMondayOfWeek.add(7, "day");
    }
    for (var i = 0; i < weeklyRange.length; i++) {
      weekData[i] = {
        temp: 0,
        value: 0,
      };
    }
    let weekNumber = 0;
    for (i = 0; i < weeklyRange.length; i++) {
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
            weekData[i].value = weekData[i].temp + ele.amount;
            weekData[i].temp = weekData[i].value;
          }
        }
      }
    }
    for (i = 0; i < weeklyRange.length; i++) {
      if (
        moment(now).isBetween(
          weeklyRange[i].startDate,
          weeklyRange[i].endDate,
          undefined,
          "[]"
        )
      ) {
        weekNumber = i;
      }
    }

    if (weekNumber >= 5) {
      for (i = 0; i < 6; i++) {
        sixWeekData[i] = weekData[weekNumber].value;
        weekNumber--;
      }
    } else {
      for (i = 0; i < 6; i++) {
        if (weekNumber >= 0) {
          sixWeekData[i] = weekData[weekNumber].value;
          weekNumber--;
        } else {
          weekNumber = weeklyRange.length - 1;
          sixWeekData[i] = weekData[weekNumber].value;
          weekNumber--;
        }
      }
    }

    console.log("Week Number is: ", sixWeekData);
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
  console.log("barDataWeek", sixWeekData);
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
  const yesterday = moment().subtract(1, "days").format("MM-DD-YYYY"); //?????????: 2
  const twoDaysBefore = moment().subtract(2, "days").format("MM-DD-YYYY");
  const threeDaysBefore = moment().subtract(3, "days").format("MM-DD-YYYY");
  const fourDaysBefore = moment().subtract(4, "days").format("MM-DD-YYYY");
  const fiveDaysBefore = moment().subtract(5, "days").format("MM-DD-YYYY");
  const sixDaysBefore = moment().subtract(6, "days").format("MM-DD-YYYY");

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
      var dt = moment(ele.date).format("MM-DD-YYYY");
      if (moment(dt).isSame(now)) {
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

// --------------------------------PIE CHART------------------------------------------------------------------------

const MonthlyPieChartSection = () => {
  const { transaction } = useContext(StateContext);
  const { category } = useContext(StateContext);

  const nowMonth = moment().month();

  interface IData {
    temp: number;
    value: number;
  }
  const pieMonthData: IData[] = [];
  const categoryName: string[] = [];
  const nowMonthTransaction: ITransaction[] = [];

  for (var i = 0, max = transaction.length; i < max; i++) {
    const ele = transaction[i];
    if (moment(ele.date).month() === nowMonth) {
      nowMonthTransaction.push(ele);
    }
  }

  const pieData = {
    labels: categoryName,
    datasets: [
      {
        data: pieMonthData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#555555"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#555555"],
      },
    ],
  };

  category.map((ele, idx) => (categoryName[idx] = ele.name));

  for (i = 0; i < categoryName.length; i++) {
    pieMonthData[i] = {
      temp: 0,
      value: 0,
    };
  }

  for (i = 0; i < categoryName.length; i++) {
    for (var j = 0; j < nowMonthTransaction.length; j++) {
      if (categoryName[i] === nowMonthTransaction[j].category) {
        pieMonthData[i].value =
          pieMonthData[i].temp + nowMonthTransaction[j].amount;
        pieMonthData[i].temp = pieMonthData[i].value;
      }
    }
  }

  var totalValue = 0;
  for (i = 0; i < pieMonthData.length; i++) {
    totalValue += pieMonthData[i].value;
  }
  return (
    <div className="chartContainer">
      {totalValue === 0 ? (
        <div>No Spend Data</div>
      ) : (
        <div className="chartContainer">
          <Doughnut options={pieOptions} data={pieData} />
          <div className="chartInner">
            <div className="chartValue">${totalValue}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const WeeklyPieChartSection = () => {
  const { transaction } = useContext(StateContext);
  const { category } = useContext(StateContext);

  const sortedTransaction = transaction.sort((x, y) =>
    y.date.toLocaleString().localeCompare(x.date.toLocaleString())
  );

  interface IData {
    temp: number;
    value: number;
  }
  const pieWeekData: IData[] = [];
  const categoryName: string[] = [];
  const nowWeekTransaction: ITransaction[] = [];
  let weekNumber = 0;

  const weekTest = () => {
    let mondayOfWeek = moment().year(2022).month(0).date(1).day(8);
    if (mondayOfWeek.date() > 7) mondayOfWeek.day(-6);

    let nextMondayOfWeek = mondayOfWeek.clone().add(7, "day");

    const weeklyRange: any[] = [];
    while (moment(mondayOfWeek).year() === moment(nextMondayOfWeek).year()) {
      const weekRange = {
        startDate: moment(mondayOfWeek).format("l"),
        endDate: moment(nextMondayOfWeek).subtract(1, "day").format("l"),
      };
      weeklyRange.push(weekRange);
      mondayOfWeek.add(7, "days");
      nextMondayOfWeek.add(7, "day");
    }
    for (var i = 0; i < weeklyRange.length; i++) {
      var dt = moment().format("MM-DD-YYYY");
      if (
        moment(dt).isBetween(
          weeklyRange[i].startDate,
          weeklyRange[i].endDate,
          undefined,
          "[]"
        )
      ) {
        weekNumber = i;
      }
    }
    for (i = 0; i < weeklyRange.length; i++) {
      for (var j = 0, maxT = sortedTransaction.length; j < maxT; j++) {
        if (sortedTransaction[j].type === "expense") {
          const ele = sortedTransaction[j];
          dt = moment(ele.date).format("MM-DD-YYYY");
          var now = moment().format("MM-DD-YYYY");
          if (
            moment(dt).isBetween(
              weeklyRange[i].startDate,
              weeklyRange[i].endDate,
              undefined,
              "[]"
            ) &&
            moment(now).isBetween(
              weeklyRange[i].startDate,
              weeklyRange[i].endDate,
              undefined,
              "[]"
            )
          ) {
            nowWeekTransaction.push(ele);
          }
        }
      }
    }

    console.log("nowWeekTransaction: ", nowWeekTransaction);
  };

  weekTest();

  const pieData = {
    labels: categoryName,
    datasets: [
      {
        data: pieWeekData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#555555"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#555555"],
      },
    ],
    text: "123",
  };

  category.map((ele, idx) => (categoryName[idx] = ele.name));

  for (var i = 0; i < categoryName.length; i++) {
    pieWeekData[i] = {
      temp: 0,
      value: 0,
    };
  }
  for (i = 0; i < categoryName.length; i++) {
    for (var j = 0; j < nowWeekTransaction.length; j++) {
      if (categoryName[i] === nowWeekTransaction[j].category) {
        pieWeekData[i].value =
          pieWeekData[i].temp + nowWeekTransaction[j].amount;
        pieWeekData[i].temp = pieWeekData[i].value;
      }
    }
  }

  var totalValue = 0;
  var empty = true;
  for (i = 0; i < pieWeekData.length; i++) {
    totalValue += pieWeekData[i].value;
    if (totalValue !== 0) {
      empty = false;
    }
  }
  return (
    <div className="chartContainer">
      {totalValue === 0 ? (
        <div>No Spend Data</div>
      ) : (
        <div className="chartContainer">
          <Doughnut options={pieOptions} data={pieData} />
          <div className="chartInner">
            <div className="chartValue">${totalValue}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const DailyPieChartSection = () => {
  const { transaction } = useContext(StateContext);
  const { category } = useContext(StateContext);

  const now = moment().format("MM-DD-YYYY");
  console.log(now);

  interface IData {
    temp: number;
    value: number;
  }
  const pieDayData: IData[] = [];
  const categoryName: string[] = [];
  const nowDayTransaction: ITransaction[] = [];

  for (var i = 0, max = transaction.length; i < max; i++) {
    const ele = transaction[i];
    var dt = moment(ele.date).format("MM-DD-YYYY");
    console.log(dt);
    if (moment(dt).isSame(moment(now))) {
      nowDayTransaction.push(ele);
    }
  }

  const pieData = {
    labels: categoryName,
    datasets: [
      {
        data: pieDayData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#555555"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#555555"],
      },
    ],
  };

  category.map((ele, idx) => (categoryName[idx] = ele.name));

  for (i = 0; i < categoryName.length; i++) {
    pieDayData[i] = {
      temp: 0,
      value: 0,
    };
  }

  for (i = 0; i < categoryName.length; i++) {
    for (var j = 0; j < nowDayTransaction.length; j++) {
      if (categoryName[i] === nowDayTransaction[j].category) {
        pieDayData[i].value = pieDayData[i].temp + nowDayTransaction[j].amount;
        pieDayData[i].temp = pieDayData[i].value;
      }
    }
  }
  var totalValue = 0;
  for (i = 0; i < pieDayData.length; i++) {
    totalValue += pieDayData[i].value;
  }
  return (
    <div className="chartContainer">
      {totalValue === 0 ? (
        <div>No Spend Data</div>
      ) : (
        <div className="chartContainer">
          <Doughnut options={pieOptions} data={pieData} />
          <div className="chartInner">
            <div className="chartValue">${totalValue}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export const SummaryTab: React.FC<TabPanelProps> = ({ value, index }) => {
  const [state, setState] = useState("monthly");

  const handleDaily = () => {
    setState("daily");
  };
  const handleWeekly = () => {
    setState("weekly");
  };
  const handleMonthly = () => {
    setState("monthly");
  };
  return (
    <>
      {value === index && (
        <>
          <Button onClick={handleDaily}>Daily</Button>
          <Button onClick={handleWeekly}>Weekly</Button>
          <Button onClick={handleMonthly}>Monthly</Button>
          {state === "monthly" && (
            <>
              <BarChartSection />
              <MonthlyPieChartSection />
            </>
          )}
          {state === "weekly" && (
            <>
              <WeeklyBarChartSection />
              <WeeklyPieChartSection />
            </>
          )}
          {state === "daily" && (
            <>
              <BarChartSectionDay />
              <DailyPieChartSection />
            </>
          )}
        </>
      )}
    </>
  );
};
