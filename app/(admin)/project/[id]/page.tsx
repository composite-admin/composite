import { DataTable } from '@/components/shared/DataTable'
import GoBack from '@/components/shared/GoBack'
import PageHead from '@/components/ui/pageHead'
import React from 'react'
import { columns } from '../apartment/columns'
import { data } from '../apartment/data'
import { HiDocument } from 'react-icons/hi2'

const page = () => {
  const options = [
    {
        title: "Add Startup Cost"
    },
    {
        title: "Add Management Cost"
    },
    {
        title: "Add stakeholder Cost"
    },
    {
        title: "Add Worker"
    },
    {
        title: "Add Material"
    },
    {
        title: "View Apartment"
    },
    {
        title: "View Tenant"
    },
    {
        title: "View Images"
    },
    {
        title: "Add Startup Cost"
    }
]

  return (
    <>
        <GoBack />

        <PageHead headText='High Cost Tower Renovation' subText='Date Added, 6th July' buttonText='Edit Project'/>

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

                <div className='bg-white rounded-lg border-[#D0D5DD] grid grid-cols-3 gap-5 text-primaryLight p-5'>
                    {
                        options.map((item, i) => {
                            return (
                                <div key={i} className='flex items-center justify-center flex-col'>
                                    <HiDocument />
                                    <p className='text-center text-[10.37px] text-[#6E6E6E]'>{item.title}</p>
                                </div>
                            )
                        })
                    }
                </div>

            </div>

        <DataTable columns={columns} data={data} />
    </>
  )
}

export default page