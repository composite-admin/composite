'use client'
/* eslint-disable react/no-unescaped-entities */
import GoBack from "@/components/shared/GoBack";
import { Button } from "@/components/ui/button";
import { useAddCommentModal, useUpdateRequestModal } from "@/store/modals/useCreateModal";
import { getrequestById, useRequestStore } from "@/store/requests/RequestStore";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { useQuery } from "@tanstack/react-query";

export default function RequestDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { onOpen } = useAddCommentModal();
  const onRequestModal = useUpdateRequestModal((state) => state.onOpen);
  const { requestDetails } = useRequestStore();

  const { data, isPending } = useQuery({
    queryKey: ["get all tenants", params.id],
    queryFn: () => getrequestById(params.id),
  });

  return (
    <div>
      <GoBack btnText="Add Comment" withBtn onclick={onOpen} />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:grid grid-cols-1 xl:grid-cols-6 gap-8">
          <aside className="bg-white border-borderColor shadow-sm col-span-4 p-3 lg:p-8 lg:px-12 ">
            <div className="flex justify-between items-center flex-col lg:flex-row pb-5">
              <h2 className="pb-5 font-bold capitalize">Request details</h2>
              <p className="capitalize bg-green-100 text-green-700 font-semibold p-1.5 rounded-lg">
                {data?.request_type}
              </p>
            </div>
            <div className="flex flex-col gap-5 md:flex-row">
              <div className="flex-1 w-full pb-5 md:w-1/2 flex flex-col justify-between lg:pr-8 gap-3 ">
                <div className="flex justify-between items-center w-full">
                  <span>Request code:</span>
                  <span className="uppercase text-sm font-semibold">
                    {data?.request_code}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span>Staff Name:</span>
                  <span className=" text-sm capitalize font-semibold">
                    {data?.staff_name}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span>Project Name:</span>
                  <span className=" text-sm font-semibold">
                    {data?.project_name}
                  </span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span>Supervisor's Comment:</span>
                  <span className=" text-sm font-semibold">
                    {data?.supervisor_comment}
                  </span>
                </div>
              </div>

              <div className="flex-1 w-full pb-5 md:w-1/2 flex gap-3 justify-between lg:pr-8  ">
                <div className="flex flex-col gap-10 w-1/2 flex-1 text-textColor text-sm">
                  <div className="flex justify-between items-center w-full">
                    <span>Date Added:</span>
                    <span className=" text-sm capitalize font-semibold">
                      {data && formatDate(data?.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span>Status:</span>
                    <span className=" text-sm capitalize font-semibold">
                      {data?.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span>Project Code:</span>
                    <span className=" text-sm capitalize font-semibold">
                      {data?.project_code}
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span>Requestor's Comment:</span>
                    <span className=" text-sm capitalize font-semibold">
                      {data?.comment}
                    </span>
                  </div>
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
                  <span>{formatCurrency(requestDetails?.amount ?? 0)}</span>
                  <span>
                    {formatCurrency(requestDetails?.approved_amount ?? 0)}
                  </span>
                </div>
              </div>

              <div className="bg-[#FEF6e7] p-3 text-[#865503] text-center lg:tracking-widest mb-12">
                <span>Status:</span>
                <span className="uppercase lg:text-xl font-semibold">
                  {requestDetails?.status}
                </span>
              </div>

              <div className="space-y-2">
                <h2>Project Summary</h2>
                <p className="font-semibold pb-6 flex flex-col gap-1">
                  {requestDetails?.description}
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* sevice details */}
        <div>
          <div className="flex flex-col md:grid grid-cols-1 xl:grid-cols-6 gap-8">
            <aside className="bg-white border-borderColor shadow-sm col-span-4 p-3 lg:p-8 lg:px-12 ">
              <h2 className="font-bold mb-4">Service Details</h2>
              <div className="flex flex-col md:flex-row md:gap-8">
                <div className="flex-1 w-full pb-5 md:w-1/2 flex justify-between gap-3  ">
                  <div className="flex flex-col gap-10 flex-1 text-textColor text-sm  ">
                    <div className="flex justify-between">
                      <span>Cash Advance Requested Purpose:</span>
                      <span className="text-sm font-semibold text-black">
                        {requestDetails?.cash_advance_purpose}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Service Rendered:</span>
                      <span className="text-sm font-semibold text-black">
                        {requestDetails?.worker_service}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Company Phone:</span>
                      <span className="text-sm font-semibold text-black">
                        {requestDetails?.company}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Contact Person:</span>
                      <span className="text-sm font-semibold text-black">
                        {requestDetails?.contact_person}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 w-full pb-5 md:w-1/2 flex gap-3 justify-between lg:pr-8  ">
                  <div className="flex flex-col gap-10 w-1/2 flex-1 text-textColor text-sm">
                    <div className="flex justify-between">
                      <span>Worker's Name:</span>
                      <span className="text-sm font-semibold text-black">
                        {requestDetails?.worker_name}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Company:</span>
                      <span className="text-sm font-semibold text-black">
                        {requestDetails?.company}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Company:</span>
                      <span className="text-sm font-semibold text-black">
                        {requestDetails?.company_address}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Contact Mobile:</span>
                      <span className="text-sm font-semibold text-black">
                        {requestDetails?.contact_mobile}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <aside className="bg-white border-borderColor shadow-sm w-full xl:col-span-2">
              <div className="p-3 lg:p-6 space-y-5">
                <h2 className="font-semibold mb-4">Cash Summary</h2>
                <div className="flex justify-between items-center">
                  <span>Approved quantity</span>
                  <span>{requestDetails?.approved_quantity}</span>
                </div>{" "}
                <div className="flex justify-between items-center">
                  <span>Approved unit price</span>
                  <span>
                    {data && formatCurrency(requestDetails?.unit_price)}
                  </span>
                </div>{" "}
                <div className="flex justify-between items-center">
                  <span>Requested Total Price</span>
                  <span>
                    {data && formatCurrency(requestDetails?.total_price)}
                  </span>
                </div>{" "}
                <div className="flex justify-between items-center">
                  <span>Approved Total Price</span>
                  <span>
                    {data && formatCurrency(requestDetails?.total_price)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Approved On</span>
                  <span>
                    {requestDetails && formatDate(requestDetails?.approved_on)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Approved Total Price</span>
                  <span>{requestDetails?.comment}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 py-8">
        <Button className="md:w-1/3" onClick={onRequestModal}>
          Request more information
        </Button>
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
