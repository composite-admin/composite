import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";

export default function page() {
  return(
    <div>
    <PageHead headText="Inventory" subText="View all your inventories here" buttonText="Add Inventory" />
    <DataTable columns={columns} data={data} />
  </div>
  )
}
