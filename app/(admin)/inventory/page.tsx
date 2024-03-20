import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";
import { DetailsModal } from "@/components/Modals/DetailsModal";
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
