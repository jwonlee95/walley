import React, { useContext } from "react";
import {
  TabPanelProps,
  PlusButton,
  CategoryCard,
  SubscriptionCard,
  FinanceTable,
} from "components";
import { StateContext } from "contexts";
import moment from "moment";
import { useDispatch } from "react-redux";
import { PostNewRecurDate } from "common/action";
import UserContext from "contexts/user";

const TabSectionHeading: React.FC<{ title: string }> = (props) => {
  return (
    <div className="tab-section-heading">
      {props.title}
      <PlusButton />
    </div>
  );
};

const CategorySection = () => {
  const { category } = useContext(StateContext);

  return (
    <div className="tab-wrapper">
      <TabSectionHeading title="Category" />
      <div className="cards-wrapper">
        {category.map((ele) => (
          <CategoryCard
            icon={ele.icon}
            name={ele.name}
            budget={ele.budget}
            remain={ele.remain}
            color={ele.color}
          />
        ))}
      </div>
    </div>
  );
};

const SubscriptionSection = () => {
  const { subscription } = useContext(StateContext);

  const dispatch = useDispatch();
  const { user } = useContext(UserContext).userState;

  return (
    <div className="tab-wrapper">
      <TabSectionHeading title="Subscription" />
      <div className="cards-wrapper">
        {subscription.map((ele) => {
          const today = new Date();
          let remainingDay = moment(ele.recurDate).diff(today, "days");
          if (remainingDay < 0) {
            //post new recurDate
            const newRecurDate = moment(ele.recurDate).add(1, "M");
            const data = {
              subscription_id: ele._id,
              newRecurDate: newRecurDate,
            };
            dispatch(PostNewRecurDate(`/updateRecurDate/${user._id}`, data));
            remainingDay = moment(newRecurDate).diff(today, "days");
          }
          return (
            <SubscriptionCard
              name={ele.name}
              amount={ele.amount}
              remainingDay={remainingDay}
            />
          );
        })}
      </div>
    </div>
  );
};

const FinanceSection = () => {
  return (
    <div className="tab-wrapper">
      <TabSectionHeading title="Income/Expense" />
      <FinanceTable />
    </div>
  );
};
export const AccountsTab: React.FC<TabPanelProps> = ({ index, value }) => {
  return (
    <>
      {value === index && (
        <>
          <CategorySection />
          <SubscriptionSection />
          <FinanceSection />
        </>
      )}
    </>
  );
};
