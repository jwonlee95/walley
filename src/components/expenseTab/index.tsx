import React from "react";
import {
  TabPanelProps,
  PlusButton,
  CategoryCard,
  SubscriptionCard,
  FinanceTable,
} from "components";
import { CategoryIcons } from "assets";
import { Icon } from "@mui/material";

const TabSectionHeading: React.FC<{ title: string }> = (props) => {
  return (
    <div className="tab-section-heading">
      {props.title}
      <PlusButton />
    </div>
  );
};

const CategorySection = () => {
  return (
    <div className="tab-wrapper">
      <TabSectionHeading title="Category" />
      <div className="cards-wrapper">
        <CategoryCard
          icon={CategoryIcons.pet}
          name="Pet"
          budget={200}
          remain={100}
          color="red"
        />
        <CategoryCard
          icon={CategoryIcons.transit}
          name="Transit"
          budget={200}
          remain={100}
          color="red"
        />
        <CategoryCard
          icon={CategoryIcons.car}
          name="Car"
          budget={200}
          remain={100}
          color="red"
        />
        <CategoryCard
          icon={CategoryIcons.game}
          name="Game"
          budget={200}
          remain={100}
          color="red"
        />
        <CategoryCard
          icon={CategoryIcons.shopping}
          name="Shopping"
          budget={200}
          remain={100}
          color="red"
        />
        <CategoryCard
          icon={CategoryIcons.food}
          name="Food"
          budget={200}
          remain={100}
          color="red"
        />
        <CategoryCard
          icon={CategoryIcons.grocery}
          name="Grocery"
          budget={200}
          remain={100}
          color="red"
        />
        <CategoryCard
          icon={CategoryIcons.others}
          name="Others"
          budget={200}
          remain={100}
          color="red"
        />
      </div>
    </div>
  );
};

const SubscriptionSection = () => {
  return (
    <div className="tab-wrapper">
      <TabSectionHeading title="Subscription" />
      <div className="cards-wrapper">
        <SubscriptionCard name="iCloud" amount={9.99} remainingDay={3} />
        <SubscriptionCard name="Netflix" amount={12.99} remainingDay={9} />
        <SubscriptionCard name="HBO Max" amount={14.99} remainingDay={12} />
        <SubscriptionCard name="Amazon Prime" amount={6.49} remainingDay={15} />
        <SubscriptionCard
          name="YouTube Premium"
          amount={9.99}
          remainingDay={16}
        />
        <SubscriptionCard name="Disney +" amount={11.99} remainingDay={16} />
        <SubscriptionCard name="Uber One" amount={9.99} remainingDay={20} />
        <SubscriptionCard name="DoorDash" amount={7.99} remainingDay={28} />
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
export const ExpenseTab: React.FC<TabPanelProps> = ({ index, value }) => {
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
