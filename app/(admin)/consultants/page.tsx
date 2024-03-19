import { DataTable } from "@/components/shared/DataTable";
import { columns } from "./columns";
import { data } from "./data";
import PageHeaderComponent from "@/components/shared/PageHeaderComponent";

export default function ConsultantsPage() {
  return (
    <div className="space-y-8">
      <div>
        <PageHeaderComponent
          title="Consultants"
          subTitle="View all consultants here"
          buttonText="Add consultant"
        />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
