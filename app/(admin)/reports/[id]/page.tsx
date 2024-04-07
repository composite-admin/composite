"use client"
import GoBack from '@/components/shared/GoBack'
import ViewDetails from '@/components/shared/ViewDetails'
import React, { useEffect, useState } from 'react'
import keys from './keys'
import { useRouter } from "next/navigation";
import Image from 'next/image'
import useFetchReportData from '@/mutations/ReportMutation'
import useFetchEachReportData from '@/mutations/EachReportMutation'
import { useGetEachReport } from '@/store/report/ReportStore'

const SingleReport = (props: any) => {
  const router = useRouter();
  let id = props.params.id;

  const { eachReportAction, isError, isSuccess, error } = useFetchEachReportData();

  const { singleReportData } = useGetEachReport();


  useEffect(() => {
    eachReportAction(id);
  }, [])

  const [data, setData] = useState<any>({});

  useEffect(()=> {
    setData(singleReportData)
    console.log(singleReportData)
  }, [singleReportData])


  return (
    <>
      <GoBack />

     {
      data &&
      <ViewDetails keys={keys} title='Report Details' dateSubmitted='6th July, 2023' editAction={() => router.push(`/reports/${id}/edit`)} data={data}>
      <div className="grid grid-cols-[1fr_3fr] my-10">
        <div className="flex gap-3 flex-col">
          <div className="">
            <h2 className="text-textColor2 text-[16px] font-[600]">Report Images</h2>
            <p className="text-sm text-textColor">See all report images here</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Image unoptimized width={0} height={0} src="/./young-black-race-man-with-blueprint-stading-near-glass-building 1.png" alt="" className="w-[162px] h-[112px] object-cover" />

          <Image unoptimized width={0} height={0} src="/./young-black-race-man-with-blueprint-stading-near-glass-building 1.png" alt="" className="w-[162px] h-[112px] object-cover" />

          <Image unoptimized width={0} height={0} src="/./young-black-race-man-with-blueprint-stading-near-glass-building 1.png" alt="" className="w-[162px] h-[112px] object-cover" />
        </div>
      </div>
    </ViewDetails>
     }
    </>
  )
}

export default SingleReport