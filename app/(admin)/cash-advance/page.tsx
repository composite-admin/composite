"use client";

import { Clock, Plus } from "lucide-react";
import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { columns } from "../consultants/columns";
import { data } from "../consultants/data";
import { data as dataTwo } from "../dashboard/data";
import { columns as columnTwo } from "../dashboard/columns";
import { DataTable } from "@/components/shared/DataTable";
import SelectTableTypeBadge from "@/components/shared/SelectTableTypeBadge";
import { DashboardIcon } from "@/components/icons";
import {
  CashAdvanceTables,
  cashAdvanceTablesStore,
} from "@/store/tables/useCreateTableStore";

export default function CashAdvancePage() {
  const { setTableType, cashAdvanceTableState } = cashAdvanceTablesStore();

  function renderTable(arg: CashAdvanceTables) {
    switch (arg) {
      case "advances":
        setTableType("advances");
        break;
      case "retirement":
        setTableType("retirement");
        break;
      case "approved":
        setTableType("approved");
        break;
      case "pending":
        setTableType("pending");
        break;
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <PageHeaderComponent
          title="Cash Advances"
          subTitle="View all staff here"
          buttonText="Add Client"
          href="manage-client/add-new-client"
        />
        <div className="flex gap-5">
          <SelectTableTypeBadge
            icon={<Plus className="w-4 h-4" />}
            title="Cash Advances"
            notification="22"
            onclick={() => renderTable("advances")}
          />
          <SelectTableTypeBadge
            icon={<Clock className="w-4 h-4" />}
            title="Cash Retirement"
            notification="12"
            onclick={() => renderTable("retirement")}
          />
          <SelectTableTypeBadge
            icon={<DashboardIcon />}
            title="Approved IOU/Refund"
            notification="2"
            onclick={() => renderTable("approved")}
          />
          <SelectTableTypeBadge
            icon={<DashboardIcon />}
            title="Pending IOU/Refund"
            notification="3"
            onclick={() => renderTable("pending")}
          />
        </div>
      </div>

      {cashAdvanceTableState === "advances" ? (
        <DataTable columns={columns} data={data} />
      ) : cashAdvanceTableState === "retirement" ? (
        <DataTable columns={columnTwo} data={dataTwo} />
      ) : cashAdvanceTableState === "approved" ? (
        <DataTable columns={columns} data={data} />
      ) : cashAdvanceTableState === "pending" ? (
        <DataTable columns={columnTwo} data={dataTwo} />
      ) : null}
    </div>
  );
}
