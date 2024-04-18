import { DataTable } from '@/components/shared/DataTable'
import React from 'react'
import { columns } from './columns'
import { data } from './data'

const ProjectTeam = () => {
    
  return (
    <div>
      <h2 className="font-semibold pt-5 lg:text-2xl">Project Team</h2>
      <DataTable showSearch={false} columns={columns} data={data} />
    </div>
  );
}

export default ProjectTeam