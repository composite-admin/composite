"use client";
import { ViewUserPageIcon } from "@/components/icons";
import { EditUserPageIcon } from "@/components/icons/ViewUserPageIcon";
import Link from "next/link";
import { Row } from "@tanstack/react-table";
import {
  ProjectPageFormType,
  useTableActionStore,
} from "@/store/useTableActionStore";
import TableAction from "../../cash-advance/details/(forms_and_modals)/TableAction";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";
import { userStore } from "@/store/auth/AuthStore";
import { useEditFlatModal } from "@/store/modals/useCreateModal";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
  projectCode?: string;
  isLink?: boolean;
  action?: string | ProjectPageFormType;
  row?: Row<any>;
  rowId?: number;
  query?: string | undefined;
  url?: string | undefined;
}
export default function EditCell({
  href,
  isLink,
  projectCode,
  action,
  row,
  rowId,
  ...props
}: IProps) {
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const { userType } = userStore();
  const { setProjectCode } = useEditFlatModal();

  const CAN_EDIT = staffPrivilege?.find(
    (item: any) => item.type === "project" || item.type === "worker"
  )?.can_edit;
  const { onOpen, setTableActions, setEditOrDelete, setRowID, rowID } =
    useTableActionStore();

  const setAction = (args: any) => {
    if (!isLink) {
      setTableActions(args);
      setRowID(Number(rowId));
      setEditOrDelete("edit");
      onOpen();
    }
    if (projectCode) {
      setProjectCode(projectCode);
    }
    return;
  };

  if (!CAN_EDIT && userType !== "admin") {
    return <p>-</p>;
  }

  return (
    <div
      className="flex gap-2 items-center"
      {...props}
      onClick={() => setAction(action)}
    >
      {isLink ? (
        <Link
          href={href || "/"}
          className="flex gap-2 items-center text-primaryLight-500 underline font-semibold "
        >
          Edit
          <EditUserPageIcon />
        </Link>
      ) : (
        <div
          className="flex gap-2 items-center text-primaryLight-500 underline font-semibold"
          {...props}
        >
          Edit
          <EditUserPageIcon />
        </div>
      )}
    </div>
  );
}

export function ViewCell({ href, isLink, action, ...props }: IProps) {
  return (
    <div className="flex gap-2 items-center" {...props}>
      {isLink ? (
        <Link
          href={href || "/"}
          className="flex gap-2 items-center text-primaryLight-500 underline font-semibold"
        >
          View
        </Link>
      ) : (
        <div
          className="flex gap-2 items-center text-primaryLight-500 underline font-semibold"
          {...props}
        >
          View
        </div>
      )}
    </div>
  );
}

export function DeleteCell({
  href,
  isLink,
  action,
  row,
  rowId,
  url,
  query,
  ...props
}: IProps) {
  const { onOpen, setTableActions, setEditOrDelete, setRowID, setDeleteUrl } =
    useTableActionStore();
  const { data: staffPrivilege } = useStaffPrivilegeStore();
  const { userType } = userStore();
  const CAN_EDIT = staffPrivilege?.find(
    (item: any) => item.type === "project"
  )?.can_edit;

  const CAN_DELETE = staffPrivilege?.find(
    (item: any) => item.type === "project"
  )?.can_delete;

  const setAction = () => {
    setTableActions(null);
    setRowID(Number(rowId));
    setDeleteUrl(url || "");
    setEditOrDelete("delete");
    useTableActionStore.setState({ query: query || "" });
    onOpen();
  };

  if (!CAN_DELETE && userType !== "admin") {
    return <p>-</p>;
  }

  return (
    <div
      className="flex gap-2 items-center"
      {...props}
      onClick={() => setAction()}
    >
      <div
        className="flex gap-2 items-center text-red-500 font-semibold cursor-pointer"
        {...props}
      >
        Delete
      </div>
    </div>
  );
}
