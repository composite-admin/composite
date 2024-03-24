import { Modal } from '@/components/shared/Modal'
import { useAddWorkerModal, useSuccessModal } from '@/store/inventory/UseInventoryModal'
import React from 'react'
import { HiHome } from 'react-icons/hi'

const AddWorkerModal = () => {
    const isOpen = useAddWorkerModal(state => state.isOpen);
    const onClose = useAddWorkerModal(state=> state.onClose);
    const isSucessOpen = useSuccessModal(state => state.onOpen)

  return (
    <Modal
      title={<div className="flex items-center justify-between cursor-pointer">
        <div className='flex gap-2 items-center'>
          <div className='p-2 rounded-full bg-[#52a7f226] w-[50px] h-[50px] flex items-center justify-center'>
            <HiHome />
          </div>
          <div>
          <p className='text-[22px] font-[600] text-[#101928]'>New Worker</p>
          <p className='font-[400]'>update worker details</p>
          </div>
        </div>
      </div>}
      description={""}
      isOpen={isOpen}
      onClose={onClose}
      classname=" rounded-lg border border-outline bg-white p-[20px] py-10 w-3/6 focus max-h-[90vh] overflow-auto"
    >

        <div className='p-5'>
            <div className="grid grid-cols-2 gap-3 edit">
                <div>
                    <p>Worker's Full name</p>
                    <input type="text" />
                </div>

                <div>
                    <p>Company</p>
                    <input type="text" />
                </div>

                <div>
                    <p>Address</p>
                    <input type="text" />
                </div>

                <div>
                    <p>Email</p>
                    <input type="text" />
                </div>

                <div>
                    <p>Mobile</p>
                    <input type="text" />
                </div>

                <div>
                    <p>Home Phone</p>
                    <input type="text" />
                </div>

                <div>
                    <p>Home Phone</p>
                    <input type="text" />
                </div>

                <div>
                    <p>Office Phone</p>
                    <input type="text" />
                </div>

                <div>
                    <p>Service Type</p>
                    <input type="text" />
                </div>

                <div>
                    <p>Service Summary</p>
                    <input type="text" />
                </div>

                <div className='col-span-2'>
                    <p>Select Bank</p>
                    <select name="" id="">
                        <option value="Select Bank">Select Bank</option>
                    </select>
                </div>

                <div className='col-span-2'>
                    <p>Account no</p>
                    <input type='text' />
                </div>
                
                <div className='col-span-2'>
                    <p>Account name</p>
                    <input type='text' />
                </div>
                
                <div className='col-span-2'>
                    <p>Comment</p>
                    <input type='text' />
                </div>
                
                <button className="bg-[#EBEBEB] text-textColor rounded-md" onClick={()=> onClose()}>Cancel</button>
                    <button className="bg-primaryLight text-white  p-5 rounded-md" onClick={()=> isSucessOpen()}>Submit</button>
            </div>
        </div>


    </Modal>
  )
}

export default AddWorkerModal