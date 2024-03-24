"use client"
import { DataTable } from '@/components/shared/DataTable'
import GoBack from '@/components/shared/GoBack'
import PageHead from '@/components/ui/pageHead'
import React from 'react'
import { columns } from '../apartment/columns'
import { data } from '../apartment/data'
import { HiDocument } from 'react-icons/hi2'
import { useAddContractorModal, useAddMaterial, useAddProjectModal, useAddStakeHolderModal, useAddStartupModal } from '@/store/inventory/UseInventoryModal'
import StartUpIcon from '@/components/icons/StartUpIcon'

const SingleProject = () => {
    const onOpenAddStakeHolder = useAddStakeHolderModal(state => state.onOpen);
    const onOpenAddContractor = useAddContractorModal(state => state.onOpen);
    const onOpenStartupModal = useAddStartupModal(state=> state.onOpen);
    const onOpenAddMaterialMOdal = useAddMaterial(state => state.onOpen);
    const onOpenAddProjectModal = useAddProjectModal(state => state.onOpen)
    
  const options = [
    {
        title: "Add Startup Cost",
        action: onOpenStartupModal
    },
    {
        title: "Add Management Cost",
        action: onOpenAddStakeHolder
    },
    {
        title: "Add stakeholder",
        action: onOpenAddStakeHolder
    },
    {
        title: "Add Worker",
        action: onOpenAddStakeHolder
    },
    {
        title: "Add Material",
        action: onOpenAddMaterialMOdal
    },
    {
        title: "View Apartment",
        action: onOpenAddStakeHolder
    },
    {
        title: "View Tenant",
        action: onOpenAddStakeHolder
    },
    {
        title: "View Images",
        action: onOpenAddStakeHolder
    },
    {
        title: "Add Contractor",
        action: onOpenAddContractor
    }
]

  return (
    <>
        <GoBack />
        <PageHead headText='High Cost Tower Renovation' subText='Date Added, 6th July' buttonText='Edit Project' buttonAction={onOpenAddProjectModal}/>

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
                                <div key={i} className='flex items-center justify-center flex-col cursor-pointer' onClick={item.action}>
                                    <StartUpIcon />
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

export default SingleProject