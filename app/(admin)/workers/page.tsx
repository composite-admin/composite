import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";


export default function page() {
  return(
    <>
    <PageHead headText="Workers (22)" subText="View all your Workers here" buttonText="Add Workers " />
    <DataTable columns={columns} data={data} />
  </>
  )
}
