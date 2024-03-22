"use client";
import { DataTable } from '@/components/shared/DataTable'
import PageHead from '@/components/ui/pageHead'
import React from 'react'
import { columns } from '../columns'
import { data } from '../data'

const PendingStakeholderProject = () => {
  return (
    <>
    <PageHead headText="Pending Stakeholder Project" subText="View all your Stakeholders here" buttonText="Add Stakeholder" />
    <DataTable columns={columns} data={data} />
  </>
  )
}

export default PendingStakeholderProject