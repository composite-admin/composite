"use client"
import { AvatarComponent } from '@/components/shared/AvatarComponent'
import { DataTable } from '@/components/shared/DataTable'
import GoBack from '@/components/shared/GoBack'
import { Avatar } from '@/components/ui/avatar'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { columns } from '../columns'
import { useRouter, useParams } from 'next/navigation'
import useSuppliersActionsStore from "@/store/actions/suppliersActions"
import SwitchTabs, { Key } from '@/components/ui/switchTabs'

const SingleSupplier = () => {
  const router = useRouter()
  const params = useParams<{ id: string }>()

  const selectedItem = useSuppliersActionsStore<any>((state) => state.selectedItem)
  const getSupplierById = useSuppliersActionsStore<any>((state) => state.getSupplierById)
  const suppliers = useSuppliersActionsStore<any>((state: any) => state.items);
  const getAllSuppliers = useSuppliersActionsStore<any>((state: any) => state.getAllSuppliers);

  console.log(selectedItem)

  useEffect(() => {
    getAllSuppliers();
  }, [getAllSuppliers]);

  useEffect(() => {

    if (params.id) {
      getSupplierById(params.id);
    }
  }, [getSupplierById, params.id]);

  const keys: Key[] = [
    {
      title: "Materials",
      component: null
    },
    {
      title: "Tools and Machine",
      component: null
    }
  ]

  return (
    <div>
      <GoBack />

      <div className='flex gap-3'>
        <AvatarComponent />
        <div>
          <h1>{selectedItem && selectedItem.supplier_name}</h1>
          <p>{selectedItem && selectedItem.supplier_code}</p>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-5 my-10'>

        <div className='col-span-2 bg-white rounded-lg border-[#D0D5DD] '>
          <div className='p-5 border-b border-b-gray-300'>
            <h1 className='text-[#101928] text-[18px] font-[600]'>Supplier Details</h1>
          </div>

          <div className="grid grid-cols-4 p-5 gap-5">
            <div>
              <p className='text-[#475367] text-sm'>Supplier Name:</p>
              <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.supplier_name}</p>
            </div>

            <div>
              <p className='text-[#475367] text-sm'>Supplier Code:</p>
              <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.supplier_code}</p>
            </div>

            <div>
              <p className='text-[#475367] text-sm'>Address:</p>
              <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.supplier_address}</p>
            </div>

            <div>
              <p className='text-[#475367] text-sm'>Supplier Phone:</p>
              <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.supplier_ofc_phone}</p>
            </div>

            <div>
              <p className='text-[#475367] text-sm'>Contact Person:</p>
              <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.contact_person}</p>
            </div>

            <div>
              <p className='text-[#475367] text-sm'>Contact Mobile:</p>
              <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.contact_mobile}</p>
            </div>

            <div>
              <p className='text-[#475367] text-sm'>Contact Home Phone:</p>
              <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.contact_home_phone}</p>
            </div>

            <div>
              <p className='text-[#475367] text-sm'>Comment:</p>
              <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.comment}</p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg border-[#D0D5DD]'>
          <h2 className='p-5 text-[20px]'>Quick Actions</h2>

          <div className='text-primaryLight supplierActions '>
            <p className='cursor-pointer' onClick={() => router.push("/suppliers/90/edit")}>Edit Supplier Information</p>
            <p>Add Supplier Material</p>
            <p>Add Tools and Machinery</p>
          </div>
        </div>

      </div>

      <SwitchTabs keys={keys} />

      <DataTable showSearch={false} columns={columns} data={suppliers.data ? suppliers.data : []} clickAction={() => { }} />
    </div>
  )
}

export default SingleSupplier