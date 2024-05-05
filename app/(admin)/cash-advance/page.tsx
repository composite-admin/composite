"use client";

import {
  CheckCircleIcon,
  Clock,
  ClockIcon,
  Plus,
  XCircleIcon,
} from "lucide-react";
import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { columns } from "./columns";
import { data } from "./data";
import { data as dataTwo } from "../data";
import { columns as columnTwo } from "../columns";
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

export default function CashAdvancePage() {
  const {
    setCashAdvanceTableData,
    cashAdvanceTableData,
    setTableType,
    cashAdvanceTableState,
    cashAdvanceData,
    pendingCashAdvanceData,
    setPendingCashAvance,
  } = cashAdvanceTablesStore();

  const { data, error, isPending } = useQuery({
    queryKey: ["get cash advance"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<ICashAdvanceData[]>>(
          "/cash-advances"
        );
        setCashAdvanceTableData(
          response.data.data.filter(
            (data) =>
              data.decision !== "Pending" &&
              data.action_type !== null &&
              data.action_type !== "Cash Retirement"
          )
        );
        setPendingCashAvance(
          response.data.data.filter((data) => data.decision === "Pending")
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

  const tableMapping = {
    advances: columns,
    pending: pendingAndApprovedColumns,
    approved: pendingAndApprovedColumns,
    retirement: pendingAndApprovedColumns,
  };

  const dataTableColumns =
    tableMapping[cashAdvanceTableState as keyof typeof tableMapping] || columns;
  const dataTableData =
    cashAdvanceTableState === "advances"
      ? cashAdvanceTableData ?? []
      : cashAdvanceTableState === "pending"
      ? pendingCashAdvanceData ?? []
      : data ?? [];
  return (
    <div className="space-y-8">
      <div>
        <PageHeaderComponent
          title="Cash Advances"
          subTitle="View all staff here"
        />

        <RequestStatusBadges
          data={data}
          currentTable={cashAdvanceTableState}
          setCurrentTable={setTableType}
        />
      </div>

      <DataTable columns={dataTableColumns} data={dataTableData} />
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
  const badgeData = [
    {
      icon: <DashboardIcon />,
      title: "Cash Advancces",
      status: "all_decisions",
      notification:
        data?.filter((decision) => decision.decision !== "Pending").length ?? 0,
    },
    {
      icon: <ClockIcon />,
      title: "Cash Retirement",
      status: "cash retirement complete",
      notification:
        data?.filter((decision) => decision.action_type === "Cash Retirement")
          .length ?? 0,
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
          onclick={() => setCurrentTable(badge.status as CashAdvanceTables)}
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
