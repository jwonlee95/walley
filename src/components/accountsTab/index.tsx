import React, { useContext, useState } from "react";
import {
  TabPanelProps,
  PlusButton,
  CategoryCard,
  SubscriptionCard,
  FinanceTable,
  CreateCategoryModal,
  CreateSubscriptionModal,
  CreateTransactionModal,
} from "components";

import { StateContext, UserContext } from "contexts";
import moment from "moment";
import { useDispatch } from "react-redux";
import { PostNewRecurDate } from "common/action";

const TabSectionHeading: React.FC<{ title: string; onClick: () => void }> = (
  props
) => {
  return (
    <div className="tab-section-heading">
      {props.title}
      <PlusButton onClick={props.onClick} />
    </div>
  );
};

const CategorySection = () => {
  const { category } = useContext(StateContext);
  const [open, setOpen] = useState<boolean>(false);

  const handleAddClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="tab-wrapper">
      <CreateCategoryModal open={open} onClose={handleClose} />
      <TabSectionHeading title="Category" onClick={handleAddClick} />
      <div className="cards-wrapper">
        {category.map((ele, idx) => {
          return (
            <CategoryCard
              icon={ele.icon}
              name={ele.name}
              budget={ele.budget}
              remain={ele.budget - ele.spent}
              color={ele.color}
              key={`${ele.name}-${idx}`}
            />
          );
        })}
      </div>
    </div>
  );
};

const SubscriptionSection = () => {
  const { subscription } = useContext(StateContext);
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { user } = useContext(UserContext).userState;

  const handleAddClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="tab-wrapper">
      <CreateSubscriptionModal open={open} onClose={handleClose} />

      <TabSectionHeading title="Subscription" onClick={handleAddClick} />
      <div className="cards-wrapper">
        {subscription.map((ele, idx) => {
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
              key={`${ele.name}-${idx}`}
            />
          );
        })}
      </div>
    </div>
  );
};

const FinanceSection = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleAddClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="tab-wrapper">
      <CreateTransactionModal open={open} onClose={handleClose} />

      <TabSectionHeading title="Income/Expense" onClick={handleAddClick} />
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
