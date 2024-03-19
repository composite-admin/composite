import { DataTable } from '@/components/shared/DataTable'
import GoBack from '@/components/shared/GoBack'
import PageHead from '@/components/ui/pageHead'
import React from 'react'
import { columns } from './columns'
import { data } from './data'

const PickedFromStore = () => {
  return (
    <>
        <GoBack />

        <PageHead headText="Items Picked from Store" subText="View all your items here" />
      <DataTable columns={columns} data={data} />

    </>
  )
}

export default PickedFromStore