import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ErrorText, AppWrapper } from "components";
import CircularProgress from "@mui/material/CircularProgress";
import { IPageProps, IExpense, IIncome } from "interfaces";
import UserContext from "contexts/user";
import config from "config/config";
import logging from "config/logging";

export const HomePage: React.FC<IPageProps> = (props) => {
  const [expense, setExpense] = useState<IExpense[]>([]);
  const [income, setIncome] = useState<IExpense[]>([]);
  const [list, setList] = useState<IExpense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const { user } = useContext(UserContext).userState;

  useEffect(() => {
    const listExpenseIncome = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${config.server.url}/users/${user._id}`,
        });
        console.log(response);
        if (response.status === (200 || 304)) {
          let expense = response.data.user.expense as IExpense[];
          let income = response.data.user.income as IIncome[];
          let list = expense.concat(income);
          //expense.sort((x, y) => y.updatedAt.localeCompare(x.updatedAt));
          //income.sort((x, y) => y.updatedAt.localeCompare(x.updatedAt));
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
    listExpenseIncome();
  }, []);

  if (loading) return <CircularProgress color="inherit" />;

  return (
    <AppWrapper title="Home">
      <p>Welcome to this page that is protected by Friebase auth!</p>
      <p>
        Add expense <Link to="/expense">here</Link>.
      </p>
      <p>
        Add income <Link to="/income">here</Link>.
      </p>
      <p>
        Add subscriptions <Link to="/subscription">here</Link>.
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
    </AppWrapper>
  );
};
