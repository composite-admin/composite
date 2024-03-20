'use client'
/* eslint-disable react/no-unescaped-entities */
import GoBack from "@/components/shared/GoBack";
import { Button } from "@/components/ui/button";
import { useAddCommentModal, useUpdateRequestModal } from "@/store/modals/useRequestModal";

export default function RequestDetailsPge() {
  const onOpen = useAddCommentModal((state) => state.onOpen)
  const onRequestModal = useUpdateRequestModal((state) => state.onOpen)
  return (
    <div>
      <GoBack btnText="Add Comment" withBtn onClick={onOpen} />
      <div className="flex flex-col gap-6">
        {/* request details */}
        <div className="flex flex-col md:grid grid-cols-1 xl:grid-cols-6 gap-8">
          <aside className="bg-white border-borderColor shadow-sm col-span-4 p-3 lg:p-8 lg:px-12 ">
            <h2>Request details</h2>
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 w-full pb-5 md:w-1/2 flex justify-between lg:pr-8 gap-3 ">
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

          <aside className="bg-white border-borderColor shadow-sm w-full xl:col-span-2">
            <div className="p-3 lg:p-6">
              <h2 className="font-semibold mb-4">Request Summary</h2>

              <div className="flex-1 w-full pb-5 flex justify-between items-center">
                <div className="flex flex-col gap-7 w-1/2 flex-1 text-textColor text-sm">
                  <span>Requested Amount:</span>
                  <span>Approved Amount:</span>
                </div>

                <div className="flex flex-col gap-10 text-xl font-bold">
                  <span>N100,100</span>
                  <span>N80,000</span>
                </div>
              </div>

              <div className="bg-[#FEF6e7] p-3 text-[#865503] text-center lg:tracking-widest mb-12">
                <span>Status:</span>
                <span className="uppercase lg:text-xl font-semibold">
                  pending request
                </span>
              </div>

              <div className="space-y-2">
                <h2>Project Summary</h2>
                <p className="font-semibold pb-6 flex flex-col gap-1">
                  <span>
                    Cway Water X4 @650 -N2600 Disel - N20000 Fuel - N5000
                  </span>
                  <br />
                  <span>
                    Cway Water X4 @650 -N2600 Disel - N20000 Fuel - N5000
                  </span>
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* sevice details */}
        <div>
          <div className="flex flex-col md:grid grid-cols-1 xl:grid-cols-6 gap-8">
            <aside className="bg-white border-borderColor shadow-sm col-span-4 p-3 lg:p-8 lg:px-12 ">
              <h2>Request details</h2>
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 w-full pb-5 md:w-1/2 flex justify-between lg:pr-8 gap-3 ">
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

            <aside className="bg-white border-borderColor shadow-sm w-full xl:col-span-2">
              <div className="p-3 lg:p-6">
                <h2 className="font-semibold mb-4">Request Summary</h2>

                <div className="flex-1 w-full pb-5 flex justify-between items-center">
                  <div className="flex flex-col gap-7 w-1/2 flex-1 text-textColor text-sm">
                    <span>Requested Amount:</span>
                    <span>Approved Amount:</span>
                  </div>

                  <div className="flex flex-col gap-10 text-xl font-bold">
                    <span>N100,100</span>
                    <span>N80,000</span>
                  </div>
                </div>

                <div className="bg-[#FEF6e7] p-3 text-[#865503] text-center lg:tracking-widest mb-12">
                  <span>Status:</span>
                  <span className="uppercase lg:text-xl font-semibold">
                    pending request
                  </span>
                </div>

                <div className="space-y-2">
                  <h2>Project Summary</h2>
                  <p className="font-semibold pb-6 flex flex-col gap-1">
                    <span>
                      Cway Water X4 @650 -N2600 Disel - N20000 Fuel - N5000
                    </span>
                    <br />
                    <span>
                      Cway Water X4 @650 -N2600 Disel - N20000 Fuel - N5000
                    </span>
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 py-8">
        <Button className="md:w-1/3" onClick={onRequestModal}>Request more information</Button>
        <Button className="md:w-1/3" variant={"destructive"}>
          Decline
        </Button>
        <Button className="md:w-1/3 bg-[#27AE60] hover:bg-[#27AE60]/90">
          Approve
        </Button>
      </div>
    </div>
  );
}
