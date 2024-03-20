import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { columns } from "../consultants/columns";
import { data } from "../consultants/data";
import { DataTable } from "@/components/shared/DataTable";
import Multistepform from "@/components/forms/MultiStepFoms/Multistepform";
import TableNotificationBadge from "@/components/shared/TableNotificationBadge";

export default function FacilityPage() {
  return <div>
      <div>
        <PageHeaderComponent
          title="Client(22)"
          subTitle="View all staff here"
          buttonText="Add Client"
          href="manage-client/add-new-client"
        />
      </div>
      <div className='flex gap-3'>
      <TableNotificationBadge/>
      <TableNotificationBadge/>
      </div>
      <DataTable columns={columns} data={data} />
  </div>;
}
