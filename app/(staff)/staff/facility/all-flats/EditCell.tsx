"use client";
import { ViewUserPageIcon } from "@/components/icons";
import { EditUserPageIcon } from "@/components/icons/ViewUserPageIcon";
import Link from "next/link";
import { Row } from "@tanstack/react-table";
import {
  ProjectPageFormType,
  useTableActionStore,
} from "@/store/useTableActionStore";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
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
  action,
  row,
  rowId,
  ...props
}: IProps) {
  const { onOpen, setTableActions, setEditOrDelete, setRowID, rowID } =
    useTableActionStore();

  const setAction = (args: any) => {
    if (!isLink) {
      setTableActions(args);
      setRowID(Number(rowId));
      setEditOrDelete("edit");
      onOpen();
    }
    return;
  };

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

  const setAction = () => {
    setTableActions(null);
    setRowID(Number(rowId));
    setDeleteUrl(url || "");
    setEditOrDelete("delete");
    useTableActionStore.setState({ query: query || "" });
    onOpen();
  };
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

// type Props = Row<Material>;

// const EditPartMaterial: React.FC<Props> = (props) => {
//   const { showModal } = useModal();

//   const showEditMaterialModal = () => showModal(<EditMaterialModal {...props} />);

//   return (
//     <div className="" onClick={showEditMaterialModal}>
//       <span className="font-semibold cursor-pointer hover:underline text-primaryLight-500 flex items-center">
//         <HiPencilAlt className="text-xl" /> <span>Edit</span>
//       </span>
//     </div>
//   );
// };
