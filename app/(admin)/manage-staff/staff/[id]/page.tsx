"use client";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import GoBack from "@/components/shared/GoBack";
import { Button } from "@/components/ui/button";
import { api } from "@/config/api";
import { useGetStaffPrivileges } from "@/hooks/useSelectOptions";
import useManageStaffStore from "@/store/manage-staff/useManageStaffStore";
import { useAddPrivilegeModal } from "@/store/modals/useCreateModal";
import { formatDate } from "@/utils/formatDate";
import { ApiResponse, IManageStaffData } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

interface IProps {
  params: { id: string };
}
const staffDetailsKeys = [
  "Staff Code",
  "Employee Status",
  "Email",
  "Cell Number",
  "Gender",
  "Address",
  "State of Origin",
  "Grade",
  "Date employed",
  "Type",
  "Mobile",
  "Date of birth",
  "Marital status",
  "LGA",
  "Department",
  "Branch",
];

const nextOfKinKeys = [
  "Next of Kin",
  "Address (Next of Kin)",
  "Phone Number (Next of Kin)",
  "Marital Status of Next of Kin",
  "Relationship",
  "Email of Next of Kin",
];

const staffDetailsValues = [
  "userid",
  "employee_status",
  "email",
  "cell_phone",
  "sex",
  "address",
  "stateOfOrigin",
  "gradeid",
  "date_employed",
  "staff_type",
  "home_phone",
  "dob",
  "marital_status",
  "lga",
  "deptid",
  "branchcode",
];

const nextOfKinValues = [
  "nextOfKin",
  "addressOfNOK",
  "phoneOfNOK",
  "marital_status",
  "relationship",
  "emailOfNOK",
];

const bankDetailsKeys = ["Bank name", "Account name", "Account number"];
const bankDetailsValues = ["bank_name", "account_name", "account_number"];

export default function ManageStaffPage({ params }: IProps) {
  const { setStaffDetails, staffDetails } = useManageStaffStore();
  const { isLoading: isLoadingPrivileges, staffPrivileges } =
    useGetStaffPrivileges(staffDetails?.userid!);
  const { onOpen } = useAddPrivilegeModal();
  const [toggle, setToggle] = useState(false);
  const showBankDetails = () => setToggle(!toggle);
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
    refetchOnMount: "always",
  });

  return (
    <>
      <GoBack />
      <div className="bg-white border-borderColor rounded-lg max-w-4xl mx-auto p-6 pb-16">
        <div className="p-5">
          <div className="flex justify-between items-center">
            <aside className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-responsive font-semibold">
                  {staffDetails?.firstname} {staffDetails?.middlename}{" "}
                  {staffDetails?.lastname}
                </span>
                <span className="text-xs ">
                  Added on{" "}
                  {staffDetails?.createdAt &&
                    formatDate(staffDetails?.createdAt)}
                </span>
              </div>
            </aside>
            <aside className="space-x-3">
              <Button
                variant={"outline"}
                onClick={onOpen}
                disabled={!staffDetails || isLoadingPrivileges}>
                <p className="font-semibold">Grant Privileges</p>
              </Button>
              <Button>
                <Link href={`/manage-staff/edit/${params.id}`}>Edit</Link>
              </Button>
            </aside>
          </div>
          <div className="mt-10 border-b pb-8">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 ">
              {staffDetailsKeys.map((key, index) => (
                <div
                  key={index}
                  className="flex justify-between  flex-col gap-2">
                  <span className="font-semibold">{key}:</span>
                  <span
                    className={`text-textColor ${
                      staffDetailsValues[index] === "userid" ? "uppercase" : ""
                    }`}>
                    {
                      staffDetails?.[
                        staffDetailsValues[index] as keyof IManageStaffData
                      ]
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 border-b pb-10">
            <p className="py-5 font-semibold text-lg">Next of Kin Details</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 ">
              {nextOfKinKeys.map((key, index) => (
                <div
                  key={index}
                  className="flex justify-between  flex-col gap-2">
                  <span className="font-semibold">{key}:</span>
                  <span
                    className={`text-textColor ${
                      nextOfKinValues[index] === "userid" ? "uppercase" : ""
                    }`}>
                    {
                      staffDetails?.[
                        nextOfKinValues[index] as keyof IManageStaffData
                      ]
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=" flex justify-end mt-5">
          <Button onClick={showBankDetails}>
            {toggle ? "Hide" : "View"} Bank Details
          </Button>
        </div>
        {toggle && (
          <div>
            <div className="py-3">
              <h2>Bank Details</h2>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col gap-5 text-sm ">
                {bankDetailsKeys.map((key, index) => (
                  <span key={index}>{key}:</span>
                ))}
              </div>
              <div className="flex flex-col text-sm font-semibold gap-5 ">
                {bankDetailsValues.map((value, index) => (
                  <span key={index}>
                    {staffDetails?.[value as keyof IManageStaffData]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}