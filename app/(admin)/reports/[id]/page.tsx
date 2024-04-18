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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };
  let id = props.params.id;

  const { eachReportAction, isError, isSuccess, error } =
    useFetchEachReportData();

  const { singleReportData } = useGetEachReport();

  useEffect(() => {
    eachReportAction(id);
  }, []);

  const [data, setData] = useState<any>({});

  useEffect(() => {
    setData(singleReportData);
    console.log(data);
  }, [singleReportData]);

  return (
    <>
      <GoBack />

      {data && (
        <ViewDetails
          keys={keys}
          title="Report Details"
          dateSubmitted="6th July, 2023"
          editAction={() => router.push(`/reports/${id}/edit`)}
          data={data}
        >
          <div className="grid grid-cols-[1fr_3fr] my-10">
            <div className="flex gap-3 flex-col">
              <div className="">
                <h2 className="text-textColor2 text-[16px] font-[600]">
                  Report Images
                </h2>
                <p className="text-sm text-textColor">
                  See all report images here
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {data?.photograph_id?.map((image: any, index: number) => (
                <div key={index} onClick={() => handleImageClick(index)}>
                  <Image
                    unoptimized
                    width={0}
                    height={0}
                    src={image}
                    alt=""
                    className="w-[162px] h-[112px] object-cover cursor-pointer"
                  />
                </div>
              ))}

              {selectedImageIndex !== null && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50 p-5">
                  <button
                    onClick={handleCloseModal}
                    className=" text-white text-4xl focus:outline-none top-5 right-5 absolute"
                  >
                    &times;
                  </button>
                  <div className="relative  max-w-3xl w-full min-h-[30rem] aspect-square  ">
                    <Image
                      fill
                      src={data?.photograph_id[selectedImageIndex]}
                      alt=""
                      className="max-w-full max-h-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </ViewDetails>
      )}
    </>
  );
}

export default SingleReport