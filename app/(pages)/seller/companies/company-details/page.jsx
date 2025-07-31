"use client";

import BasicInfo from "./BasicInfo";
import ProfitAndLoss from "./ProfitAndLoss";
import BalanceSheet from "./BalanceSheet";

export default function CompanyDetailsCard() {
  return (
    <>
      <BasicInfo />
      <ProfitAndLoss />
      <BalanceSheet />
    </>
  );
}
