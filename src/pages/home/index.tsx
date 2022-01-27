import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateContext, UserContext, SetterContext } from "contexts";
import { AppWrapper, HomeTab, ActivityIndicator } from "components";

import {
  IPageProps,
  IExpense,
  IIncome,
  ICategory,
  ISubscription,
} from "interfaces";
import { reducerState } from "common/store";
import { GetUserData } from "common/action";

export const HomePage: React.FC<IPageProps> = (props) => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state: reducerState) => state.user);

  const [loading, setLoading] = useState<boolean>(true);
  const [balance, setBalance] = useState<number>(0);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [expense, setExpense] = useState<IExpense[]>([]);
  const [income, setIncome] = useState<IIncome[]>([]);
  const [subscription, setSubscription] = useState<ISubscription[]>([]);
  const { user } = useContext(UserContext).userState;

  const setterContext = {
    setBalance,
    setCategory,
    setExpense,
    setIncome,
    setSubscription,
  };
  const stateContext = {
    balance,
    category,
    expense,
    income,
    subscription,
  };

  useEffect(() => {
    dispatch(GetUserData(user._id));
  }, []);

  useEffect(() => {
    if (userSelector.userData) {
      setBalance(userSelector.userData.balance);
      setCategory(userSelector.userData.category);
      setExpense(userSelector.userData.expense);
      setIncome(userSelector.userData.income);
      setSubscription(userSelector.userData.subscription);
      setLoading(false);
    }
  }, [userSelector.userData]);

  if (loading) return <ActivityIndicator />;

  return (
    <AppWrapper title="Home">
      <SetterContext.Provider value={setterContext}>
        <StateContext.Provider value={stateContext}>
          <HomeTab></HomeTab>
        </StateContext.Provider>
      </SetterContext.Provider>
    </AppWrapper>
  );
};
