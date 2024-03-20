import { DataTable } from '@/components/shared/DataTable'
import GoBack from '@/components/shared/GoBack'
import PageHead from '@/components/ui/pageHead'
import React from 'react'
import { columns } from './columns'
import { data } from './data'

const ApartmentPage = () => {
  return (
    <>
        {/* <GoBack /> */}
        <PageHead headText='View Apartment' subText='See all apartment details here' />
        <DataTable columns={columns} data={data} />
    </>
  )
}

export default ApartmentPage