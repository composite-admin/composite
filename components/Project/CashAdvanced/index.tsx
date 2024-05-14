import { DataTable } from '@/components/shared/DataTable'
import React from 'react'
import { columns } from './columns'
import { data } from './data'
import { useGetAllCashAdvance } from "@/hooks/useSelectOptions";
import { ICashAdvanceData } from "@/utils/types";

const CashAdvanced = ({ projectCode }: { projectCode: string }) => {
  const { cashAdvances } = useGetAllCashAdvance();
  const filteredCashAdvances = cashAdvances?.filter(
    (cashAdvance: ICashAdvanceData) =>
      cashAdvance.project_code === projectCode &&
      cashAdvance.status === "Approved"
  );
  return (
    <div>
      <h2 className="text-[20px] font-[600]">
        Cash Advanced ({filteredCashAdvances?.length})
      </h2>
      <DataTable
        showSearch={false}
        columns={columns}
        data={filteredCashAdvances ?? []}
      />
    </div>
  );
};

export default CashAdvanced