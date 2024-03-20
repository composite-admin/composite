import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { columns } from "../consultants/columns";
import { data } from "../consultants/data";
import { DataTable } from "@/components/shared/DataTable";
import Multistepform from "@/components/forms/MultiStepFoms/Multistepform";

export default function CashAdvancePage() {
  return (
    <div className="space-y-8">
      {/* <div>
        <PageHeaderComponent
          title="Client(22)"
          subTitle="View all staff here"
          buttonText="Add Client"
          href="manage-client/add-new-client"
        />
      </div>
      <DataTable columns={columns} data={data} /> */}
      <Multistepform/>
    </div>
  );
}
