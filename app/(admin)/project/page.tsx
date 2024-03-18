import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";

export default function page() {
  return (
    <>
      <PageHead headText="Project" subText="View all your Items here" buttonText="Add Project" />
      <DataTable columns={columns} data={data} />
    </>
  )
}
