import { DataTable } from '@/components/shared/DataTable'
import PageHead from '@/components/ui/pageHead'
import React from 'react'
import { columns } from './columns'
import { data } from './data'


const TenantPage = () => {
  return (
    <>
      <PageHead
        headText="Tenant"
        subText="A request for daily, weekly and monthly activities"
      />
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default TenantPage