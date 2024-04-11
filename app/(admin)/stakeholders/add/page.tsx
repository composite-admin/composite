"use client";
import GoBack from '@/components/shared/GoBack'
import { useSuccessModal } from '@/store/inventory/UseInventoryModal'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import useStakeholdersActionsStore from "@/store/actions/stakeholdersActions"

const AddStakeholder = () => {
    const onOpen = useSuccessModal(state => state.onOpen);
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm();

    const createStakeholder = useStakeholdersActionsStore<any>((state) => state.createStakeholder)

    const onSubmit = (data: any) => {
        // Pass the form data to your submitForm action
        console.log(data)

        createStakeholder(data);
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

                        <h2 className="text-[#101928] font-[600] text-[22px]">Add Stakeholder</h2>
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

                            <input type="number" {...register('stakeholder_ofc_phone', { required: true })} />
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
                            <input type="number" {...register('contact_home_phone', { required: true })} />
                        </div>
                        <div className="flex flex-col">
                            <p className="value">
                                Contact Mobile
                            </p>

                            <input type="number" {...register('contact_mobile', { required: true })} />
                        </div>



                        <div className="flex flex-col">
                            <p className="value">
                                Government Agency
                            </p>
                            <select {...register('government_agencies', { required: true })}>
                                <option value="">Select Government Agency Type</option>
                                <option value="LASBCA">LASBCA</option>
                                <option value="LASTMA">LASTMA</option>
                                <option value="Federal Fire Service">Federal Fire Service</option>
                                <option value="Lagos State Fire Service">Lagos State Fire Service</option>
                                <option value="Local Government Office">Local Government Office
                                </option>
                                <option value="Lag Environmental Agencies">Lag Environmental Agencies</option>
                                <option value="Lagos State Material Testing Agency (LSMTA)">Lagos State Material Testing Agency (LSMTA)</option>
                                <option value="New Towns Development Authority (NTDA)">New Towns Development Authority (NTDA)</option>
                                <option value="Town Planning">Town Planning</option>
                                <option value="Others">Others</option>
                            </select>

                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                Non Government Agency
                            </p>
                            <select  {...register('non_government_agencies', { required: true })}>
                                <option value=""> Select Non Government Agency</option>
                                <option value="Omo-onile">Omo-onile</option>
                                <option value="Community Development Association">Community Development Association</option>
                                <option value="OPC">OPC</option>
                                <option value="Community Vigilante Groups" >Community Vigilante Groups</option>
                                <option value="Area Boys">Area Boys</option>
                                <option value="Nigeria Police">Nigeria Police</option>
                            </select>
                        </div>
                        <div className="flex flex-col col-span-2">
                            <div className="value">
                                Comment
                            </div>
                            <textarea {...register('comment', { required: true })} />
                        </div>
                        <button className="bg-[#EBEBEB] text-textColor rounded-md" onClick={() => router.back()} >Cancel</button>
                        <button className="bg-primaryLight text-white  p-3 rounded-md" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddStakeholder