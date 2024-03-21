import { DataTable } from "@/components/shared/DataTable";
import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { columns } from "./columns";
import { data } from "./data";

export default function AllFlatsPage() {
  return (
<>
<PageHeaderComponent title="All Flats" subTitle="View all flats here" />
<DataTable columns={columns} data={data} />
</>
  )
}