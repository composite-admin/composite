"use client";
import { Modal } from '@/components/shared/Modal'
import { useAddContractorModal, useSuccessModal } from '@/store/inventory/UseInventoryModal';

import React from 'react'
import { HiHome } from 'react-icons/hi2'

const AddContractorModal = () => {
  const isOpen = useAddContractorModal((state) => state.isOpen);
  const onClose = useAddContractorModal((state) => state.onClose);
  const onOpenSucess = useSuccessModal(state => state.onOpen)

  return (
    <Modal
      title={<div className="flex items-center justify-between cursor-pointer">
        <div className='flex gap-2 items-center'>
          <div className='p-2 rounded-full bg-[#52a7f226] w-[50px] h-[50px] flex items-center justify-center'>
            <HiHome />
          </div>
          <p className='text-[22px] font-[600] text-[#101928]'>Add Contractor to Project</p>
        </div>

      </div>}
      description={""}
      isOpen={isOpen}
      onClose={onClose}
      classname=" rounded-lg border border-outline bg-white p-[20px] w-3/6 focus max-h-[90vh] overflow-auto"
    >

      <div className='space-y-7' >
        <div className="grid grid-cols-2 gap-2 edit">
          <div className="flex flex-col col-span-2">
            <p className="value">
              Project Name
            </p>

            <input type="text" placeholder='Enter name' />
          </div>

          <div className="flex flex-col col-span-2">
            <p className="value">
              Contractor
            </p>

            <input type="text" placeholder='' />
          </div>

          <div className="flex flex-col col-span-2">
            <p className="value">
              Amount
            </p>

            <input type="text" placeholder='' />
          </div>

          <div className="flex flex-col col-span-2">
            <div className="value">
              Comment
            </div>

            <textarea />
          </div>

          <button className="bg-[#EBEBEB] text-textColor rounded-md" onClick={onClose}>Cancel</button>
          <button className="bg-primaryLight text-white  p-3 rounded-md" onClick={onOpenSucess}>Submit</button>
        </div>


      </div>

    </Modal>
  )
}

export default AddContractorModal