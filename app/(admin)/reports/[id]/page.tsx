"use client"
import GoBack from '@/components/shared/GoBack'
import ViewDetails from '@/components/shared/ViewDetails'
import React from 'react'
import keys from './keys'
import { useRouter } from "next/navigation";

const SingleReportPage = () => {
  const router = useRouter();

  return (
    <>
      <GoBack />

      <ViewDetails keys={keys} title='Report Details' dateSubmitted='6th July, 2023' editAction={()=> router.push("/reports/78/edit")}>
        <div className="grid grid-cols-[1fr_3fr] my-10">
          <div className="flex gap-3 flex-col">
            <div className="">
              <h2 className="text-textColor2 text-[16px] font-[600]">Report Images</h2>
              <p className="text-sm text-textColor">See all report images here</p>
            </div>
          </div>

          <div className="flex gap-2">
            <img src="./young-black-race-man-with-blueprint-stading-near-glass-building 1.png" alt="" className="w-[162px] h-[112px] object-cover" />

            <img src="./young-black-race-man-with-blueprint-stading-near-glass-building 1.png" alt="" className="w-[162px] h-[112px] object-cover" />

            <img src="./young-black-race-man-with-blueprint-stading-near-glass-building 1.png" alt="" className="w-[162px] h-[112px] object-cover" />
          </div>
        </div>
      </ViewDetails>
    </>
  )
}

export default SingleReportPage