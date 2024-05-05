
"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import {
  getAllrequest,
  RequestStatus,
  useRequestStore,
} from "@/store/requests/RequestStore";
import { IRequestData } from "@/utils/types";
import { DashboardIcon } from "@/components/icons";
import SelectTableTypeBadge from "@/components/shared/SelectTableTypeBadge";
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react";

const filterRequestsByStatus = (
  data: IRequestData[] | undefined,
  currentTable: RequestStatus
): IRequestData[] => {
  switch (currentTable) {
    case "pending":
      return data?.filter((request) => request.status === "PENDING") ?? [];
    case "approved":
      return data?.filter((request) => request.status === "APPROVED") ?? [];
    case "declined":
      return data?.filter((request) => request.status === "REJECTED") ?? [];
    case "all_requests":
      return data ?? [];
    default:
      return data ?? [];
  }
};

export default function RequestPage() {
  const { currentTable, setCurrentTable } = useRequestStore();
  const { data, error, isPending } = useQuery({
    queryKey: ["get all requests"],
    queryFn: getAllrequest,
  });

  const filteredData = filterRequestsByStatus(data, currentTable);

  return (
    <>
      <PageHeaderComponent
        subTitle="A request of daily, weekly and monthly activites"
        title="Request"
      />
      <RequestStatusBadges
        data={data}
        currentTable={currentTable}
        setCurrentTable={setCurrentTable}
      />
      <DataTable
        columns={columns}
        isLoading={isPending}
        data={filteredData ?? []}
      />
    </>
  );
}

interface RequestStatusBadgeProps {
  data: IRequestData[] | undefined;
  currentTable: RequestStatus;
  setCurrentTable: (status: RequestStatus) => void;
}

const RequestStatusBadges = ({
  data,
  currentTable,
  setCurrentTable,
}: RequestStatusBadgeProps) => {
  const badgeData = [
    {
      icon: <DashboardIcon />,
      title: "All Requests",
      status: "all_requests",
      notification: data?.length ?? 0,
    },
    {
      icon: <ClockIcon />,
      title: "Pending",
      status: "pending",
      notification:
        data?.filter((request) => request.status === "PENDING").length ?? 0,
    },
    {
      icon: <CheckCircleIcon />,
      title: "Approved",
      status: "approved",
      notification:
        data?.filter((request) => request.status === "APPROVED").length ?? 0,
    },
    {
      icon: <XCircleIcon />,
      title: "Declined",
      status: "declined",
      notification:
        data?.filter((request) => request.status === "REJECTED").length ?? 0,
    },
  ];

  return (
    <div className="flex gap-3 py-5">
      {badgeData.map((badge) => (
        <SelectTableTypeBadge
          key={badge.status}
          icon={badge.icon}
          onclick={() => setCurrentTable(badge.status as RequestStatus)}
          title={badge.title}
          notification={badge.notification}
          className={`${
            currentTable === badge.status ? "bg-primaryLight-100" : ""
          }`}
        />
      ))}
    </div>
  );
};

