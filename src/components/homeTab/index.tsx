import React, { useState } from "react";

import { AccountsTab, SummaryTab, CMTabs, CMTab } from "components";

export const HomeTab: React.FC<{}> = () => {
  const [value, setValue] = useState<number>(0);
  const [accountsClicked, setAccountsClicked] = useState<boolean>(true);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      setAccountsClicked(true);
    } else {
      setAccountsClicked(false);
    }
  };
  return (
    <>
      <CMTabs value={value} onChange={handleChange} centered>
        <CMTab label="Accounts" clicked={accountsClicked}></CMTab>
        <CMTab label="Summary" clicked={!accountsClicked}></CMTab>
      </CMTabs>
      <AccountsTab value={value} index={0} />
      <SummaryTab value={value} index={1} />
    </>
  );
};
