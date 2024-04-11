"use client";
import GoBack from '@/components/shared/GoBack'
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { useAddWorkerModal, useSuccessModal } from '@/store/inventory/UseInventoryModal';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'
import { HiHome } from 'react-icons/hi';

const AddWorkerToProject = () => {
    const router = useRouter();
    // const searchParams = useSearchParams()

    // const name = searchParams.get('name')
    const onOpenSucess = useSuccessModal(state => state.onOpen);
    const onOpenCreateWorker = useAddWorkerModal(state => state.onOpen)
    return (
        <>
            <div className='flex items-center justify-between'>
                <GoBack />

                <Button onClick={onOpenCreateWorker}>Create New Worker</Button>
            </div>

            <div className='w-3/5 m-auto mt-10'>
                <div className="edit flex flex-col gap-5  bg-white p-5 rounded-lg m-auto">
                    <div className="flex items-center justify-between cursor-pointer">
                        <div className='flex gap-2 items-center'>
                            <div className='p-2 rounded-full bg-[#52a7f226] w-[50px] h-[50px] flex items-center justify-center'>
                                <HiHome />
                            </div>
                            <p className='text-[22px] font-[600] text-[#101928]'>Add Worker to Project</p>
                        </div>

                    </div>
                    <div className="flex flex-col col-span-2">
                        <p className="value">
                            Project Name
                        </p>
                        {/* <Suspense fallback={<p>...</p>}>
                            <input type="text" placeholder='Enter name' value={name || ""} disabled />
                        </Suspense> */}

                        
                            <input type="text" placeholder='Enter name' value="" disabled />
                        
                    </div>

                    <div className="flex flex-col col-span-2">
                        <p className="value">
                            Service Type
                        </p>

                        <input type="text" placeholder='' />
                    </div>

                    <div className="flex flex-col col-span-2">
                        <p className="value">
                            Worker
                        </p>

                        <select name="" id="">
                            <option value="">Select Worker</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full">
                        <button className="bg-[#EBEBEB] text-textColor rounded-md" onClick={() => router.back()}>Cancel</button>
                        <button className="bg-primaryLight text-white  p-3 rounded-md" onClick={onOpenSucess}>Submit</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddWorkerToProject