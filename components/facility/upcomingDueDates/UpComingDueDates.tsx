import { DataTable } from "@/components/shared/DataTable";
import { api } from "@/config/api";
import { ApiResponse, IDeuDates, ITenantData } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { columns } from "./columns";
import useFacilityStore from "@/store/facility/useFacilityStore";

export default function UpComingDueDates() {
  const { setDueDatesData } = useFacilityStore();
  const { data, error, isPending } = useQuery({
    queryKey: ["get all upcoming due dates"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<IDeuDates[]>>(
          "/tenants/due/all"
        );
        setDueDatesData(response.data.data);
        return response.data.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
  return (
    <DataTable data={data ?? []} columns={columns} isLoading={isPending} />
  );
}
