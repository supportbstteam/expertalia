"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCompanyInfoTab } from "@/redux/uiSlice";
import { useSearchParams } from "next/navigation";
import BasicInfo from "./BasicInfo";
import ProfitAndLoss from "./ProfitAndLoss";
import BalanceSheet from "./BalanceSheet";
import BusinessPlan from "./BusinessPlan";
import SPC from "./SPC";
import AdditionalDocuments from "./AdditionalDocuments";

export default function CompanyDetailsCard() {
  const activeTab = useSelector((state) => state.ui.companyInfoTab);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "company";

  useEffect(() => {
    dispatch(setCompanyInfoTab(tab));
  }, [dispatch, tab]);

  console.log(activeTab);

  const renderTabContent = () => {
    switch (activeTab) {
      case "company":
        return (
          <>
            <BasicInfo />
            <ProfitAndLoss />
            <BalanceSheet />
            <BusinessPlan />
            <SPC />
          </>
        );
      case "transaction":
        return (
          <div className="p-6 rounded-xl shadow-sm bg-white mb-6 text-gray-700">
            {/* Replace this with actual Transaction Information component */}
            <p>Transaction information goes here.</p>
          </div>
        );
      case "documents":
        return <AdditionalDocuments />;
      default:
        return null;
    }
  };

  return (
    <>
      <section className="p-6 rounded-xl shadow-sm bg-white mb-6">
        {/* Info Banner */}
        <div className="bg-yellow-100 border border-yellow-200 rounded-md p-4 text-sm text-yellow-800 flex justify-between items-center mb-6">
          <span>
            <strong>You have information pending to fill out.</strong> Complete
            and check that your information is correct, or contact a Deal
            Manager.
          </span>
          <a href="#" className="underline font-medium">
            Contact
          </a>
        </div>

        {/* Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-[#0c1c3f]">
            Company details
          </h2>
          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="border border-[#cfcfe4] rounded-full px-5 py-2 text-sm font-medium hover:bg-gray-100 transition">
              Download Teaser
            </button>
            <button className="bg-[#3f4fff] hover:bg-[#2f3fe4] text-white rounded-full px-5 py-2 text-sm font-medium">
              Company state
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b text-sm mb-6 space-x-8">
          <button
            onClick={() => dispatch(setCompanyInfoTab("company"))}
            className={`pb-2 border-b-2 font-medium ${
              activeTab === "company"
                ? "border-[#3f4fff] text-[#0c1c3f]"
                : "border-transparent text-[#666c89] hover:text-[#0c1c3f]"
            }`}
          >
            Company information
          </button>
          <button
            onClick={() => dispatch(setCompanyInfoTab("transaction"))}
            className={`pb-2 border-b-2 font-medium ${
              activeTab === "transaction"
                ? "border-[#3f4fff] text-[#0c1c3f]"
                : "border-transparent text-[#666c89] hover:text-[#0c1c3f]"
            }`}
          >
            Transaction information
          </button>
          <button
            onClick={() => dispatch(setCompanyInfoTab("documents"))}
            className={`pb-2 border-b-2 font-medium ${
              activeTab === "documents"
                ? "border-[#3f4fff] text-[#0c1c3f]"
                : "border-transparent text-[#666c89] hover:text-[#0c1c3f]"
            }`}
          >
            Additional documentation
          </button>
        </div>
      </section>

      {/* Tab Content */}
      {renderTabContent()}
    </>
  );
}
