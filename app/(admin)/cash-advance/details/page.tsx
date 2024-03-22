"use client";
/* eslint-disable react/no-unescaped-entities */
import GoBack from "@/components/shared/GoBack";
import { Button } from "@/components/ui/button";
import {
  breakdownModal,
  useAddAndEditBreakDownModal,
} from "@/store/modals/useCreateModal";
import { columns } from "../../consultants/columns";
import { DataTable } from "@/components/shared/DataTable";
import { data } from "../../consultants/data";

export default function CashAdvanceDetailsPage() {
  const onOpen = useAddAndEditBreakDownModal((state) => state.onOpen);

  
  const setModalType = (args: breakdownModal) => {
    if (args == "add") {
      useAddAndEditBreakDownModal.setState({
        breakdownModalType: "add",
      });
    }
    if (args == "edit") {
      useAddAndEditBreakDownModal.setState({
        breakdownModalType: "edit",
      });
    }
    onOpen();
  };

  return (
    <div>
      <GoBack />
      <div>
        <div className="flex flex-col">
          <aside className="bg-white flex flex-col md:grid md:grid-cols-6 border border-borderColor rounded-md shadow-sm w-full p-3 lg:p-8 lg:px-12 ">
            <div className="col-span-2 space-y-2 pb-5 md:pb-0">
              <h1 className="font-semibold text-responsive">
                Cash Advance details
              </h1>
              <p className="text-textColor">Submitted on Jul, 2023</p>
              <Button className="w-max" onClick={() => setModalType("add")}>
                Add Breakdown
              </Button>
            </div>
            <div className="flex flex-col md:flex-row col-span-4">
              <div className="flex-1 w-full pb-5 md:w-1/2 flex justify-between lg:pr-8 gap-3 ">
                <div className="flex flex-col gap-10 w-1/2 flex-1 text-textColor text-sm">
                  <span>Request code:</span>
                  <span>Staff Name:</span>
                  <span>Project Name:</span>
                  <span>Date Updated::</span>
                  <span>Amount Recorded:</span>
                  <span>Supervisor's Comment:</span>
                </div>

                <div className="flex flex-col gap-10 w-1/2 flex-1 text-sm">
                  <span>RCPD119548</span>

                  <span>Bode Peters</span>

                  <span>GRA Office Renovation</span>
                  <span>₦1,000,000</span>
                  <span>6, Jul, 2023</span>

                  <span>
                    This building project is set to redefine the structure of
                    accomodation in the area
                  </span>
                </div>
              </div>

              <div className="flex-1 w-full pb-5 md:w-1/2 flex gap-3 justify-between lg:pr-8  ">
                <div className="flex flex-col gap-10 w-1/2 flex-1 text-textColor text-sm">
                  <span>Request code:</span>
                  <span>Staff Name:</span>
                  <span>Project Name:</span>
                  <span>Supervisor's Comment:</span>
                </div>

                <div className="flex flex-col gap-10 w-1/2 flex-1 text-sm">
                  <span>RCPD119548</span>
                  <span>Bode Peters</span>
                  <span>GRA Office Renovation</span>
                  <span>
                    This building project is set to redefine the structure of
                    accomodation in the area
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <div className="py-5">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
