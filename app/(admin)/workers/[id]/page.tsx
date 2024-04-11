"use client"
import GoBack from '@/components/shared/GoBack'
import ViewDetails from '@/components/shared/ViewDetails'
import keys from '../../inventory/keys'
import { AvatarComponent } from '@/components/shared/AvatarComponent'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/shared/DataTable'
import { columns } from '../columns'
import React, { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import useWorkersActionsStore from "@/store/actions/workersActions"
import PageHead from '@/components/ui/pageHead'

const SingleWorker = () => {
    const router = useRouter()
    const params = useParams<{ id: string }>()

    const selectedItem = useWorkersActionsStore<any>((state) => state.selectedItem)
    const getWorkerById = useWorkersActionsStore<any>((state) => state.getWorkerById)
    const workers = useWorkersActionsStore<any>((state: any) => state.items);
    const getAllWorkers = useWorkersActionsStore<any>((state: any) => state.getAllWorkers);

    useEffect(() => {
        getAllWorkers();
    }, [getAllWorkers]);

    useEffect(() => {

        if (params.id) {
            getWorkerById(params.id);
        }
    }, [getWorkerById, params.id]);
    return (
        <>
            <GoBack />

            <div>
                <PageHead headText={selectedItem && selectedItem.worker_name} subText={selectedItem && selectedItem.worker_code} buttonText='Edit Worker' buttonAction={() => selectedItem && router.push(`/workers/${selectedItem.id}/edit`)}/>

                <div className='gap-5 my-10'>

                    <div className='col-span-2 bg-white rounded-lg border-[#D0D5DD] '>
                        <div className='p-5 border-b border-b-gray-300'>
                            <h1 className='text-[#101928] text-[18px] font-[600]'>Worker Details</h1>
                        </div>

                        <div className="grid grid-cols-4 p-5 gap-5">
                            <div>
                                <p className='text-[#475367] text-sm'>Name:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.worker_name}</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Company:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.worker_company}</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Address:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.worker_address}</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Phone:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.worker_ofc_phone}</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Service Type:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.service_type}</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Section:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.section}</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Service:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.worker_service}</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Email:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.worker_email}</p>
                            </div>




                            {/* <div>
                                <p className='text-[#475367] text-sm'>Bank Name:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.bank_name}</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Account Name:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.account_name}</p>
                            </div>

                            <div>
                                <p className='text-[#475367] text-sm'>Account Number:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.account_number}</p>
                            </div> */}

                            <div>
                                <p className='text-[#475367] text-sm'>Comment:</p>
                                <p className='text-[#101928] text-[16px] font-[600]'>{selectedItem && selectedItem.comment}</p>
                            </div>
                        </div>
                    </div>

                </div>

                <DataTable columns={columns} data={workers.data ? workers.data : []} clickAction={() => { }} />
            </div>
        </>
    )
}

export default SingleWorker