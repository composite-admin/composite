"use client"
import GoBack from '@/components/shared/GoBack';
import useFetchEachInventoryData from '@/mutations/EachInventoryMutation';
import useUpdateEachInventoryData from '@/mutations/UpdateInventoryMutation';
import { useGetEachinventory } from '@/store/inventory/InventoryStore';
import { useSuccessModal } from '@/store/inventory/UseInventoryModal';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { HiBellAlert } from 'react-icons/hi2';

const UpdateInventory = (props: any) => {
    const onOpen = useSuccessModal((state) => state.onOpen);
    const router = useRouter();

    let id: any = props.params.id;

    const { action, isError, error } = useFetchEachInventoryData();
    const { update, isSuccess} = useUpdateEachInventoryData()

    const { singleInventoryData } = useGetEachinventory();

    useEffect(() => {
        action(id);
    }, []);

    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        setFormData(singleInventoryData);
        console.log(singleInventoryData)
    }, [singleInventoryData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // Handle form submission here
        update(formData)
    };

    useEffect(()=>{
        console.log(isSuccess)
        if(isSuccess){
            onOpen()
        }
    }, [isSuccess])

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

                        <input type="text" name="name" value={formData?.name} onChange={handleInputChange} />
                    </div>

                    <div className="flex flex-col">
                        <p className="value">
                            Type
                        </p>

                        <input type="text" name="type" value={formData?.type} onChange={handleInputChange} />
                    </div>

                    <div className="flex flex-col">
                        <p className="value">
                            Quantity
                        </p>

                        <input type="number" name="quantity" value={formData?.quantity} onChange={handleInputChange} />
                    </div>

                    <div className="flex flex-col">
                        <p className="value">
                            Unit Price
                        </p>

                        <input type="number" name="unit_price" value={formData?.unit_price} onChange={handleInputChange} />
                    </div>

                    <div className="flex flex-col col-span-2">
                        <div className="value">
                            Comment
                        </div>

                        <textarea name="comment" value={formData?.comment} onChange={handleInputChange} />
                    </div>

                    <button className="bg-[#EBEBEB] text-textColor rounded-md" onClick={() => router.back()} >Cancel</button>
                    <button className="bg-primaryLight text-white  p-3 rounded-md" onClick={handleSubmit} >Submit</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateInventory;
