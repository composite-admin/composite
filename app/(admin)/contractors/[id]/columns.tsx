"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiEye, HiOutlineCog, HiOutlineDocumentRemove, HiPencilAlt, HiUserAdd } from "react-icons/hi";

export type ReportType = {
    id: string;
    stakeHolderName: string;
    address: string;
    officePhone: string;
    contactPerson: string;
    contactPhone: string;
    addedOn: string;
    actions: string;
};

export const columns: ColumnDef<ReportType | any>[] = [
    {
        accessorKey: "contractorCode",
        header: ({ column }) => {
            return <ColumnHeader column={column} title="Contractor Code" withSort={false} />;
        },
        cell: ({ row }) => {
            return (
                <div className="">
                    <span className="font-semibold ">{row.original["worker_company"]}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "projectCode",
        header: ({ column }) => {
            return <ColumnHeader column={column} title="Project Code" withSort={false} />;
        },
        cell: ({ row }) => {
            return (
                <div className="">
                    <span className="font-semibold ">{row.original["worker_company"]}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return <ColumnHeader column={column} title="Amount" withSort={false} />;
        },
        cell: ({ row }) => {
            return (
                <div className="">
                    <span className="font-semibold ">{row.original["worker_company"]}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "createdOn",
        header: ({ column }) => {
            return <ColumnHeader column={column} title="Created On" />;
        },
        cell: ({ row }) => {
            return (
                <div className="">
                    <span className=" ">{formatDate(row.original["createdAt"])}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "createdBy",
        header: ({ column }) => {
            return <ColumnHeader column={column} title="Created By" withSort={false} />;
        },
        cell: ({ row }) => {
            return (
                <div className="">
                    <span className="font-semibold ">{row.original["worker_address"]}</span>
                </div>
            );
        },
    },

    {
        accessorKey: "comment",
        header: ({ column }) => {
            return <ColumnHeader column={column} title="Comment" withSort={false} />;
        },
        cell: ({ row }) => {
            return (
                <div className="">
                    <span className="font-semibold ">{row.original["worker_address"]}</span>
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
            return (
                <div className="">
                    <Link href="#"><span className="hover:underline font-semibold text-primaryLight-500 flex items-center"><HiEye />View </span></Link>
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
            return (
                <div className="">
                    <Link href="#"><span className="hover:underline font-semibold text-primaryLight-500 flex items-center"><HiPencilAlt />Edit </span></Link>
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
            return (
                <div className="">
                    <Link href="#"><span className="hover:underline font-semibold text-primaryLight-500 flex items-center"><HiOutlineDocumentRemove />Delete </span></Link>
                </div>
            );
        },
    },
];
