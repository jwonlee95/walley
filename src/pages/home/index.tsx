import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ErrorText,
  AppWrapper,
  HomeTab,
  ExpenseTab,
  SummaryTab,
} from "components";
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
      setLoading(false);
    }
  }, [userSelector.userData]);

  if (loading) return <CircularProgress color="inherit" />;

  return (
    <AppWrapper title="Home">
      <HomeTab></HomeTab>
    </AppWrapper>
  );
};
