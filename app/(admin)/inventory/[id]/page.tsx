"use client";
import GoBack from '@/components/shared/GoBack'
import ViewDetails from '@/components/shared/ViewDetails';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import keys from '../keys';
import useFetchEachInventoryData from '@/mutations/EachInventoryMutation';
import { useGetEachinventory } from '@/store/inventory/InventoryStore';
import useUpdateEachInventoryData from '@/mutations/UpdateInventoryMutation';

const Page = (props:any) => {
  const router = useRouter();

  let id: any = props.params.id;
  
  const { action } = useFetchEachInventoryData();

  const { singleInventoryData } = useGetEachinventory();


  useEffect(() => {
    action(id);
  }, [action, id]);

  const [data, setData] = useState<any>({});

  useEffect(() => {
    setData(singleInventoryData);
  }, [singleInventoryData]);

  console.log(data);
  

  return (
    <>
      <GoBack />

      <ViewDetails
        title="Inventory Details"
        dateSubmitted="6th July, 2023"
        editAction={() => { router.push(`/inventory/${id}/update`);}}
        keys={keys}
        data = {data}
      />
    </>
  )
}

export default Page