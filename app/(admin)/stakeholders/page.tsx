import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";

export default function page() {
  return(
    <>
    <PageHead headText="Stakeholder (22)" subText="View all your Stakeholder s here" buttonText="Add Stakeholder " />
    <DataTable columns={columns} data={data} />
  </>
  )
}
