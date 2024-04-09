"use client";
import FillNewDetails from '@/components/shared/FillNewDetails'
import GoBack from '@/components/shared/GoBack';
import UploadImages from '@/components/shared/UploadImages'
import React, { useState } from 'react'
import { HiChevronRight } from 'react-icons/hi2';

const NewReportsPage = () => {
    const [index, setIndex] = useState(1)
    const [form, setForm] = useState<any>()
  return (
    <>
        <GoBack />
           <div>
            <div className='w-4/6 m-auto my-10'>

                <div className='flex bg-white justify-between items-center w-full px-10 py-5 rounded-md'>
                    <div className={`cursor-pointer flex gap-3 items-center`}  onClick={()=> setIndex(1)}>
                        <div className={`w-[30px] h-[30px] rounded-full ${index == 1 ? "bg-primaryLight" : "bg-[#959595]"} text-white flex items-center justify-center`}>1</div>
                        <p className={`${index == 1 ? "text-primaryLight" : "text-[#959595]"} font-[600] text-[16px]`}>Fill Report</p>
                    </div>

                    <HiChevronRight />

                    <div className={`cursor-pointer flex gap-3 items-center`} onClick={()=> setIndex(2)}>
                        <div className={`w-[30px] h-[30px] rounded-full ${index == 2 ? "bg-primaryLight" : "bg-[#959595]"} text-white flex items-center justify-center`}>2</div>
                        <p className={`${index == 2 ? "text-primaryLight" : "text-[#959595]"} font-[600] text-[16px]`}>Upload Images</p>
                    </div>
                </div>

                <div className="my-5 rounded-lg border border-outline bg-white p-[29px]">
                    <div className="grid gap-5  pb-10">
                        <div className="flex gap-3 flex-col">
                            <div className="">
                                <h2 className="text-textColor2 text-[22px] font-[600]">New Report</h2>
                                <p className="text-sm text-textColor">Create a new report here.</p>
                            </div>
                        </div>

                        {
                            index == 1 ?
                                <FillNewDetails setState={setIndex} setForm={setForm}/> :
                                <UploadImages form={form} setForm={setForm}/>
                        }
                    </div>
                </div>
            </div>


        </div>
    </>
  )
}

export default NewReportsPage