"use client";
import { ViewUserPageIcon } from "@/components/icons";
import { EditUserPageIcon } from "@/components/icons/ViewUserPageIcon";
import Link from "next/link";

type Props = {
  href: string;
};
export default function EditCell({ href }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <Link
        href={href || "/"}
        className="flex gap-2 items-center text-primaryLight-500 underline font-semibold"
      >
        <EditUserPageIcon />
        Edit
      </Link>
    </div>
  );
}

export function ViewCell({ href }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <Link
        href={href || "/"}
        className="flex gap-2 items-center text-primaryLight-500 underline font-semibold"
      >
        View
        <ViewUserPageIcon />
      </Link>
    </div>
  );
}
