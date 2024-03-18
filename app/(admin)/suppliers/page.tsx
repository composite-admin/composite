import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";

export default function page() {
  return(
    <>
      <PageHead headText="Supplier(22)" subText="View all your suppliers here" buttonText="Add Supplier" />
      <DataTable columns={columns} data={data} />
    </>
  )
}
