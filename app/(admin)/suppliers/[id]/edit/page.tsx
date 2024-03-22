"use client"
import { DataTable } from '@/components/shared/DataTable'
import GoBack from '@/components/shared/GoBack'
import PageHead from '@/components/ui/pageHead'
import React from 'react'
import { columns } from './columns'
import { data } from './data'
import { HiHome } from 'react-icons/hi2'
import { useSuccessModal } from '@/store/modals/useCreateModal'
import { useRouter } from 'next/navigation'

const EditSupplier = () => {
    const onOpen = useSuccessModal(state => state.onOpen)
    const router = useRouter()

    return (
        <>
            <GoBack />

        <div className="my-1 rounded-lg border border-outline bg-white p-[20px] mt-10 w-4/5 mx-auto">
            <div className="flex items-center justify-between cursor-pointer">
                <div className='flex gap-2 items-center'>
                    <div className='p-2 rounded-full bg-[#52a7f226] w-[50px] h-[50px] flex items-center justify-center'>
                        <HiHome />
                    </div>
                    <p className='text-[22px] font-[600] text-[#101928]'>Edit Supplier</p>
                </div>

            </div>

            <div className="grid grid-cols-2 gap-2 my-5 edit">
                <div className="flex flex-col ">
                    <p className="value">
                        Supplier Name
                    </p>

                    <input type="text" placeholder='Enter name' />
                </div>

                <div className="flex flex-col ">
                    <p className="value">
                        Address
                    </p>

                    <input type="text" />
                </div>

                <div className="flex flex-col ">
                    <p className="value">
                        Supplier Phone
                    </p>

                    <input type="tel" />
                </div>

                <div className="flex flex-col ">
                    <p className="value">
                        Contact Person
                    </p>

                    <input type="text" />
                </div>

                <div className="flex flex-col ">
                    <p className="value">
                        Contact Office Phone
                    </p>

                    <input type="tel" />
                </div>

                <div className="flex flex-col ">
                    <p className="value">
                        Contact Mobile
                    </p>

                    <input type="tel" />
                </div>

                <div className="flex flex-col col-span-2">
                    <div className="value">
                        Comment
                    </div>

                    <textarea />
                </div>

                <button className="bg-[#EBEBEB] text-textColor rounded-md" onClick={()=> router.back()}>Cancel</button>
                <button className="bg-primaryLight text-white  p-5 rounded-md" onClick={onOpen}>Submit</button>
            </div>


        </div >

    </>
  )
}

export default EditSupplier