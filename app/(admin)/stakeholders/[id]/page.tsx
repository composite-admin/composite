"use client"
import { DataTable } from '@/components/shared/DataTable'
import GoBack from '@/components/shared/GoBack'
import PageHead from '@/components/ui/pageHead'
import React, { useEffect } from 'react'
import { columns } from './columns'
import { useRouter, useParams } from 'next/navigation'
import useStakeholdersActionsStore from "@/store/actions/stakeholdersActions"

const SingleStakeholder = () => {
    const router = useRouter()
    const params = useParams<{ id: string }>()

    const selectedItem = useStakeholdersActionsStore<any>((state) => state.selectedItem)
    const getStakeholderById = useStakeholdersActionsStore<any>((state) => state.getStakeholderById)
    const stakeholders = useStakeholdersActionsStore<any>((state: any) => state.items);
    const getAllStakeholders = useStakeholdersActionsStore<any>((state: any) => state.getAllStakeholders);

    useEffect(() => {
        getAllStakeholders();
    }, [getAllStakeholders]);

    useEffect(() => {

        if (params.id) {
            getStakeholderById(params.id);
        }
    }, [getStakeholderById, params.id]);

    return (
        <>
            <GoBack />

            <div>
                <PageHead headText={selectedItem && selectedItem.stakeholder_name} subText={selectedItem && selectedItem.stakeholder_code} buttonText='Edit Stakeholder' buttonAction={() => selectedItem && router.push(`/stakeholders/${selectedItem.id}/edit`)} />

                <div className='gap-5 my-10'>

                    <div className='col-span-2 bg-white rounded-lg border-[#D0D5DD] '>
                        <div className='p-5 border-b border-b-gray-300'>
                            <h1 className='text-[#101928] text-[18px] font-[600]'>Stakeholder Details</h1>
                        </div>

                        <div className="grid grid-cols-4 p-5 gap-5">
                            <div>
                                <p className='text-[#475367] text-sm'>Stakeholder Name:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.stakeholder_name}</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Stakeholder Code:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.stakeholder_code}</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Address:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.stakeholder_address}</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Stakeholder Phone:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.stakeholder_ofc_phone}</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Government Agencies:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.government_agencies}</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Non Government Agencies:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.non_government_agencies}</p>
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
                        </div>
                    </div>

                </div>

                <PageHead headText="Projects" subText="View all your stakeholder&apos;s projects here" />
                <DataTable columns={columns} data={[]} clickAction={() => { }} />
            </div>
        </>
    )
}

export default SingleStakeholder