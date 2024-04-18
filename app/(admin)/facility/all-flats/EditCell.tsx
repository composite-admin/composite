"use client";
import { ViewUserPageIcon } from "@/components/icons";
import { EditUserPageIcon } from "@/components/icons/ViewUserPageIcon";
import Link from "next/link";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
  isLink?: boolean;
  action?: string;
}
export default function EditCell({ href, isLink, action, ...props }: IProps) {
  return (
    <div className="flex gap-2 items-center" {...props}>
      {isLink ? (
        <Link
          href={href || "/"}
          className="flex gap-2 items-center text-primaryLight-500 underline font-semibold"
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
