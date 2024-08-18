"use client"
import { DataTable } from '@/components/shared/DataTable'
import GoBack from '@/components/shared/GoBack'
import PageHead from '@/components/ui/pageHead'
import React, { useEffect } from 'react'
import { columns } from './columns'
import { useRouter, useParams } from 'next/navigation'
import useStakeholdersActionsStore from "@/store/actions/stakeholdersActions"
import { useQuery } from "@tanstack/react-query";
import { IStakeholderProjectData } from "@/utils/types";
import { getStuffTyped } from "@/hooks/useSelectOptions";
import { Button } from "@/components/ui/button";
import Stakeholder from "@/components/Project/Stakeholder";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";

const DetailItem = ({ label, value }: any) => (
  <div>
    <p className="text-[#101928]  font-semibold">{label}</p>
    <p className="text-textColor ">{value}</p>
  </div>
);

const StakeholderDetails = ({ selectedItem }: any) => {
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_EDIT = staffPrivilege?.find(
    (item: any) => item.type === "stakeholder"
  )?.can_edit;
  const router = useRouter();
  if (!selectedItem) {
    return null;
  }

  const detailItems = [
    { label: "Stakeholder Name", value: selectedItem.stakeholder_name },
    {
      label: "Stakeholder Code",
      value: selectedItem && selectedItem.stakeholder_code?.toUpperCase(),
    },
    { label: "Stakeholder Phone", value: selectedItem.stakeholder_ofc_phone },
    { label: "Government Agencies", value: selectedItem.government_agencies },
    {
      label: "Non Government Agencies",
      value: selectedItem.non_government_agencies,
    },
    { label: "Contact Person", value: selectedItem.contact_person ?? "-" },
    { label: "Contact Mobile", value: selectedItem.contact_mobile },
    { label: "Contact Home Phone", value: selectedItem.contact_home_phone },
    { label: "Address", value: selectedItem.stakeholder_address, colSpan: 3 },
  ];

  return (
    <div className="gap-5 my-10">
      <div className="col-span-2 bg-white rounded-lg border-[#D0D5DD] ">
        <div className="p-5 border-b border-b-gray-300 flex justify-between items-center">
          <h1 className="text-[#101928] text-[18px] font-[600]">
            Stakeholder Details
          </h1>
          <Button
            disabled={!CAN_EDIT}
            onClick={() => {
              selectedItem &&
                router.push(`/staff/stakeholders/${selectedItem.id}/edit`);
            }}>
            Edit Stakeholder
          </Button>
        </div>

        <div className="grid grid-cols-4 p-5 gap-5">
          {detailItems.map(({ label, value, colSpan = 1 }, index) => (
            <div
              key={index}
              className={colSpan > 1 ? `col-span-${colSpan}` : ""}>
              <DetailItem
                label={label}
                value={value}
              />
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

const SingleStakeholder = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const selectedItem = useStakeholdersActionsStore<any>(
    (state) => state.selectedItem
  );
  const getStakeholderById = useStakeholdersActionsStore<any>(
    (state) => state.getStakeholderById
  );
  const getAllStakeholders = useStakeholdersActionsStore<any>(
    (state) => state.getAllStakeholders
  );

  useEffect(() => {
    getAllStakeholders();
  }, [getAllStakeholders]);

  useEffect(() => {
    if (params.id) {
      getStakeholderById(params.id);
    }
  }, [getStakeholderById, params.id]);

  const { data, error, isPending, isError } = useQuery({
    queryKey: [
      "get all stakeholder projects by stakeholder code",
      selectedItem?.stakeholder_code,
    ],
    queryFn: async () =>
      getStuffTyped<IStakeholderProjectData[]>(
        `/stakeholder-project/stakeholder-code/${selectedItem?.stakeholder_code}`
      ),
    refetchOnMount: "always",
  });

  return (
    <>
      <GoBack />

      <div>
        {/* <PageHead
          headText={selectedItem && selectedItem.stakeholder_name}
          subText={selectedItem && selectedItem.stakeholder_code}
          buttonText="Edit Stakeholder"
          buttonAction={() =>
            selectedItem && router.push(`/stakeholders/${selectedItem.id}/edit`)
          }
        /> */}
        <StakeholderDetails selectedItem={selectedItem} />
        <PageHead
          headText="Projects"
          subText="View all your stakeholder's projects here"
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

export default SingleStakeholder