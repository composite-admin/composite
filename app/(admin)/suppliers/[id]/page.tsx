"use client"
import { AvatarComponent } from '@/components/shared/AvatarComponent'
import { DataTable } from '@/components/shared/DataTable'
import GoBack from '@/components/shared/GoBack'
import { Avatar } from '@/components/ui/avatar'
import React from 'react'
import { columns } from '../columns'
import { data } from '../data'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const SingleSupplier = () => {
  const router = useRouter()

  return (
    <div>
      <GoBack />

      <div className='flex gap-3'>
        <AvatarComponent />
        <div>
          <h1>Amarachi Okoro</h1>
          <p>NDNDOWEI8</p>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-5 my-10'>

        <div className='col-span-2 bg-white rounded-lg border-[#D0D5DD] '>
          <div className='p-5 border-b border-b-gray-300'>
            <h1 className='text-[#101928] text-[18px] font-[600]'>Project Details</h1>
          </div>

          <div className="grid grid-cols-4 p-5 gap-5">
            <div>
              <p className='text-[#475367] text-sm'>Supplier Name:</p>
              <p className='text-[#101928] text-[16px] font-[600]'>Allison Ogaga</p>
            </div>

            <div>
              <p className='text-[#475367] text-sm'>Supplier Name:</p>
              <p className='text-[#101928] text-[16px] font-[600]'>Allison Ogaga</p>
            </div>

            <div>
              <p className='text-[#475367] text-sm'>Supplier Name:</p>
              <p className='text-[#101928] text-[16px] font-[600]'>Allison Ogaga</p>
            </div>

            <div>
              <p className='text-[#475367] text-sm'>Supplier Name:</p>
              <p className='text-[#101928] text-[16px] font-[600]'>Allison Ogaga</p>
            </div>

            <div>
              <p className='text-[#475367] text-sm'>Supplier Name:</p>
              <p className='text-[#101928] text-[16px] font-[600]'>Allison Ogaga</p>
            </div>

            <div>
              <p className='text-[#475367] text-sm'>Supplier Name:</p>
              <p className='text-[#101928] text-[16px] font-[600]'>Allison Ogaga</p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg border-[#D0D5DD]'>
          <h2 className='p-5 text-[20px]'>Quick Actions</h2>

          <div className='text-primaryLight supplierActions '>
            <p className='cursor-pointer' onClick={()=> router.push("/suppliers/90/edit")}>Edit Supplier Information</p>
            <p>Add Supplier Material</p>
            <p>Add Tools and Machinery</p>
          </div>
        </div>

      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default SingleSupplier