import { DataTable } from '@/components/shared/DataTable'
import React from 'react'
import { columns } from './columns'
import { data } from './data'

const StartupCost = () => {
  return (
    <div>
         <h2 className='text-[20px] font-[600]'>Startup Cost</h2>
        <DataTable showSearch={false} columns={columns} data={data}/>
    </div>
  )
}

export default StartupCost