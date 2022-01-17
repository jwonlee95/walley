import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ErrorText, AppWrapper } from "components";
import CircularProgress from "@mui/material/CircularProgress";
import {
  IPageProps,
  IExpense,
  IIncome,
  ICategory,
  ISubscription,
} from "interfaces";
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
  const [subscription, setSubscription] = useState<ISubscription[]>([]);
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
        {category.length !== 0 && <b>These are category 😊.</b>}
        {category.map((category, index) => {
          return (
            <div key={index}>
              category={category.name}
              budget={category.budget}
              spent={category.spent}
              remain={category.budget - category.spent}
              <hr />
            </div>
          );
        })}
        <ErrorText error={error} />
      </div>

      <div>
        {subscription.length === 0 && <p>There are no subscriptions 😊.</p>}
        {subscription.length !== 0 && <b>These are Subscriptions 😊.</b>}
        {subscription.map((subscription, index) => {
          return (
            <div key={index}>
              amount={subscription.amount}
              name={subscription.description}
              recurDate={subscription.recurDate}
              <hr />
            </div>
          );
        })}
        <ErrorText error={error} />
      </div>

      <div>
        {list.length === 0 && <p>There are no use history 😊.</p>}
        {list.length !== 0 && <b>These are use history 😊.</b>}
        {list.map((list, index) => {
          return (
            <Link to={`/${list._id}`} key={index}>
              {/* _id={expense._id} */}
              category={list.category}
              description={list.description}
              amount={list.amount}
              createdAt={list.createdAt}
              updatedAt={list.updatedAt}
              <hr />
            </Link>
          );
        })}
        <ErrorText error={error} />
        {/* <button onClick={}>Test</button> */}
      </div>
    </AppWrapper>
  );
};
