import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ErrorText } from "components";
import CircularProgress from "@mui/material/CircularProgress";
import { IPageProps, IExpense, IIncome, IUser } from "interfaces";
import config from "config/config";
import logging from "config/logging";

export const HomePage: React.FC<IPageProps> = (props) => {
  const [expense, setExpense] = useState<IExpense[]>([]);
  const [income, setIncome] = useState<IIncome[]>([]);
  const [list, setList] = useState<IExpense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    listExpenseIncome();
  }, []);

  const listExpenseIncome = async () => {
    try {
      const responseE = await axios({
        method: "GET",
        url: `${config.server.url}/api/expense`,
      });

      const responseI = await axios({
        method: "GET",
        url: `${config.server.url}/api/income`,
      });

      if (
        responseE.status === (200 || 304) ||
        responseI.status === (200 || 304)
      ) {
        let expense = responseE.data.expenses as IExpense[];
        console.log("responseI", responseI.data);
        let income = responseI.data.incomes as IIncome[];
        let list = expense.concat(income);
        expense.sort((x, y) => y.updatedAt.localeCompare(x.updatedAt));
        income.sort((x, y) => y.updatedAt.localeCompare(x.updatedAt));
        list.sort((x, y) => y.updatedAt.localeCompare(x.updatedAt));

        setExpense(expense);
        setIncome(income);
        setList(list);
      }
    } catch (error) {
      logging.info(error);
      setError("Unable to retrieve expense");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  if (loading) return <CircularProgress color="inherit" />;

  return (
    <div>
      <p>Welcome to this page that is protected by Friebase auth!</p>
      <p>
        Change your password <Link to="/edit">here</Link>.
      </p>
      <p>
        Click <Link to="/logout">here</Link> to logout.
      </p>
      <div>
        {list.length === 0 && (
          <p>There are no blogs yet. You should post one 😊.</p>
        )}
        {list.map((list, index) => {
          return (
            <div key={index}>
              {/* _id={expense._id} */}
              category={list.category}
              {/* user={(expense.user as IUser).name} */}
              description={list.description}
              amount={list.amount}
              createdAt={list.createdAt}
              updatedAt={list.updatedAt}
              <hr />
            </div>
          );
        })}
        <ErrorText error={error} />
      </div>
    </div>
  );
};
