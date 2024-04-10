import { DataTable } from '@/components/shared/DataTable'
import React from 'react'
import { columns } from './columns'
import { data } from './data'

const Worker = () => {
    
  return (
    <div>
         <h2 className='text-[20px] font-[600]'>Worker</h2>
        <DataTable showSearch={false} columns={columns} data={data}/>
    </div>
  )
}

export default Worker