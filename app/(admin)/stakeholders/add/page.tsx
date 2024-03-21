import GoBack from '@/components/shared/GoBack'
import React from 'react'

const AddStakeholder = () => {
    return (
        <>
            <GoBack />

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

                        <input type="text" />
                    </div>

                    <div className="flex flex-col">
                        <p className="value">
                            Address
                        </p>

                        <input type="text" />
                    </div>

                    <div className="flex flex-col">
                        <p className="value">
                            Stakeholder Phone
                        </p>

                        <input type="text" />
                    </div>

                    <div className="flex flex-col">
                        <p className="value">
                            Contact Person
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
                            Non Government Agency
                        </p>

                        <input type="text" />
                    </div>

                    <div className="flex flex-col">
                        <p className="value">
                            Government Agency
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
        </>
    )
}

export default AddStakeholder