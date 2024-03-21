

import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { columns } from "../consultants/columns";
import { data } from "../consultants/data";
import { DataTable } from "@/components/shared/DataTable";
import TableNotificationBadge from "@/components/shared/TableNotificationBadge";


export default function CashAdvancePage() {
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
            <TableNotificationBadge />
            <TableNotificationBadge />
            <TableNotificationBadge />
            <TableNotificationBadge />
          </div>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    );
  };

