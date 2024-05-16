"use client";

import GoBack from "@/components/shared/GoBack";
import { useGetCashAdvanceById } from "@/hooks/useSelectOptions";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

type Params = {
  params: {
    id: string;
  };
};

export default function ApprovedDetails({ params }: Params) {
  const id = params.id;
  const { details } = useGetCashAdvanceById(id);
  return (
    <div>
      <GoBack />
      <div>
        <div className="flex flex-col">
          <aside className="bg-white flex flex-col border border-borderColor rounded-md shadow-sm w-[95%] mx-auto p-3 lg:p-8 lg:px ">
            <div className="col-span-2 space-y-2 pb-5">
              <h1 className="font-semibold text-responsive">
                IOU / Returned Balance Details
              </h1>
              <p className="text-textColor">Submitted on Jul, 2023</p>
            </div>
            <div className="flex flex-col md:flex-row col-span-4 mt-4">
              <div className="flex-1 w-full pb-5 md:w-1/2 flex justify-between lg:pr-8 gap-3 ">
                <div className="flex flex-col gap-10 w-1/2 flex-1 text-textColor text-sm">
                  <span>Request code:</span>
                  <span>Cash Advance ID:</span>
                  <span>Amount:</span>
                  <span>Added by:</span>
                  <span>Approved/Rejected by:</span>
                </div>

                <div className="flex flex-col gap-10 w-1/2 flex-1 text-sm">
                  <span className="uppercase">{details?.request_code}</span>

                  <span>{details?.cash_id}</span>

                  <span>{formatCurrency(details?.amount_recorded)}</span>
                  <span>{details?.staff_name}</span>

                  <span>{details?.action_by ?? "-"}</span>
                </div>
              </div>

              <div className="flex-1 w-full pb-5 md:w-1/2 flex gap-3 justify-between lg:pr-8  ">
                <div className="flex flex-col gap-10 w-1/2 flex-1 text-textColor text-sm">
                  <span>Request type:</span>
                  <span>Status:</span>
                  <span>Description:</span>
                  <span>Reason:</span>
                </div>

                <div className="flex flex-col gap-10 w-1/2 flex-1 text-sm capitalize">
                  <span>{details?.cash_advance_type}</span>
                  <span>{details?.decision}</span>
                  <span>{details?.description}</span>
                  <span>{details?.decision_reason ?? "-"}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
