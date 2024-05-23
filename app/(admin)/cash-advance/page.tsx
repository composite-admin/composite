"use client";

import { CheckCircleIcon, ClockIcon, Hand, XCircleIcon } from "lucide-react";
import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { columns } from "./columns";
import { DataTable } from "@/components/shared/DataTable";
import SelectTableTypeBadge from "@/components/shared/SelectTableTypeBadge";
import { DashboardIcon } from "@/components/icons";
import {
  CashAdvanceTables,
  cashAdvanceTablesStore,
} from "@/store/tables/useCreateTableStore";
import { ApiResponse, ICashAdvanceData } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import axios from "axios";
import { pendingAndApprovedColumns } from "./pendingAndApprovedCols";
import useRefetchQuery from "@/utils/refetchQuery";

export default function CashAdvancePage() {
  const { setTableType, cashAdvanceTableState } = cashAdvanceTablesStore();
  const { data } = useQuery({
    queryKey: ["get cash advance"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<ICashAdvanceData[]>>(
          "/cash-advances"
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
    refetchOnMount: "always",
  });

  const pendingCashAvance = data?.filter(
    (decision) => decision.decision === "Pending"
  );

  const approvedCashAdvance = data?.filter(
    (decision) =>
      decision.decision === "Approved" &&
      decision.action_type !== "cash retirement complete"
  );

  const retired = data?.filter(
    (decision) => decision.action_type === "cash retirement complete"
  );

  return (
    <div className="space-y-8">
      <div>
        <PageHeaderComponent
          title="Cash Advances"
          subTitle="View all cash advances here"
        />

        <RequestStatusBadges
          data={data}
          currentTable={cashAdvanceTableState}
          setCurrentTable={setTableType}
        />
      </div>

      <DataTable
        data={
          cashAdvanceTableState === "retirement"
            ? retired ?? []
            : cashAdvanceTableState === "pending"
            ? pendingCashAvance ?? []
            : cashAdvanceTableState === "approved"
            ? approvedCashAdvance ?? []
            : data?.filter((decision) => decision.decision !== "Pending") ?? []
        }
        columns={
          cashAdvanceTableState === "pending" ||
          cashAdvanceTableState === "approved"
            ? pendingAndApprovedColumns
            : columns
        }
      />
    </div>
  );
}

interface CashAdvanceProps {
  data: ICashAdvanceData[] | undefined;
  currentTable: CashAdvanceTables | undefined;
  setCurrentTable: (status: CashAdvanceTables) => void;
}

const RequestStatusBadges = ({
  data,
  currentTable,
  setCurrentTable,
}: CashAdvanceProps) => {
  const { refetchQuery } = useRefetchQuery();

  const handleRefecth = () => {
    refetchQuery({
      predicate: (query) => query.queryKey[0] === "get cash advance",
    });
  };

  const badgeData = [
    {
      icon: <DashboardIcon />,
      title: "Cash Advances",
      status: "all_decisions",
      notification:
        data?.filter((decision) => decision.decision !== "Pending").length ?? 0,
    },
    {
      icon: <ClockIcon />,
      title: "Cash Retirement",
      status: "retirement",
      notification:
        data?.filter(
          (decision) => decision.action_type === "cash retirement complete"
        ).length ?? 0,
    },
    {
      icon: <CheckCircleIcon />,
      title: "Approved IOU/Refund",
      status: "approved",
      notification:
        data?.filter((decision) => decision.decision === "Approved").length ??
        0,
    },
    {
      icon: <XCircleIcon />,
      title: "Pending IOU/Refund",
      status: "pending",
      notification:
        data?.filter((decision) => decision.decision === "Pending").length ?? 0,
    },
  ];

  return (
    <div className="flex gap-3 py-5">
      {badgeData.map((badge) => (
        <SelectTableTypeBadge
          key={badge.status}
          icon={badge.icon}
          onclick={() => {
            setCurrentTable(badge.status as CashAdvanceTables);
            handleRefecth();
          }}
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
