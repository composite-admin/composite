import GoBack from '@/components/shared/GoBack'
import React from 'react'
import { HiBellAlert } from 'react-icons/hi2'

const UpdateInventory = () => {
  return (
    <div>
        <GoBack />

        <div className="w-[80%] mx-auto my-10 rounded-lg border border-outline bg-white p-[29px]">
                <div className="flex gap-2 items-center border-b border-b-gray-200 py-3">
                    <HiBellAlert />

                    <h2 className="text-[#101928] font-[600] text-[22px]">Update Inventory</h2>
                </div>

                <div className="grid grid-cols-2 gap-5 my-5 edit">
                    <div className="flex flex-col">
                        <p className="value">
                            Description
                        </p>

                        <input type="text" />
                    </div>

                    <div className="flex flex-col">
                        <p className="value">
                            Type
                        </p>

                        <input type="text" />
                    </div>

                    <div className="flex flex-col">
                        <p className="value">
                            Quality
                        </p>

                        <input type="text" />
                    </div>

                    <div className="flex flex-col">
                        <p className="value">
                            Unit Price
                        </p>

                        <input type="text" />
                    </div>

                    <div className="flex flex-col col-span-2">
                        <div className="value">
                            Comment
                        </div>

                        <textarea />
                    </div>

                    <button className="bg-[#EBEBEB] text-textColor rounded-md" >Cancel</button>
                            <button className="bg-primaryLight text-white  p-3 rounded-md" >Submit</button>
                </div>
            </div>
    </div>
  )
}

export default UpdateInventory