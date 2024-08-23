"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { api } from "@/config/api";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, IProjectReport } from "@/utils/types";
import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./columns";
import PageHead from "@/components/ui/pageHead";
import { HiHome, HiOutlineClock, HiPlus } from "react-icons/hi2";
import useGetAllReport from "@/store/report/ReportStore";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";

export default function ReportPage() {
  const router = useRouter();
  const { reportData, setData } = useGetAllReport();
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_CREATE = staffPrivilege?.find(
    (item: any) => item.type === "report"
  )?.can_create;

  const { data, error, isPending } = useQuery({
    queryKey: ["get all project report"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<IProjectReport[]>>(
          "/project_report"
        );
        return response.data.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
  });

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data, setData]);

  const filter = (type: string) => {
    if (type === "All") {
      setData(data);
    } else {
      const filteredData = data?.filter((item) => item.report_type === type);
      setData(filteredData);
    }
  };

  return (
    <div>
      <PageHead
        headText={`Reports (${data?.length || 0})`}
        subText="A report of daily, weekly and monthly activities"
        buttonText="Add Report"
        disabled={!CAN_CREATE}
        buttonAction={() => router.push("/staff/reports/new")}
      />

      <div className="flex gap-3 my-5">
        <div
          className="bg-[#007BFF08] text-sm rounded-md flex items-center p-3 gap-1 cursor-pointer"
          onClick={() => filter("All")}
        >
          <HiPlus className="text-primaryLight" />
          <p>All Report</p>
        </div>

        <div
          className="bg-[#E7F6EC] text-sm rounded-md flex items-center p-3 gap-1 cursor-pointer"
          onClick={() => filter("Daily")}
        >
          <HiOutlineClock className="text-[#036B26]" />
          <p className="text-[#036B26]">
            Daily Report (
            {data?.filter((item) => item.report_type === "Daily").length})
          </p>
        </div>

        <div
          className="bg-[#FEF6E7] text-sm rounded-md flex items-center p-3 gap-1 cursor-pointer"
          onClick={() => filter("Weekly")}
        >
          <HiHome className="text-[#865503]" />
          <p className="text-[#865503]">
            Weekly Report (
            {data?.filter((item) => item.report_type === "Weekly").length})
          </p>
        </div>

        <div
          className="bg-[#FFECE5] text-sm rounded-md flex items-center p-3 gap-1 cursor-pointer"
          onClick={() => filter("Monthly")}
        >
          <HiHome className="text-[#8A0000]" />
          <p className="text-[#8A0000]">
            Monthly Report (
            {data?.filter((item) => item.report_type === "Monthly").length})
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        isLoading={isPending}
        data={reportData || []}
      />
    </div>
  );
}
