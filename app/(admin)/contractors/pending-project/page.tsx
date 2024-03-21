import { DataTable } from '@/components/shared/DataTable'
import PageHead from '@/components/ui/pageHead'
import React from 'react'
import { columns } from './columns'
import { data } from './data'

const PendingProject = () => {
  return (
    <>
    <PageHead headText="Pending Contractor Project" subText="View all your contractors here" buttonText="Add Contractor" />
    <DataTable columns={columns} data={data} />
  </>
  )
}

export default PendingProject