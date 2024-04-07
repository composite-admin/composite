"use client"
import ManageStaffModalIcon from '@/components/icons/ManageStaffModalIcon';
import { Modal } from '@/components/shared/Modal'
import { Button } from '@/components/ui/button';
import { useSuccessModal } from '@/store/inventory/UseInventoryModal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { HiX } from 'react-icons/hi'

const ProjectSuccessModal = () => {
  const isOpen = useSuccessModal((state) => state.isOpen);
  const onClose = useSuccessModal((state) => state.onClose);
  const router = useRouter()

  return (
    <Modal
      title="Successful"
      isOpen={isOpen}
      onClose={() => { onClose(); router.back() }}
      classname="max-w-md"
    >
      <div className='space-y-7'>
        <div className='flex flex-col items-center'>
          <ManageStaffModalIcon />
        </div>
        <div className='text-center'>
          <h2>Changes made successfully</h2>
          <p>
            The you have successfully edit the inventory and the new information
            has be effected
          </p>
        </div>
        <div>
          <Button className='w-full' onClick={() => { onClose(); router.back() }}>Done</Button>
        </div>
      </div>
    </Modal>
  )
}

export default ProjectSuccessModal