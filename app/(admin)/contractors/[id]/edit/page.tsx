"use client"
import GoBack from '@/components/shared/GoBack'
import { useSuccessModal } from '@/store/inventory/UseInventoryModal'
import React, { useEffect } from 'react'
import { HiBellAlert } from 'react-icons/hi2'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from 'react-hook-form';
import useContractorsActionsStore from "@/store/actions/contractorsActions"

const SingleContractorEdit = () => {
    const router = useRouter();
    const onOpen = useSuccessModal(state => state.onOpen);

    const params = useParams<{ id: string }>()



    const selectedItem = useContractorsActionsStore<any>((state) => state.selectedItem)
    const getContractorById = useContractorsActionsStore<any>((state) => state.getContractorById)
    const updateContractor = useContractorsActionsStore<any>((state) => state.updateContractor)

    const { register, handleSubmit, reset } = useForm();

    console.log("SI", selectedItem)
    const onSubmit = (data: any) => {
        // Pass the form data to your submitForm action
        console.log(data)
        delete data.id;
        
        updateContractor(selectedItem.id, data);
        reset()
        return;
    };

    useEffect(() => {

        if (params.id) {
            getContractorById(params.id);
        }
        selectedItem && reset(selectedItem)
    }, [getContractorById, params.id, reset]);

    return (
        <>
            <GoBack />


            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="w-[80%] mx-auto my-10 rounded-lg border border-outline bg-white p-[29px]">
                    <div className="flex gap-2 flex-col border-b border-b-gray-200 py-3">

                        <h2 className="text-[#101928] font-[600] text-[22px]">Add Contractor</h2>
                        <p>Update Contractor Details here.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-5 my-5 edit">
                        <div className="flex flex-col">
                            <p className="value">
                                Contractor Name
                            </p>

                            <input type="text" {...register('contractor_name', { required: true })} />
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                Address
                            </p>

                            <input type="text" {...register('contractor_address', { required: true })} />
                        </div>

                        <div className="flex flex-col col-span-2">
                            <p className="value">
                                Service
                            </p>

                            <input type="text" {...register('contractor_service', { required: true })} />
                        </div>



                        <div className="flex flex-col">
                            <p className="value">
                                Contractor Phone
                            </p>

                            <input type="text" {...register('contractor_ofc_phone', { required: true })} />
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                Contact Home Phone
                            </p>

                            <input type="text" {...register('contact_home_phone', { required: true })} />
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                Contact Person
                            </p>

                            <input type="text" {...register('contact_person', { required: true })} />
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                Contact Mobile
                            </p>

                            <input type="text"  {...register('contact_mobile', { required: true })} />
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                Email
                            </p>

                            <input type="email" {...register('email', { required: true })} />
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                Website
                            </p>

                            <input type="text" {...register('website', { required: true })} />
                        </div>

                        <div className="flex flex-col col-span-2">
                            <div className="value">
                                Comment
                            </div>

                            <textarea {...register('comment', { required: true })} />
                        </div>

                        <button className="bg-[#EBEBEB] text-textColor rounded-md" onClick={() => router.back()}>Cancel</button>
                        <button className="bg-primaryLight text-white  p-3 rounded-md" type='submit'>Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SingleContractorEdit