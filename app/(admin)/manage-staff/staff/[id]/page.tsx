"use client";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { Button } from "@/components/ui/button";
import { api } from "@/config/api";
import useManageStaffStore from "@/store/manage-staff/useManageStaffStore";
import { formatDate } from "@/utils/formatDate";
import { ApiResponse, IManageStaffData } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { gridDataType } from "../../../../../utils/types";

interface IProps {
  params: { id: string };
}

export default function ManageStaffPage({ params }: IProps) {
  const { setStaffDetails, staffDetails } = useManageStaffStore();
  const { data, error, isPending } = useQuery({
    queryKey: ["get staff details"],
    queryFn: async () => {
      try {
        const response = await api.get<ApiResponse<IManageStaffData>>(
          `/staffs/${params.id}`
        );
        setStaffDetails(response.data.data);
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
  return (
    <div className="bg-white border-borderColor shadow-lg rounded-lg max-w-4xl">
      <div className="p-5">
        <div className="flex justify-between items-center">
          <aside className="flex items-center gap-2">
            <AvatarComponent height="h-14" width="w-14" />
            <div className="flex flex-col">
              <span className="text-responsive font-semibold">
                {staffDetails?.firstname} {staffDetails?.middlename}
                {staffDetails?.lastname}
              </span>
              <span className="text-xs text-textColor">
                {/* Added on {formatDate(staffDetails?.createdAt as string)} */}
              </span>
            </div>
          </aside>
          <aside>
            <Button>Edit Staff</Button>
          </aside>
        </div>
        <div className="flex flex-wrap justify-between gap-10 lg:flex-nowrap mt-10">
          <div className="w-full lg:w-1/2">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col gap-16 text-sm text-textColor w-1/2 ">
                <span>Staff Code:</span>
                <span>Employee Status:</span>
                <span>Email:</span>
                <span>Cell Number:</span>
                <span>Gender</span>
                <span>Address</span>
                <span>State of Origin</span>
                <span>Next of Kin</span>
                <span>Address (Next of Kin)</span>
                <span>Phone Number (Next of Kin)</span>
                <span>Grade</span>
              </div>
              <div className="flex flex-col text-sm font-semibold gap-16 w-1/2 ">
                <span>{staffDetails?.userid}</span>
                <span>{staffDetails?.employee_status}</span>
                <span>{staffDetails?.email}</span>
                <span>{staffDetails?.cell_phone}</span>
                <span>{staffDetails?.sex}</span>
                <span>{staffDetails?.address}</span>
                <span>{staffDetails?.stateOfOrigin}</span>
                <span>{staffDetails?.nextOfKin}</span>
                <span>{staffDetails?.addressOfNOK}</span>
                <span>{staffDetails?.phoneOfNOK}</span>
                <span>{staffDetails?.gradeid}</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col gap-16 text-sm text-textColor">
                <span>Date employed:</span>
                <span>Type:</span>
                <span>Mobile:</span>
                <span>Date of birth:</span>
                <span>Marital status:</span>
                <span>Marital Status of Next of Kin:</span>
                <span>LGA:</span>
                <span>Relationship:</span>
                <span>Email of Next of Kin:</span>
                <span>Department:</span>
                <span>Branch:</span>
              </div>
              <div className="flex flex-col text-sm font-semibold gap-16 text-textColor">
                <span>{staffDetails?.date_employed}</span>
                <span>{staffDetails?.staff_type}</span>
                <span>{staffDetails?.home_phone}</span>
                <span>{staffDetails?.dob}</span>
                <span>{staffDetails?.marital_status}</span>
                <span>{staffDetails?.marital_status}</span>
                <span>{staffDetails?.lga}</span>
                <span>{staffDetails?.relationship}</span>
                <span>{staffDetails?.emailOfNOK}</span>
                <span>{staffDetails?.deptid}</span>
                <span>{staffDetails?.branchcode}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
