import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { getAllFlats, getAllTenants, getTenantDetails } from "@/utils/actions";
import {
  ApiResponse,
  ICashAdvanceBreakdownData,
  ICashAdvanceData,
  IClientDetails,
  IClientProjectData,
  IConsultantData,
  IConsultantProjectData,
  IContractorProjectData,
  InventoryItemData,
  IProjectData,
  IProjectReport,
  IRequestData,
  IStaffDetailsData,
  IStakeholderProjectData,
  ISupplierData,
  ISupplierMaterial,
  ISupplierMaterialTypesData,
  ITenantDetails,
  IWorkerData,
  PendingProjectDetails,
} from "@/utils/types";
import { IRequestCommentData } from "@/app/(admin)/requests/request-details/[id]/columns";

export const useTenants = () => {
  const { isPending, isSuccess, isError, error, data } = useQuery({
    queryKey: ["get all tenants"],
    queryFn: getAllTenants,
  });

  return { data, isPending, isSuccess, isError, error };
};

export const useFlats = () => {
  const { data } = useQuery({
    queryKey: ["get all flats"],
    queryFn: getAllFlats,
  });

  return { flats: data };
};

export const useProjectData = () => {
  const { data } = useQuery({
    queryKey: ["get all projects"],
    queryFn: async () => {
      try {
        const response = await api.get("/projects");
        return response.data.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
  });

  return { projectsData: data };
};

export const useTenantDetails = (id: number) => {
  const { data } = useQuery({
    queryKey: ["get tenant details", id],
    queryFn: () => getTenantDetails(id),
  });
  return { tenantDetails: data };
};

export const useStaffRoles = () => {
  const { data } = useQuery({
    queryKey: ["get roles"],
    queryFn: getRoles,
  });
  return { staffRoles: data };
};

export const getRoles = async () => {
  try {
    const response = await api.get("/staffs/roles/all");
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};

const getStuff = async (args: string) => {
  try {
    const response = await api.get(`${args}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};

export const useGetStakeHolders = () => {
  const { data } = useQuery({
    queryKey: ["get all stakeholders"],
    queryFn: () => getStuff("/stakeholder"),
  });

  return { stakeholders: data };
};

export const useGetContractor = () => {
  const { data } = useQuery({
    queryKey: ["get all contractors"],
    queryFn: () => getStuff("/contractors"),
  });

  return { contractors: data };
};

export const useGetAllInventoryTypes = () => {
  const { data } = useQuery({
    queryKey: ["get all inventory types"],
    queryFn: () => getStuff("/inventory/types/all"),
  });
  return { inventories: data };
};

export const useGetAllStaffs = () => {
  const { data } = useQuery({
    queryKey: ["get all staffs"],
    queryFn: () => getStuff("/staffs"),
  });
  return { staffs: data };
};

export const useGetStaffDetails = (id: string | null) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get staff details", id],
    queryFn: () => getStuffTyped<IStaffDetailsData>(`/staffs/${id}`),
  });
  return { staffDetails: data, isLoading };
};

export const useGetAllRequests = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get all requests"],
    queryFn: () => getStuffTyped<IRequestData[]>("/requests"),
  });

  return { requests: data, isLoading, isError };
};

export const GetAllReports = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get all reports"],
    queryFn: () => getStuffTyped<IProjectReport[]>("/project_report"),
  });
  return { reports: data, isLoading };
};

export const useGetAllConsultants = () => {
  const { data } = useQuery({
    queryKey: ["get all consultants"],
    queryFn: () => getStuffTyped<IConsultantData[]>("/consultants"),
  });
  return { consultants: data };
};

export const useGetAllSuppliers = () => {
  const { data } = useQuery({
    queryKey: ["get all suppliers"],
    queryFn: () => getStuffTyped<ISupplierData[]>("/materials"),
  });
  return { suppliers: data };
};

export const useGetInventoryData = (id: string) => {
  const { data } = useQuery({
    queryKey: ["get inventory data", id],
    queryFn: () => getStuffTyped<InventoryItemData>(`/inventory/${id}`),
  });
  return { inventory: data };
};

export const useGetAllConsultantProjects = () => {
  const { data } = useQuery({
    queryKey: ["get all consultants projects"],
    queryFn: () =>
      getStuffTyped<IConsultantProjectData[]>("/consultant-projects"),
  });
  return { projects: data };
};

export const useGetConsultantProject = (id: string) => {
  const { data } = useQuery({
    queryKey: ["get consultant project", id],
    queryFn: () =>
      getStuffTyped<IConsultantProjectData[]>(
        `/consultant-projects/consultant/${id}`
      ),
  });
  return { projectDetails: data };
};

export const useGetContractorProject = (id: string) => {
  const { data } = useQuery({
    queryKey: ["get contractor project", id],
    queryFn: () =>
      getStuffTyped<IContractorProjectData>(`/contractor-projects/${id}`),
  });
  return { projectDetails: data };
};

export const useGetStakeholderProject = (id: string) => {
  const { data } = useQuery({
    queryKey: ["get stakeholder project", id],
    queryFn: () =>
      getStuffTyped<IStakeholderProjectData>(`/stakeholder-project/${id}`),
  });
  return { projectDetails: data };
};
export const getStuffTyped = async <T,>(args: string): Promise<T> => {
  try {
    const response = await api.get<ApiResponse<T>>(args);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};

export const useGetAllProjectData = () => {
  const { data } = useQuery({
    queryKey: ["get all projects"],
    queryFn: () => getStuffTyped<IProjectData[]>("/projects"),
  });
  return { projects: data };
};

export const useGetClientProjectData = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get client project", id],
    queryFn: () =>
      getStuffTyped<IClientProjectData[]>(`/client_project/client/${id}`),
  });
  return { ClientProjectDetails: data, isClientProjectLoading: isLoading };
};

export const useGetClientDetails = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get client details", id],
    queryFn: () => getStuffTyped<IClientDetails>(`/client/${id}`),
    enabled: !!id,
    refetchOnMount: "always",
  });
  return { details: data, isClientDetailsLoading: isLoading };
};

export const useGetAllWorkers = () => {
  const { data } = useQuery({
    queryKey: ["get all workers"],
    queryFn: () => getStuffTyped<IWorkerData[]>("/worker"),
  });
  return { workers: data };
};

export const useGetCashAdvanceById = (id: string) => {
  const { data } = useQuery({
    queryKey: ["get cash advance details", id],
    queryFn: () => getStuffTyped<ICashAdvanceData>(`/cash-advances/${id}`),
  });
  return { details: data };
};

export const useGetCashAdvanceBreakdownById = (id: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["get cash advance breakdown details", id],
    queryFn: () =>
      getStuffTyped<ICashAdvanceBreakdownData>(
        `/cash-advance-breakdowns/${id}`
      ).then((response) => (Array.isArray(response) ? response : [response])),
  });

  return { cashAdvanceBreakdown: data || [], isBreakDownLoading: isPending };
};


export const useGetCashAdvanceBreakdownByCode = (id: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["get cash advance breakdown table data", id],
    queryFn: () =>
      getStuffTyped<ICashAdvanceBreakdownData[]>(
        `/cash-advance-breakdowns/request-code/${id}`
      ),
  });

  return { cashAdvanceBreakdown: data || [], isBreakDownLoading: isPending };
};

export const useGetAllCashAdvance = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get all cash advances"],
    queryFn: () => getStuffTyped<ICashAdvanceData[]>("/cash-advances"),
  });
  return { cashAdvances: data, isCashAdvanceLoading: isLoading };
};

export const useGetRequestComments = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get request comments", id],
    queryFn: () =>
      getStuffTyped<IRequestCommentData[]>(`/request-comments/${id}`),
  });
  return { comments: data, isCommentsLoading: isLoading };
};

export const useGetProjectById = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get project details", id],
    queryFn: () => getStuffTyped<IProjectData>(`/projects/${id}`),
    enabled: !!id,
  });
  return { projectDetails: data, isLoading };
};

export const useGetAllPendingProjects = () => {
  const { data } = useQuery({
    queryKey: ["get all pending projects"],
    queryFn: () =>
      getStuffTyped<PendingProjectDetails[]>("/dashboard/pending-project"),
  });
  return { pendingProjects: data };
};