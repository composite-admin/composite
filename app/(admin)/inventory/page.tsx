import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./picked/columns";
import { data } from "./picked/data";
import { DetailsModal } from "@/components/shared/DetailsModal";
import ViewDetails from "@/components/shared/ViewDetails";
import keys from "./keys";

export default function page() {
  return (
    <>
      <PageHead headText="Inventory" subText="View all your inventories here" buttonText="Add Inventory" />
      <DataTable columns={columns} data={data} />

      
    </>
  )
}
