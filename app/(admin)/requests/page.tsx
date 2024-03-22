
"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHeaderComponent from "@/components/shared/PageHeaderComponent";
import { data } from "../consultants/data";
import { columns } from "../consultants/columns";
export default function page() {
  return (
    <>
    <PageHeaderComponent subTitle="A request of daily, weekly and monthly activites" title="Request"/>
    <DataTable columns={columns} data={data} />
    </>
  )
}
