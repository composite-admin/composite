"use client";
import GoBack from '@/components/shared/GoBack'
import { useSuccessModal } from '@/store/inventory/UseInventoryModal';
import React, { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from 'react-hook-form';
import useStakeholderActionsStore from "@/store/actions/stakeholdersActions"
import { getStakeholderById } from '@/api/stakeholdersRequests';

const EditSingleStakeholder = () => {
    const router = useRouter();
    const onOpen = useSuccessModal(state => state.onOpen)

    const params = useParams<{ id: string }>()

    const updateStakeholder = useStakeholderActionsStore<any>((state) => state.updateStakeholder)

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data: any) => {
        console.log(data)
        delete data.id;
        onOpen();
        updateStakeholder(Number(params.id), data);
        router.back()
        return;
    };

    useEffect(() => {
        const fetchStakeholder = async () => {
            try {
                const response = await getStakeholderById(Number(params.id));
                reset(response.data);
            } catch (error) {
                console.error('Error fetching stakeholder data:', error);
            }
        };

        fetchStakeholder();
    }, [params.id]);

    return (
        <>
            <GoBack />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-[80%] mx-auto my-10 rounded-lg border border-outline bg-white p-[29px]">
                    <div className="flex gap-2 flex-col border-b border-b-gray-200 py-3">

                        <h2 className="text-[#101928] font-[600] text-[22px]">Edit Stakeholder</h2>
                        <p>Update Stakeholder Details here.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-5 my-5 edit">
                        <div className="flex flex-col">
                            <p className="value">
                                Stakeholder Name
                            </p>

                            <input type="text" {...register('stakeholder_name', { required: true })} />
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                Address
                            </p>

                            <input type="text" {...register('stakeholder_address', { required: true })} />
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                Stakeholder Phone
                            </p>

                            <input type="text" {...register('stakeholder_ofc_phone', { required: true })} />
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                Contact Person
                            </p>

                            <input type="text" {...register('contact_person', { required: true })} />
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                Contact Home Phone
                            </p>

                            <input type="text" {...register('contact_home_phone', { required: true })} />
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                Contact Mobile
                            </p>

                            <input type="text" {...register('contact_mobile', { required: true })} />
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                Non Government Agency
                            </p>

                            <input type="text" {...register('non_government_agencies', { required: true })} />
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                Government Agency
                            </p>

                            <input type="text" {...register('government_agencies', { required: true })} />
                        </div>

                        <div className="flex flex-col col-span-2">
                            <div className="value">
                                Comment
                            </div>

                            <textarea {...register('comment', { required: true })}/>
                        </div>

                        <button className="bg-[#EBEBEB] text-textColor rounded-md" onClick={() => router.back()} >Cancel</button>
                        <button className="bg-primaryLight text-white  p-3 rounded-md" onClick={onOpen} >Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditSingleStakeholder