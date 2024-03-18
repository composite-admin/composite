import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";

export default function page() {
  return(
    <>
    <PageHead headText="Contractor(22)" subText="View all your contractors here" buttonText="Add Contractor" />
    <DataTable columns={columns} data={data} />
  </>
  )
}
