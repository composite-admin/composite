"use client";
import { RequestColumns } from "@/app/(admin)/requests/request-details/[id]/columns";
import { DataTable } from "@/components/shared/DataTable";
/* eslint-disable react/no-unescaped-entities */
import GoBack from "@/components/shared/GoBack";
import { Button } from "@/components/ui/button";
import { useGetRequestComments } from "@/hooks/useSelectOptions";
import {
  useAddCommentModal,
  useUpdateRequestModal,
} from "@/store/modals/useCreateModal";
import { getrequestById, useRequestStore } from "@/store/requests/RequestStore";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { useQuery } from "@tanstack/react-query";

export default function RequestDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { onOpen: onAddComment } = useAddCommentModal();
  const { requestDetails } = useRequestStore();
  const { comments, isCommentsLoading } = useGetRequestComments(
    requestDetails?.request_code as string
  );

  const { data, isPending } = useQuery({
    queryKey: ["get all tenants", params.id],
    queryFn: () => getrequestById(params.id),
  });

  const requestDetailsData = [
    { label: "Request code", value: data?.request_code?.toUpperCase() },
    { label: "Staff Name", value: data?.staff_name },
    { label: "Project Name", value: data?.project_name },
    { label: "Supervisor's Comment", value: data?.supervisor_comment },
    { label: "Date Added", value: data && formatDate(data?.createdAt) },
    { label: "Status", value: data?.status },
    { label: "Project Code", value: data?.project_code?.toUpperCase() },
    { label: "Requestor's Comment", value: data?.comment },
  ];

  const serviceDetailsData = [
    {
      label: "Cash Advance Requested Purpose",
      value: requestDetails?.cash_advance_purpose,
    },
    { label: "Service Rendered", value: requestDetails?.worker_service },
    { label: "Company Phone", value: requestDetails?.company },
    { label: "Contact Person", value: requestDetails?.contact_person },
    { label: "Job Code", value: requestDetails?.job_code?.toUpperCase() },
    {
      label: "Supplier Code",
      value: requestDetails?.supplier_code?.toUpperCase(),
    },
    { label: "Worker's Name", value: requestDetails?.worker_name },
    { label: "Company", value: requestDetails?.company },
    { label: "Company Address", value: requestDetails?.company_address },
    { label: "Contact Mobile", value: requestDetails?.contact_mobile },
    { label: "Tool Name", value: requestDetails?.tool_name },
    { label: "Supplier Material", value: requestDetails?.supplier_material },
  ];

  return (
    <div>
      <GoBack />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:grid grid-cols-1 xl:grid-cols-6 gap-8">
          <aside className="bg-white border-borderColor shadow-sm col-span-4 p-3 lg:p-8 lg:px-12 ">
            <div className="flex justify-between items-center flex-col lg:flex-row pb-5">
              <h2 className="pb-5 font-bold capitalize">Request details</h2>
              <p className="capitalize bg-green-100 text-green-700 font-semibold p-1.5 rounded-lg">
                {data?.request_type}
              </p>
            </div>
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="space-y-6 ">
                {requestDetailsData.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex justify-between flex-col">
                    <span className="self-start items-start justify-end block w-full font-semibold">
                      {item.label}:
                    </span>
                    <span className="self-start items-start justify-end block w-full text-textColor">
                      {item.value ?? "-"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                {requestDetailsData.slice(4).map((item, index) => (
                  <div key={index} className="flex justify-between flex-col">
                    <span className="self-start items-start justify-end block w-full font-semibold">
                      {item.label}:
                    </span>
                    <span className="self-start items-start justify-end block w-full text-textColor">
                      {item.value ?? "-"}
                    </span>
                  </div>
                ))}
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
                  <span>
                    {formatCurrency(requestDetails?.amount ?? "-" ?? 0)}
                  </span>
                  <span>
                    {formatCurrency(
                      requestDetails?.approved_amount ?? "-" ?? 0
                    )}
                  </span>
                </div>
              </div>

              <div
                className={`text-center lg:tracking-widest mb-12 flex justify-between items-center ${
                  requestDetails?.status === "APPROVED"
                    ? "text-green-500 bg-[#E5F8E0] p-3"
                    : "bg-[#FEF6e7] p-3 text-[#865503] "
                }`}
              >
                <span>Status:</span>
                <span className="uppercase lg:text-xl font-semibold">
                  {requestDetails?.status ?? "-"}
                </span>
              </div>

              <div className="space-y-2">
                <h2>Project Summary</h2>
                <p className="font-semibold pb-6 flex flex-col gap-1">
                  {requestDetails?.description ?? "-"}
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
              <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="space-y-6 ">
                  {serviceDetailsData.slice(0, 6).map((item, index) => (
                    <div key={index} className="flex justify-between flex-col">
                      <span className="self-start items-start justify-end block font-semibold w-full">
                        {item.label}:
                      </span>
                      <span className="self-start items-start justify-end block text-textColor w-full">
                        {item.value ?? "-"}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  {serviceDetailsData.slice(6).map((item, index) => (
                    <div key={index} className="flex justify-between flex-col">
                      <span className="self-start items-start justify-end block font-semibold w-full">
                        {item.label}:
                      </span>
                      <span className="self-start items-start justify-end text-textColor block w-full">
                        {item.value ?? "-"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <aside className="bg-white border-borderColor shadow-sm w-full xl:col-span-2">
              <div className="p-3 lg:p-6 space-y-5">
                <h2 className="font-semibold mb-4">Cash Summary</h2>
                <div className="flex justify-between items-center">
                  <span>Requested quantity</span>
                  <span>{requestDetails?.quantity ?? "-"}</span>
                </div>{" "}
                <div className="flex justify-between items-center">
                  <span>Unit Price</span>
                  <span>
                    {formatCurrency(requestDetails?.unit_price) ?? "-"}
                  </span>
                </div>{" "}
                <div className="flex justify-between items-center">
                  <span>Approved Requested Total Price</span>
                  <span>
                    {formatCurrency(requestDetails?.total_price) ?? "-"}
                  </span>
                </div>{" "}
                <div className="flex justify-between items-center">
                  <span>Approved quantity</span>
                  <span>
                    {formatCurrency(requestDetails?.approved_quantity ?? "-")}
                  </span>
                </div>{" "}
                <div className="flex justify-between items-center">
                  <span>Approved Unit Price</span>
                  <span>
                    {formatCurrency(requestDetails?.approved_unit_price ?? "-")}
                  </span>
                </div>{" "}
                <div className="flex justify-between items-center">
                  <span>Approved Total Price</span>
                  <span>
                    {formatCurrency(
                      requestDetails?.approved_total_amount ?? "-"
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Approved On</span>
                  <span>
                    {(requestDetails?.approved_on &&
                      formatDate(requestDetails?.approved_on || "-")) ??
                      "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Approved by</span>
                  <span>{requestDetails?.approved_by ?? "-"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Approved Comment</span>
                  <span>{requestDetails?.comment ?? "-"}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
        <div className="py-8">
          <div className="flex justify-between items-center">
            <span>Comments</span>
            {requestDetails?.status !== "APPROVED" && (
              <Button onClick={onAddComment}>Add Comment</Button>
            )}
          </div>
          <DataTable
            data={comments || []}
            columns={RequestColumns}
            isLoading={isCommentsLoading}
            showSearch={false}
          />
        </div>
      </div>
    </div>
  );
}
