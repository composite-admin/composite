"use client";
import { DataTable } from "@/components/shared/DataTable";
import GoBack from "@/components/shared/GoBack";
import PageHead from "@/components/ui/pageHead";
import React, { useEffect } from "react";
import { columns } from "./columns";
import { useRouter, useParams } from "next/navigation";
import useContractorsActionsStore from "@/store/actions/contractorsActions";
import { useQuery } from "@tanstack/react-query";
import { getStuffTyped } from "@/hooks/useSelectOptions";
import { IContractorProjectData } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";
import { BlockEdiComponent } from "@/components/shared/BlockEdit";

const DetailItem = ({ label, value }: any) => (
  <div>
    <p className="text-[#101928] text-[16px] font-[600]">{label}</p>
    <p className="font-semibold text-textColor-500">{value}</p>
  </div>
);

const ContractorDetails = ({ selectedItem }: any) => {
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_EDIT = staffPrivilege?.find(
    (item: any) => item.type === "contractor"
  )?.can_edit;

  const router = useRouter();
  if (!selectedItem) {
    return null;
  }

  const detailItems = [
    { label: "Contractor Name", value: selectedItem.contractor_name },
    {
      label: "Contractor Code",
      value: selectedItem && selectedItem.contractor_code?.toUpperCase(),
    },
    { label: "Contractor Phone", value: selectedItem.contractor_ofc_phone },
    { label: "Contact Person", value: selectedItem.contact_person },
    { label: "Contact Mobile", value: selectedItem.contact_mobile },
    { label: "Contact Home Phone", value: selectedItem.contact_home_phone },
    { label: "Email", value: selectedItem.email },
    { label: "Website", value: selectedItem.website },
    { label: "Service", value: selectedItem.contractor_service },
    {
      label: "Address",
      value: selectedItem.contractor_address,
      colSpan: 3,
    },
  ];

  if (!CAN_EDIT) {
    return <BlockEdiComponent />;
  }

  return (
    <div className="gap-5 my-10">
      <div className="col-span-2 bg-white rounded-lg border-[#D0D5DD] ">
        <div className="p-5 border-b border-b-gray-300 flex justify-between items-center">
          <h1 className="text-[#101928] text-[18px] font-[600]">
            Contractor Details
          </h1>
          <Button
            onClick={() => {
              selectedItem &&
                router.push(`/contractors/${selectedItem.id}/edit`);
            }}
          >
            Edit Contractor
          </Button>
        </div>

        <div className="grid grid-cols-4 p-5 gap-5">
          {detailItems.map(({ label, value, colSpan = 1 }, index) => (
            <div
              key={index}
              className={colSpan > 1 ? `col-span-${colSpan}` : ""}
            >
              <DetailItem label={label} value={value} />
            </div>
          ))}
        </div>

        <div className="p-5">
          <p className="text-[#101928] text-[16px] font-[600]">Comment:</p>
          <p className="text-textColor  font-[600]">{selectedItem.comment}</p>
        </div>
      </div>
    </div>
  );
};

const SingleContractor = () => {
  const { data: staffPrivilege } = useStaffPrivilegeStore();
  const CAN_EDIT = staffPrivilege?.find(
    (item: any) => item.type === "contractor"
  ).can_edit;
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const selectedItem = useContractorsActionsStore<any>(
    (state) => state.selectedItem
  );
  const getContractorById = useContractorsActionsStore<any>(
    (state) => state.getContractorById
  );
  const getAllContractors = useContractorsActionsStore<any>(
    (state) => state.getAllContractors
  );

  useEffect(() => {
    getAllContractors();
  }, [getAllContractors]);

  useEffect(() => {
    if (params.id) {
      getContractorById(params.id);
    }
  }, [getContractorById, params.id]);

  const { data, error, isPending, isError } = useQuery({
    queryKey: [
      "get all contractor projects by contractor code",
      selectedItem?.contractor_code,
    ],
    queryFn: async () =>
      getStuffTyped<IContractorProjectData[]>(
        `/contractor-projects/contractor-code/${selectedItem?.contractor_code}`
      ),
    refetchOnMount: "always",
  });

  if (!CAN_EDIT) {
    return <BlockEdiComponent />;
  }

  return (
    <>
      <GoBack />
      <div>
        {/* <PageHead
          headText={selectedItem && selectedItem.contractor_name}
          subText={selectedItem && selectedItem.contractor_code}
          buttonText="Edit Contractor"
          buttonAction={() =>
            selectedItem && router.push(`/contractors/${selectedItem.id}/edit`)
          }
        /> */}
        <ContractorDetails selectedItem={selectedItem} />
        <PageHead
          headText="Projects"
          subText="View all your contractor's projects here"
        />
        <DataTable
          columns={columns}
          data={data ?? []}
          isLoading={isPending}
          isError={isError}
          errorMessage={error?.message ?? "Something went wrong"}
        />
      </div>
    </>
  );
};

export default SingleContractor;
