"use client";

import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { DataTable } from "@/components/shared/DataTable";
import SelectTableTypeBadge from "@/components/shared/SelectTableTypeBadge";
import { DashboardIcon } from "@/components/icons";
import { columns } from "./columns";
import { data } from "./data";

export default function FacilityPage() {
  return (
    <div>
      <div>
        <PageHeaderComponent
          title="Tenants"
          subTitle="A request of daily, weekly and monthly activities"
          buttonText="Add new apartment"
          href="manage-client/add-new-client"
          className="py-7"
        />
      </div>
      <div className="flex gap-3 py-5">
        <SelectTableTypeBadge
          icon={<DashboardIcon />}
          title="Approved IOU/Refund"
          notification="2"
        />
        <SelectTableTypeBadge
          icon={<DashboardIcon />}
          title="Pending IOU/Refund"
          notification="3"
        />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
