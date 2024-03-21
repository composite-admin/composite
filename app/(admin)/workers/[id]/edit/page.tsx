import { AvatarComponent } from '@/components/shared/AvatarComponent'
import GoBack from '@/components/shared/GoBack'
import React from 'react'
import {HiPhotograph} from "react-icons/hi"

const SingleWorker = () => {
    return (
        <>
            <GoBack />

            <div className="w-[80%] mx-auto my-10 rounded-lg border border-outline bg-white p-[29px]">
                <h2 className='text-[24px] font-[600]'>Edit worker</h2>
                <p className='text-gray-400'>Update worker details here.</p>

                <div className="grid grid-cols-2 gap-5 my-5 edit">
                    <div>
                        <h3 className='text-[20px]'>Photograph</h3>
                        <p className='text-gray-400'>This image will be used to recognize the supplier</p>
                        <div className='text-primaryLight border-2 border-primaryLight rounded-md p-2 gap-1 cursor-pointer flex items-center w-fit text-[12px]'>
                            <HiPhotograph />
                            <span>Upload Photo</span>
                        </div>
                    </div>

                    <AvatarComponent />

                    <div>
                        <label className='value' htmlFor="">Worker's Full Name</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label className='value' htmlFor="">Company</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label className='value' htmlFor="">Address</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label className='value' htmlFor="">Email</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label className='value' htmlFor="">Mobile</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label className='value' htmlFor="">Home Phone</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label className='value' htmlFor="">Home Phone</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label className='value' htmlFor="">Office Phone</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label className='value' htmlFor="">Service Type</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label className='value' htmlFor="">Service</label>
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

export default SingleWorker