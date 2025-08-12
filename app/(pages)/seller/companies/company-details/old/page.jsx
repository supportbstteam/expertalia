"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
import { setCompanyInfoTab } from "@/redux/uiSlice";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

// ✅ Dynamically import each section
const BasicInfo = dynamic(() => import("./BasicInfo"), { ssr: false });
const ProfitAndLoss = dynamic(() => import("./ProfitAndLoss"), { ssr: false });
const BalanceSheet = dynamic(() => import("./BalanceSheet"), { ssr: false });
const BusinessPlan = dynamic(() => import("./BusinessPlan"), { ssr: false });
const SPC = dynamic(() => import("./SPC"), { ssr: false });
const AdditionalDocuments = dynamic(() => import("./AdditionalDocuments"), { ssr: false });

export default function CompanyDetailsCard() {
  return (
    <Suspense fallback={<div className="p-6">Loading company details...</div>}>
      <CompanyDetailsContent />
    </Suspense>
  );
}

function CompanyDetailsContent() {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.ui.companyInfoTab);

  // ✅ useSearchParams safely inside Suspense
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "company";

  useEffect(() => {
    dispatch(setCompanyInfoTab(tab));
  }, [dispatch, tab]);

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
      {/* Info Banner */}
      <section className="p-6 rounded-xl shadow-sm bg-white mb-6">
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
