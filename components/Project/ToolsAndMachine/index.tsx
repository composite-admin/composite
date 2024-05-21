"use client";

import { DataTable } from "@/components/shared/DataTable";
import React from "react";
import { columns } from "./columns";
import { useGetAllRequests } from "@/hooks/useSelectOptions";
import { IRequestData } from "@/utils/types";

const ToolsAndMachine = ({ projectCode }: { projectCode: string }) => {
  const { requests, isLoading, isError } = useGetAllRequests();
  const toolsAndMachine = requests?.filter(
    (request: IRequestData) =>
      (request.request_type === "Tools and Machinery Buy" ||
        request.request_type === "Tools and Machinery Rent") &&
      request.status === "APPROVED" &&
      request.project_code === projectCode
  );

  return (
    <div>
      <h2 className="text-[20px] font-[600]">
        Tools And Machinery ({toolsAndMachine?.length})
      </h2>
      <DataTable
        showSearch={false}
        columns={columns}
        data={toolsAndMachine ?? []}
      />
    </div>
  );
};

export default ToolsAndMachine;
