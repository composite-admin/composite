import { columns } from "@/app/(admin)/consultants/columns";
import { data } from "@/app/(admin)/consultants/data";
import { DataTable } from "@/components/shared/DataTable";
import PageHeaderComponent from "@/components/shared/PageHeaderComponent";

export default function RequestsPage() {
  return (
    <div>
      {/* page header */}
      <PageHeaderComponent
        title="My Requests"
        subTitle="View all your projects here"
      />
      {/* grid container */}
      <div className="grid-cols-1">      
          <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}