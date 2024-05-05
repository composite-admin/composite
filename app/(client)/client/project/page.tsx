import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { data } from "./data";
import { columns } from "./columns";

export default function ClientProjectPage() {
  return (
    <>
      <PageHead headText="Project" subText="View all your projects here" />
      <DataTable columns={columns} data={data} />
    </>
  );
}
