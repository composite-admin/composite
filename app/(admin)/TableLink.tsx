"use client";
import { useGetAllProjectData } from "@/hooks/useSelectOptions";
import { Row } from "@tanstack/react-table";
import Link from "next/link";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
  isLink?: boolean;
  row?: Row<any>;
  rowId?: string;
  children?: React.ReactNode;
  url?: string | undefined;
}

export default function TableLink({ href, children, row, rowId }: IProps) {
  const { projects, isLoading } = useGetAllProjectData();
  const projectid = projects?.find((item) => item?.project_code === rowId)?.id;
  return <Link href={`project/${String(projectid)}` ?? ""}>{children}</Link>;
}
