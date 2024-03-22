"use client";

import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { columns } from "../consultants/columns";
import { data } from "../consultants/data";
import { DataTable } from "@/components/shared/DataTable";
import SelectTableTypeBadge from "@/components/shared/SelectTableTypeBadge";
import { DashboardIcon } from "@/components/icons";

export default function FacilityPage() {
  return (
    <div>
      <div>
        <PageHeaderComponent
          title="Client(22)"
          subTitle="View all staff here"
          buttonText="Add Client"
          href="manage-client/add-new-client"
        />
      </div>
      <div className="flex gap-3">
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
