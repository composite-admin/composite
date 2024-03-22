"use client"
import { Modal } from '@/components/shared/Modal'
import { useSuccessModal } from '@/store/inventory/UseInventoryModal';
import Image from 'next/image';
import React from 'react'
import { HiX } from 'react-icons/hi'

const ProjectSuccessModal = () => {
    const isOpen = useSuccessModal((state) => state.isOpen);
    const onClose = useSuccessModal((state) => state.onClose);

    return (
        <Modal
            title={<p> Success </p>}
            description=""
            isOpen={isOpen}
            onClose={onClose}
            classname="focus rounded-2xl w-3/12"
        >
            <div>
                <div className="flex flex-col items-center justify-center text-center">
                    <Image width={30} height={30} unoptimized src="/./success.png" alt="" className="w-[20%] h-auto object-cover m-auto" />

                    <div className="p-5">
                        <h2 className="text-[18px] font-[600] text-[#1D2739]">Changes made successfully</h2>
                        <p className="text-[#667185]">The you have successfully edit the inventory and the new information has be effected</p>

                        <button className="bg-primaryLight p-3 text-white rounded-md w-full" onClick={onClose}>Done</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ProjectSuccessModal