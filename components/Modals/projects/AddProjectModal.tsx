"use client"
import { Modal } from '@/components/shared/Modal'
import { useAddProjectModal, useSuccessModal } from '@/store/inventory/UseInventoryModal';
import React from 'react'
import { HiHome } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';
import useProjectActionsStore from "@/store/actions/projectActions"

const AddProjectModal = () => {
    const isOpen = useAddProjectModal((state) => state.isOpen);
    const onClose = useAddProjectModal((state) => state.onClose);

    const isSucessOpen = useSuccessModal(state => state.onOpen)

    const { register, handleSubmit, reset } = useForm();

    const createProject = useProjectActionsStore<any>((state) => state.createProject)

    const onSubmit = (data: any) => {
        // Pass the form data to your submitForm action
        console.log(data)

        createProject(data);
        isSucessOpen()
        reset()
        return;
    };

    return (
        <Modal
            title={<div className="flex items-center justify-between cursor-pointer"
            >
                <div className='flex gap-2 items-center'>
                    <div className='p-2 rounded-full bg-[#52a7f226] w-[50px] h-[50px] flex items-center justify-center'>
                        <HiHome />
                    </div>
                    <p className='text-[22px] font-[600] text-[#101928]'>Add Project</p>
                </div>

            </div>}
            description={""}
            isOpen={isOpen}
            onClose={onClose}
            classname=" rounded-lg border border-outline bg-white p-[20px] w-3/6 focus max-h-[90vh] overflow-auto"
        >
            <div >
                <form onSubmit={handleSubmit(onSubmit)}>


                    <div className="grid grid-cols-2 gap-2 my-5 edit">
                        <div className="flex flex-col col-span-2">
                            <p className="value">
                                Project Name
                            </p>

                            <input type="text" placeholder='Enter name' {...register('project_name', { required: true })} />
                        </div>
                        <div className="flex flex-col col-span-2">
                            <p className="value">
                                Project Description
                            </p>

                            <input type="text" placeholder='Enter name' {...register('project_description', { required: true })} />
                        </div>
                        <div className="flex flex-col col-span-2">
                            <p className="value">
                                Project Location
                            </p>

                            <input type="text" placeholder='Enter name' {...register('project_location', { required: true })} />
                        </div>
                        <div className="flex flex-col">
                            <p className="value">
                                Start Date
                            </p>

                            <input type="date" placeholder='' {...register('start_date', { required: true })}/>
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                End Date
                            </p>

                            <input type="date" placeholder='' {...register('end_date', { required: true })}/>
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                Address
                            </p>

                            <input type="text" {...register('address', { required: true })}/>
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                State
                            </p>

                            <input type="text" {...register('state', { required: true })}/>
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                City
                            </p>

                            <input type="text" {...register('city', { required: true })}/>
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                LGA
                            </p>

                            <input type="text" {...register('lga', { required: true })}/>
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                Team Member
                            </p>

                            <input type="text" {...register('team_member', { required: true })}/>
                        </div>

                        <div className="flex flex-col">
                            <p className="value">
                                Role
                            </p>

                            <input type="text" {...register('role', { required: true })}/>
                        </div>

                        <div className="flex flex-col col-span-2">
                            <div className="value">
                                Description
                            </div>

                            <textarea {...register('comment', { required: true })}/>
                        </div>

                        <button className="bg-[#EBEBEB] text-textColor rounded-md" onClick={() => onClose()}>Cancel</button>
                        <button className="bg-primaryLight text-white  p-5 rounded-md" type="submit">Submit</button>
                    </div>
                </form>

            </div>


        </Modal>
    )
}

export default AddProjectModal