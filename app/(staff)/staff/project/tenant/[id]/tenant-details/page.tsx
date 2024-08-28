/* eslint-disable react/no-unescaped-entities */
"use client";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import GoBack from "@/components/shared/GoBack";
import { Badge } from "@/components/ui/badge";
import { api } from "@/config/api";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { ITenantData, ITenantDetails } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function TenantPage({ params }: { params: { id: string } }) {
  const { data, isPending, error } = useQuery({
    queryKey: ["get tenant details", params.id],
    queryFn: async () => {
      try {
        const response = await api.get<ITenantDetails>(`/tenants/${params.id}`);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
    retryOnMount: true,
  });
  const {
    annual_rent,
    comment,
    createdAt,
    email,
    status,
    fees,
    flat_code,
    flat_description,
    full_name,
    phone_number,
    project_details,
    project_name,
    rent_payment,
    tenant_code,
    tenant_id,
    title,
    updatedAt,
  } = data?.data || {};
  return (
    <div>
      <GoBack />
      <div>
        <div>
          <h1 className="font-semibold">{full_name}</h1>
          <span className="text-textColor uppercase">{tenant_code}</span>
        </div>
        <div className="flex flex-col lg:grid gap-8 lg:grid-cols-6">
          <div className="col-span-4">
            <div className="pb-12 flex gap-5 py-3 md:overflow-x-visible overflow-x-auto hide">
              <DashboardCard
                title="Annual Rent"
                description={formatCurrency(annual_rent || 0)}
              />
              <DashboardCard title="Total Fees" />
              <DashboardCard
                title="Rent Due Date"
                description={rent_payment}
              />
            </div>
            <div>
              <aside className="bg-white border-borderColor rounded-md shadow-sm col-span-4 p-3 lg:p-8 lg:px-12 ">
                <div className="flex justify-between items-center py-2 pb-5">
                  <p>Tenant Details</p>
                  {/* <p
                    className={`${
                      status === "Active"
                        ? "text-green-500 bg-green-100 px-2.5 rounded-xl"
                        : "text-[#865503] bg-[#FEF6E7]"
                    }`}
                  >
                    Tenant Status:{status}
                  </p> */}
                </div>
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 w-full pb-5 md:w-1/2 flex justify-between lg:pr-8 gap-3 ">
                    <div className="flex flex-col gap-3 w-1/2 flex-1 text-textColor text-sm">
                      <span className="font-semibold text-black">
                        Tenant code:
                      </span>
                      <span className="uppercase ">{tenant_code}</span>

                      <span className="font-semibold text-black">
                        Full Name:
                      </span>
                      <span>{full_name}</span>

                      <span className="font-semibold text-black">Email:</span>
                      <span className="block">{email}</span>

                      <span className="font-semibold text-black">
                        Flat Description:
                      </span>
                      <span>{flat_description}</span>
                    </div>

                    <div className="flex flex-col gap-3 w-1/2 flex-1 text-sm font-semibold"></div>
                  </div>

                  <div className="flex-1 w-full pb-5 md:w-1/2 flex gap-3 justify-between lg:pr-8  ">
                    <div className="flex flex-col gap-3 w-1/2 flex-1 text-textColor text-sm">
                      <span className="font-semibold text-black">
                        Date Added:
                      </span>
                      <span>{formatDate(createdAt as string)}</span>

                      <span className="font-semibold text-black">
                        Phone Number:
                      </span>
                      <span>{phone_number}</span>

                      <span className="font-semibold text-black">
                        Project Details:
                      </span>
                      <span>{project_details}</span>

                      <span className="font-semibold text-black">
                        Flat Code:
                      </span>
                      <span className="uppercase">{flat_code}</span>
                    </div>

                    <div className="flex flex-col gap-6 w-1/2 flex-1 text-sm"></div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
          <div className="col-span-2">
            <div>
              <SideCards fees={fees || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SideCardProps {
  fees: [] | any;
}

function SideCards({ fees }: SideCardProps) {
  return (
    <div className="shadow-sm bg-white border border-[#E4E7EC] rounded-2xl w-full max-w-sm px-3.5 py-2  ">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center  pb-2.5">
          <div className="flex items-center">
            <h2 className="text-xs lg:text-sm capitalize font-semibold">
              Fees Breakdown
            </h2>
          </div>
        </div>

        <div className="flex flex-col pb-3">
          {fees?.map((fee: any) => (
            <div key={fee.type}>
              <div className="flex justify-between">
                <span className="text-textColor w-2/3 flex-1 capitalize">
                  {fee.type}:
                </span>
                <span className="font-semibold text-left block  w-1/3">
                  {formatCurrency(fee.value)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
