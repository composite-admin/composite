"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { useGetAllClientComments } from "@/hooks/useSelectOptions";
import { userStore } from "@/store/auth/AuthStore";
import { ICommentData } from "@/app/(admin)/manage-client/client-details/[id]/commentCol";

export default function CommentPage() {
  const { clientComments, isLoading } = useGetAllClientComments();
  const { userId } = userStore();
  const filteredComment = clientComments?.filter(
    (item: ICommentData) => String(item?.client_id) === userId
  );
  return (
    <>
      <PageHead
        headText={`Comments (${filteredComment?.length || 0})`}
        subText="View all comments here"
      />
      <DataTable
        columns={columns}
        data={filteredComment || []}
        isLoading={isLoading}
      />
    </>
  );
}
