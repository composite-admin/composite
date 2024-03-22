import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { columns } from     "@/app/(admin)/project/tenant/columns";
import { DataTable } from "@/components/shared/DataTable";
import { data } from "@/app/(admin)/project/tenant/data";

export default function ManageStaffPage() {
  return (
    <div className="space-y-8">
      <div>
        <PageHeaderComponent
          title="Manane Staff(22)"
          subTitle="View all staff here"
          buttonText="Add Client"
          href="manage-client/add-new-client"
        />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
