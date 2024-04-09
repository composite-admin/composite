"use client"
import GoBack from '@/components/shared/GoBack'
import { useSuccessModal } from '@/store/modals/useCreateModal'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form';
import useWorkersActionsStore from "@/store/actions/workersActions"

const AddWorker = () => {
    const onOpen = useSuccessModal(state => state.onOpen)
    const router = useRouter()
    const { register, handleSubmit, reset } = useForm();

    const createWorker = useWorkersActionsStore<any>((state) => state.createWorker)

    const onSubmit = (data: any) => {
        // Pass the form data to your submitForm action
        console.log(data)
        
        createWorker(data);
        onOpen()
        reset()
        return;
      };
    
    return (
        <>
            <GoBack />

            <form onSubmit={handleSubmit(onSubmit)}>

            <div className="w-[80%] mx-auto my-10 rounded-lg border border-outline bg-white p-[29px]">
                <div className="flex gap-2 flex-col border-b border-b-gray-200 py-3">

                    <h2 className="text-[#101928] font-[600] text-[22px]">Add Worker</h2>
                    <p>Update Worker Details here.</p>
                </div>

                <div className="grid grid-cols-2 gap-5 my-5 edit">
                    <div className="flex flex-col">
                        <p className="value">
                            Worker Name
                        </p>

                        <input type="text" {...register('worker_name', { required: true })}/>
                    </div>
                    <div className="flex flex-col">
                        <p className="value">
                            Worker Company
                        </p>

                        <input type="text" {...register('worker_company', { required: true })}/>
                    </div>
                    <div className="flex flex-col">
                        <p className="value">
                            Worker Address
                        </p>

                        <input type="text" {...register('worker_address', { required: true })}/>
                    </div>

                    <div className="flex flex-col ">
                        <p className="value">
                            Service Type
                        </p>

                        <input type="text" {...register('service_type', { required: true })}/>
                    </div>
                    <div className="flex flex-col ">
                        <p className="value">
                            Section
                        </p>

                        <input type="text" {...register('section', { required: true })}/>
                    </div>
                    <div className="flex flex-col ">
                        <p className="value">
                            Worker Source
                        </p>

                        <input type="text" {...register('worker_source', { required: true })}/>
                    </div>

                    <div className="flex flex-col">
                        <p className="value">
                            Worker Office Phone
                        </p>

                        <input type="text" {...register('worker_ofc_phone', { required: true })}/>
                    </div>

                    <div className="flex flex-col">
                        <p className="value">
                        Worker Mobile
                        </p>

                        <input type="text" {...register('worker_mobile', { required: true })}/>
                    </div>

                    <div className="flex flex-col">
                        <p className="value">
                        Worker Home Phone
                        </p>

                        <input type="text" {...register('worker_home_phone', { required: true })}/>
                    </div>

                    <div className="flex flex-col">
                        <p className="value">
                            Worker Service
                        </p>

                        <input type="text"  {...register('worker_service', { required: true })}/>
                    </div>

                    <div className="flex flex-col">
                        <p className="value">
                            Worker Email
                        </p>

                        <input type="email" {...register('worker_email', { required: true })}/>
                    </div>

                    <div className="flex flex-col">
                        <p className="value">
                            Bank Name
                        </p>

                        <input type="text" {...register('bank_name', { required: true })}/>
                    </div><div className="flex flex-col">
                        <p className="value">
                            Account Name
                        </p>

                        <input type="text" {...register('account_name', { required: true })}/>
                    </div><div className="flex flex-col">
                        <p className="value">
                            Account Number
                        </p>

                        <input type="text" {...register('account_number', { required: true })}/>
                    </div>
                    

                    <div className="flex flex-col col-span-2">
                        <div className="value">
                            Comment
                        </div>

                        <textarea {...register('comment', { required: true })}/>
                    </div>

                    <button className="bg-[#EBEBEB] text-textColor rounded-md" onClick={()=> router.back()}>Cancel</button>
                    <button className="bg-primaryLight text-white  p-3 rounded-md" type='submit'>Submit</button>
                </div>
            </div>
            </form>
        </>
    )
}

export default AddWorker