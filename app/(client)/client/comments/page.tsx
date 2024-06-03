"use client";

import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { useGetAllClientComments } from "@/hooks/useSelectOptions";

export default function CommentPage() {
  const { clientComments, isLoading } = useGetAllClientComments();

  return (
    <>
      <PageHead headText="Comments" subText="View all comments here" />
      <DataTable
        columns={columns}
        data={clientComments || []}
        isLoading={isLoading}
      />
    </>
  );
}
