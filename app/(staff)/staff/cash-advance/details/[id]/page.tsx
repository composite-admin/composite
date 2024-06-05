"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import GoBack from "@/components/shared/GoBack";
import { Button } from "@/components/ui/button";
import {
  breakdownModal,
  useAddAndEditBreakDownModal,
} from "@/store/modals/useCreateModal";
import { DataTable } from "@/components/shared/DataTable";
import {
  useGetCashAdvanceBreakdownByCode,
  useGetCashAdvanceById,
} from "@/hooks/useSelectOptions";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { ICashAdvanceBreakdownData, ICashAdvanceData } from "@/utils/types";
import useCashAdvanceStore from "@/store/cash-advance/useCashAdvanceStore";
import { columns } from "./columns";

type Params = {
  params: {
    id: string;
  };
};

interface DetailsField {
  label: string;
  value: keyof ICashAdvanceData;
  format?: (value: any) => string;
}

const detailsFields: DetailsField[] = [
  {
    label: "Request code",
    value: "request_code",
    format: (val) => val?.toUpperCase(),
  },
  { label: "Staff Name", value: "staff_name" },
  { label: "Transfer Method", value: "payment_method" },
  { label: "Bank Name", value: "bank_to" },
  { label: "Date Updated", value: "updatedAt", format: formatDate },
  { label: "Project Name", value: "project_name" },
  {
    label: "Amount Collected",
    value: "amount_collected",
    format: formatCurrency,
  },
  {
    label: "Amount Recorded",
    value: "amount_recorded",
    format: formatCurrency,
  },
  { label: "Balance", value: "balance", format: formatCurrency },
];

export default function CashAdvanceDetailsPage({
  params,
}: Params): JSX.Element {
  const id = params.id;
  const onOpen = useAddAndEditBreakDownModal((state) => state.onOpen);
  const { details } = useGetCashAdvanceById(id);
  const { setCashAdvanceDetails } = useCashAdvanceStore();
  const { cashAdvanceBreakdown, isBreakDownLoading } =
    useGetCashAdvanceBreakdownByCode(details?.request_code!);

  useEffect(() => {
    if (details) {
      setCashAdvanceDetails(details);
    }
  }, [details, setCashAdvanceDetails]);

  const setModalType = (args: breakdownModal) => {
    if (args === "add") {
      useAddAndEditBreakDownModal.setState({ breakdownModalType: "add" });
    } else if (args === "edit") {
      useAddAndEditBreakDownModal.setState({ breakdownModalType: "edit" });
    }
    onOpen();
  };

  return (
    <div>
      <GoBack />
      <div>
        <div className="flex flex-col">
          <aside className="bg-white flex flex-col md:grid md:grid-cols-6 border border-borderColor rounded-md shadow-sm w-full p-3 lg:p-8 lg:px-12">
            <div className="col-span-2 space-y-2 pb-5 md:pb-0">
              <h1 className="font-semibold text-responsive">
                Cash Advance details
              </h1>
              <p className="text-textColor">
                Submitted on {details && formatDate(details.createdAt)}
              </p>
              <Button className="w-max" onClick={() => setModalType("add")}>
                Add Breakdown
              </Button>
            </div>
            <div className="flex flex-col md:flex-row col-span-4">
              <div className="flex-1 w-full pb-5 md:w-1/2 flex justify-between lg:pr-8 gap-3">
                <div className="flex flex-col gap-5 w-1/2 flex-1 text-textColor text-sm">
                  {detailsFields.slice(0, 5).map((field) => (
                    <>
                      <span
                        key={field.label}
                        className="font-semibold text-black"
                      >
                        {field.label}:
                      </span>
                      <span key={field.label}>
                        {field.format
                          ? field.format(details?.[field.value])
                          : details?.[field.value]}
                      </span>
                    </>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full pb-5 md:w-1/2 flex gap-3 justify-between lg:pr-8">
                <div className="flex flex-col gap-5 w-1/2 flex-1 text-textColor text-sm">
                  {detailsFields.slice(5).map((field) => (
                    <>
                      <span
                        key={field.label}
                        className="font-semibold text-black"
                      >
                        {field.label}:
                      </span>
                      <span key={field.label}>
                        {field.format
                          ? field.format(details?.[field.value])
                          : details?.[field.value]}
                      </span>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <div className="py-5">
        <DataTable
          columns={columns}
          data={cashAdvanceBreakdown ?? []}
          isLoading={isBreakDownLoading}
        />
      </div>
    </div>
  );
}
