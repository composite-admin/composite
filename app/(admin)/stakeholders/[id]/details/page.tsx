"use client"
import keys from '@/app/(admin)/inventory/keys'
import GoBack from '@/components/shared/GoBack'
import ViewDetails from '@/components/shared/ViewDetails'
import React from 'react'

const SingleStakeholderDetails = () => {
  return (
    <>
        <GoBack />

        <ViewDetails title='Jerry Inc Limited' dateSubmitted='6th July, 2023' keys={keys}  editAction={()=> {}}/>
    </>
  )
}

export default SingleStakeholderDetails