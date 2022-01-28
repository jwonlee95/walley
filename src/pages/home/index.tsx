import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateContext, UserContext, SetterContext } from "contexts";
import { AppWrapper, HomeTab, ActivityIndicator } from "components";

import { IPageProps, ITransaction, ICategory, ISubscription } from "interfaces";
import { reducerState } from "common/store";
import { GetUserData } from "common/action";

export const HomePage: React.FC<IPageProps> = (props) => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state: reducerState) => state.user);

  const [loading, setLoading] = useState<boolean>(true);
  const [balance, setBalance] = useState<number>(0);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [transaction, setTransaction] = useState<ITransaction[]>([]);
  const [subscription, setSubscription] = useState<ISubscription[]>([]);
  const { user } = useContext(UserContext).userState;

  const setterContext = {
    setBalance,
    setCategory,
    setTransaction,
    setSubscription,
  };
  const stateContext = {
    balance,
    category,
    transaction,
    subscription,
  };

  useEffect(() => {
    dispatch(GetUserData(user._id));
  }, []);

  useEffect(() => {
    if (userSelector.userData) {
      setBalance(userSelector.userData.balance);
      setCategory(userSelector.userData.category);
      setTransaction(userSelector.userData.transaction);
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
