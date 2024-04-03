"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useAddWorkerModal } from "@/store/inventory/UseInventoryModal";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiUserAdd } from "react-icons/hi";

export type ContractorType = {
    id: string;
    contractor_code: string;
    contractor_name: string;
    contractor_service: string;
    contractor_address: string;
    contractor_ofc_phone: string;
    contact_person: string;
    contact_mobile: string;
    contact_home_phone: string;
    email: string;
    website: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
};



export const columns: ColumnDef<ContractorType>[] = [
    {
        accessorKey: "contractorCode",
        header: ({ column }) => {
            return <ColumnHeader column={column} title="Contractor Code" />;
        },
        cell: ({ row }) => {
            return (
                <Link href={`/contractor/${row.original["id"]}`}>
                    <div className="flex  flex-col">
                        <span className="w-32 font-semibold text-primaryLight-500 truncate underline">
                            {row.original["contractor_code"]}
                        </span>
                    </div>
                </Link>
            );
        },
    },

    {
        accessorKey: "contractorName",
        header: ({ column }) => {
            return (
                <ColumnHeader column={column} title="Contractor Name" withSort={false} />
            );
        },
        cell: ({ row }) => {
            return (
                <div className="">
                    <span className="font-semibold ">{row.original["contractor_name"]}</span>
                </div>
            );
        },
    },

   
    {
        accessorKey: "contractorService",
        header: ({ column }) => {
            return <ColumnHeader column={column} title="Service" withSort={false} />;
        },
        cell: ({ row }) => {
            return (
                <div className="">
                    <p className='bg-[#E7F6EC] px-1 text-[12px] w-fit rounded-full text-[#036B26]'>{row.original["contractor_service"]}</p>
                </div>
            );
        },
    },
    {
        accessorKey: "createdOn",
        header: ({ column }) => {
            return (
                <ColumnHeader column={column} title="Created On" withSort={false} />
            );
        },
        cell: ({ row }) => {
            return (
                <div className="">
                    <span className=" ">{row.original["createdAt"]}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "action",
        header: ({ column }) => {
            return <ColumnHeader column={column} title="Action" />;
        },
        cell: ({ row }) => {
            // const onOpen = useAddWorkerModal(state => state.onOpen);
            return (
                <Link href={"/project/add-worker"}>
                    <div className="cursor-pointer" >
                        <span className="font-semibold text-primaryLight-500 flex items-center hover:underline"><HiUserAdd />Add </span>
                    </div>
                </Link>
            );
        },
    },
];
