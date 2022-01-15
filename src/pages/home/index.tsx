import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ErrorText, AppWrapper } from "components";
import CircularProgress from "@mui/material/CircularProgress";
import { IPageProps, IExpense, IIncome, ICategory } from "interfaces";
import UserContext from "contexts/user";
import config from "config/config";
import logging from "config/logging";
import { reducerState } from "common/store";
import { GetUserData } from "common/action";

export const HomePage: React.FC<IPageProps> = (props) => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state: reducerState) => state.user);

  const [category, setCategory] = useState<ICategory[]>([]);
  const [expense, setExpense] = useState<IExpense[]>([]);
  const [income, setIncome] = useState<IIncome[]>([]);
  const [list, setList] = useState<IExpense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const { user } = useContext(UserContext).userState;
  useEffect(() => {
    dispatch(GetUserData(user._id));
  }, []);
  useEffect(() => {
    if (userSelector.userData) {
      let _expense = userSelector.userData.expense as IExpense[];
      let _income = userSelector.userData.income as IIncome[];
      setExpense(_expense);
      setIncome(_income);

      let _list = _expense.concat(_income);
      _expense.sort((x, y) => y.updatedAt.localeCompare(x.updatedAt));
      _income.sort((x, y) => y.updatedAt.localeCompare(x.updatedAt));
      _list.sort((x, y) => y.updatedAt.localeCompare(x.updatedAt));

      setExpense(_expense);
      setIncome(_income);
      setList(_list);
      setLoading(false);
    }
  }, [userSelector.userData]);

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
        Add category <Link to="/category">here</Link>.
      </p>
      <p>
        Click <Link to="/logout">here</Link> to logout.
      </p>

      <div>
        {category.length === 0 && <p>There are no category 😊.</p>}
        {category.map((category, index) => {
          return (
            <div key={index}>
              category={category.name}
              budget={category.budget}
              spent={category.spent}
              remain={category.remain}
              <hr />
            </div>
          );
        })}
        <ErrorText error={error} />
      </div>

      <div>
        {list.length === 0 && <p>There are no use history 😊.</p>}
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
        {/* <button onClick={}>Test</button> */}
      </div>
    </AppWrapper>
  );
};
