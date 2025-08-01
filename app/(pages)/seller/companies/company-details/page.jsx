"use client";

import BasicInfo from "./BasicInfo";
import ProfitAndLoss from "./ProfitAndLoss";
import BalanceSheet from "./BalanceSheet";
import BusinessPlan from "./BusinessPlan";
import SPC from "./SPC";

export default function CompanyDetailsCard() {
  return (
    <>
      <BasicInfo />
      <ProfitAndLoss />
      <BalanceSheet />
      <BusinessPlan />
      <SPC />
    </>
  );
}
