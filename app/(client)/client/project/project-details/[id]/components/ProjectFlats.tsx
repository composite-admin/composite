import { DataTable } from "@/components/shared/DataTable";
import { flatColumns } from "./flatColumns";
import useClientStore from "@/store/client/useClientStore";
import { useQuery } from "@tanstack/react-query";
import { IProjectFlatData } from "@/app/(admin)/project/apartment/[id]/page";
import { getStuffTyped, useGetClientFlats } from "@/hooks/useSelectOptions";

export default function ProjectFlats() {
  const { projectDetails } = useClientStore();
  const { clientFlats, isLoading } = useGetClientFlats(
    projectDetails?.project_code
  );

  return (
    <>
      <div className="py-5 pl-4 font-semibold">
        <h1>Project flats</h1>
      </div>
      <div className="p-4 bg-white -Color shadow-lg rounded-lg mt-5 py-10">
        <DataTable
          columns={flatColumns}
          data={clientFlats || []}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
