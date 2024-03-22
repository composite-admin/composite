"use client";

import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { data } from "../consultants/data";
import { columns } from "../consultants/columns";
import { DataTable } from "@/components/shared/DataTable";

export default function ManageClientPage() {
  return (
    <div className="space-y-8">
      <div>
        <PageHeaderComponent
          title="Client(22)"
          subTitle="View all staff here"
          buttonText="Add Client"
          href="manage-client/add-new-client"
        />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
