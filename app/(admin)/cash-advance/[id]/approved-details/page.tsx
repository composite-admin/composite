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
                <div className="flex flex-col gap-3 w-1/2 flex-1 ">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">Request code:</span>
                    <span className="uppercase text-textColor">
                      {details?.request_code}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">Cash advance type:</span>
                    <span className="text-textColor">
                      {details?.cash_advance_type}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">Amount recorded:</span>
                    <span className="text-textColor">
                      {formatCurrency(details?.amount_recorded)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">Balance:</span>
                    <span className="text-textColor">
                      {formatCurrency(details?.balance)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">Added by:</span>
                    <span className="text-textColor">
                      {details?.staff_name}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">Approved/Rejected by:</span>
                    <span className="text-textColor">
                      {details?.action_by ?? "-"}
                    </span>
                  </div>

                  {/* <span>Cash Advance ID:</span>
                  <span>{details?.cash_id}</span>
                  <span>Amount:</span>
                  <span>{formatCurrency(details?.amount_recorded)}</span>
                  <span>Added by:</span>
                  <span>{details?.staff_name}</span>
                  <span>Approved/Rejected by:</span>
                  <span>{details?.action_by ?? "-"}</span> */}
                </div>
              </div>

              <div className="flex-1 w-full pb-5 md:w-1/2 flex gap-3 justify-between lg:pr-8  ">
                <div className="flex flex-col gap-3 w-1/2 flex-1 ">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">Status:</span>
                    <span className="text-textColor">{details?.decision}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">Description:</span>
                    <span className="text-textColor">
                      {details?.description}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">Reason:</span>
                    <span className="text-textColor">
                      {details?.decision_reason ?? "-"}
                    </span>
                  </div>
                </div>

                {/* <div className="flex flex-col gap-3 w-1/2 flex-1 font-semibold">
                  <span>Request type:</span>
                  <span>Status:</span>
                  <span>Description:</span>
                  <span>Reason:</span>
                </div>

                <div className="flex flex-col gap-3 w-1/2 flex-1 text-sm capitalize text-textColor">
                  <span>{details?.cash_advance_type}</span>
                  <span>{details?.decision}</span>
                  <span>{details?.description}</span>
                  <span>{details?.decision_reason ?? "-"}</span>
                </div> */}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
