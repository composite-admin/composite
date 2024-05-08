import { DataTable } from "@/components/shared/DataTable";
import { flatColumns, IFlatData } from "./flatColumns";

const data: IFlatData[] = [
  {
    flat_code: "RCPD119548",
    flat_description: "Ground 1",
    statement: "Good Place",
  },
  {
    flat_code: "RCPD119548",
    flat_description: "Ground 2",
    statement: "Good Place",
  },
  {
    flat_code: "RCPD119548",
    flat_description: "Ground 3",
    statement: "Good Place",
  },
];

export default function ProjectFlats() {
  return (
    <>
      <div className="py-5 pl-4 font-semibold">
        <h1>Project flats</h1>
      </div>
      <div className="p-4 bg-white -Color shadow-lg rounded-lg mt-5 py-10">
        <DataTable columns={flatColumns} data={data} />
      </div>
    </>
  );
}
