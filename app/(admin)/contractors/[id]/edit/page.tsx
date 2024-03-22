"use client"
import GoBack from '@/components/shared/GoBack'
import { useSuccessModal } from '@/store/inventory/UseInventoryModal'
import { useRouter } from 'next/navigation'
import React from 'react'
import { HiBellAlert } from 'react-icons/hi2'

const SingleContractorEdit = () => {
    const router = useRouter();
    const onOpen = useSuccessModal(state => state.onOpen);
  return (
    <>
    <GoBack />


    <div className="w-[80%] mx-auto my-10 rounded-lg border border-outline bg-white p-[29px]">
            <div className="flex gap-2 flex-col border-b border-b-gray-200 py-3">

                <h2 className="text-[#101928] font-[600] text-[22px]">Edit Contractor</h2>
                <p>Update Contractor Details here.</p>
            </div>

            <div className="grid grid-cols-2 gap-5 my-5 edit">
                <div className="flex flex-col">
                    <p className="value">
                        Contractor Name
                    </p>

                    <input type="text" />
                </div>

                <div className="flex flex-col">
                    <p className="value">
                        Address
                    </p>

                    <input type="text" />
                </div>

                <div className="flex flex-col col-span-2">
                    <p className="value">
                        Service
                    </p>

                    <input type="text" />
                </div>

                

                <div className="flex flex-col">
                    <p className="value">
                        Contractor Phone
                    </p>

                    <input type="text" />
                </div>

                <div className="flex flex-col">
                    <p className="value">
                        Contact Phone
                    </p>

                    <input type="text" />
                </div>

                <div className="flex flex-col">
                    <p className="value">
                        Contact Office Phone
                    </p>

                    <input type="text" />
                </div>

                <div className="flex flex-col">
                    <p className="value">
                        Contact Mobile
                    </p>

                    <input type="text" />
                </div>

                <div className="flex flex-col">
                    <p className="value">
                        Email
                    </p>

                    <input type="text" />
                </div>

                <div className="flex flex-col">
                    <p className="value">
                        Website
                    </p>

                    <input type="text" />
                </div>

                <div className="flex flex-col col-span-2">
                    <div className="value">
                        Comment
                    </div>

                    <textarea />
                </div>

                <button className="bg-[#EBEBEB] text-textColor rounded-md" onClick={()=> router.back()} >Cancel</button>
                        <button className="bg-primaryLight text-white  p-3 rounded-md" onClick={onOpen}>Submit</button>
            </div>
        </div>
</>
  )
}

export default SingleContractorEdit