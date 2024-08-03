"use client";
import { ViewUserPageIcon } from "@/components/icons";
import { EditUserPageIcon } from "@/components/icons/ViewUserPageIcon";
import Link from "next/link";
import { Row } from "@tanstack/react-table";
import {
  breakdownModal,
  useAddAndEditBreakDownModal,
} from "@/store/modals/useCreateModal";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  action?: string;
  row?: Row<any>;
  rowId?: number;
  query?: string | undefined;
}
export default function EditBreakdown({
  action,
  row,
  rowId,
  ...props
}: IProps) {
  const { setAction, onOpen } = useAddAndEditBreakDownModal();

  const setModalType = (args: breakdownModal) => {
    useAddAndEditBreakDownModal.setState({ breakdownModalType: "edit" });
    setAction(String(rowId));
    onOpen();
  };

  return (
    <div className="flex gap-2 items-center" {...props}>
      <div
        onClick={() => setModalType("edit")}
        className="flex gap-2 items-center text-primaryLight-500 underline font-semibold"
        {...props}
      >
        Edit
        <EditUserPageIcon />
      </div>
    </div>
  );
}
