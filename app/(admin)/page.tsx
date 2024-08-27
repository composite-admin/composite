"use client";
import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./columns";
import { columns as reportCols } from "./reports/columns";
import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import SideCards from "@/components/Dashboard/SideCards";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiResponse, IEntityData, IProjectReport } from "@/utils/types";
import { api } from "@/config/api";
import axios from "axios";
import {
  GetAllReports,
  useGetAllPendingProjects,
  useGetAllProjectData,
  useGetAllRequests,
} from "@/hooks/useSelectOptions";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import Link from "next/link";
import { SkeleCard } from "@/components/skeletons/SkeleCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import useGetAllReport from "@/store/report/ReportStore";
import { HiHome, HiOutlineClock, HiPlus } from "react-icons/hi";
import { userStore } from "@/store/auth/AuthStore";

export default function DashboardPage() {
  const { reportData, setData } = useGetAllReport();
  const { username } = userStore();

  const {
    data,
    error,
    isPending: reportPending,
  } = useQuery({
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

  const { projects } = useGetAllProjectData();
  const { data: entities, isPending } = useQuery({
    queryKey: ["get all entities"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<IEntityData>>(
          "/dashboard/entity-count"
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

  const { requests } = useGetAllRequests();
  const { reports } = GetAllReports();
  const pendingRequests = requests?.filter(
    (request) => request.status === "PENDING"
  );

  const pendingReports = reports?.filter(
    (report) => report.status === "Pending" || !report.status
  );
  const trimmedPendingRequests = pendingRequests?.slice(0, 3);
  const trimmedPendingReports = pendingReports?.slice(0, 3);
  const ongoingProjects = projects?.filter(
    (project) => project.status === "On-going"
  );

  const { pendingProjects } = useGetAllPendingProjects();
  return (
    <div>
      <PageHeaderComponent
        title={`Welcome ${username ?? "User"}`}
        subTitle="This is your dashboard, an overview of everything going on."
      />

      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          {" "}
          <div className="grid-cols-1 gap-8 grid xl:grid-cols-8">
            <div className="xl:col-span-6">
              <div className=" flex gap-5 py-3 md:overflow-x-visible overflow-x-auto hide">
                <DashboardCard
                  title="Total Projects"
                  description={entities?.totalProject.count}
                />
                <DashboardCard
                  title="Total Contractors"
                  description={entities?.totalContractor.count}
                />
                <DashboardCard
                  title="Total Stakeholders"
                  description={entities?.totalStakeholder.count}
                />
              </div>
              <DataTable
                columns={columns}
                data={pendingProjects ?? []}
                isLoading={isPending}
              />
            </div>

            <div className="xl:col-span-2 grid md:grid-cols-2 xl:grid-cols-1 gap-5 auto-rows-min  place-items-center w-full">
              {isPending ? (
                <SkeleCard />
              ) : (
                <SideCards
                  title="Pending Requests"
                  href="/requests"
                  description={pendingRequests?.length ?? 0}>
                  {trimmedPendingRequests?.map((request) => (
                    <div
                      className="flex justify-between items-center border-b py-3"
                      key={request.id}>
                      <div className="flex gap-2 items-center">
                        <div className="text-xs flex flex-col">
                          <span className="text-sm font-semibold">
                            {request.request_type}
                          </span>
                          <span className="font-semibold uppercase">
                            {request.request_code}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/requests/request-details/${request.id}`}
                        className="text-primaryLight-500 font-semibold">
                        View
                      </Link>
                    </div>
                  ))}
                </SideCards>
              )}

              {isPending ? (
                <SkeleCard />
              ) : (
                <SideCards
                  title="Pending Reports"
                  description={pendingReports?.length ?? 0}
                  href="/reports">
                  {trimmedPendingReports?.map((report) => (
                    <div
                      className="flex justify-between items-center border-b py-3"
                      key={report.id}>
                      <div className="flex gap-2 items-center">
                        <AvatarComponent />
                        <div className="text-xs flex flex-col">
                          <span className="text-sm font-semibold">
                            {report.name}
                          </span>
                          <span className="font-semibold uppercase">
                            {report.report_code}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/reports/${report.id}`}
                        className="text-primaryLight-500 font-semibold">
                        View
                      </Link>
                    </div>
                  ))}
                </SideCards>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reports">
          <div className="flex gap-3 my-5">
            <div
              className="bg-[#007BFF08] text-sm rounded-md flex items-center p-3 gap-1 cursor-pointer"
              onClick={() => filter("All")}>
              <HiPlus className="text-primaryLight" />
              <p>All Report</p>
            </div>

            <div
              className="bg-[#E7F6EC] text-sm rounded-md flex items-center p-3 gap-1 cursor-pointer"
              onClick={() => filter("Daily")}>
              <HiOutlineClock className="text-[#036B26]" />
              <p className="text-[#036B26]">
                Daily Report (
                {data?.filter((item) => item.report_type === "Daily").length})
              </p>
            </div>

            <div
              className="bg-[#FEF6E7] text-sm rounded-md flex items-center p-3 gap-1 cursor-pointer"
              onClick={() => filter("Weekly")}>
              <HiHome className="text-[#865503]" />
              <p className="text-[#865503]">
                Weekly Report (
                {data?.filter((item) => item.report_type === "Weekly").length})
              </p>
            </div>

            <div
              className="bg-[#FFECE5] text-sm rounded-md flex items-center p-3 gap-1 cursor-pointer"
              onClick={() => filter("Monthly")}>
              <HiHome className="text-[#8A0000]" />
              <p className="text-[#8A0000]">
                Monthly Report (
                {data?.filter((item) => item.report_type === "Monthly").length})
              </p>
            </div>
          </div>
          <DataTable
            columns={reportCols}
            isLoading={reportPending}
            data={reportData || []}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
