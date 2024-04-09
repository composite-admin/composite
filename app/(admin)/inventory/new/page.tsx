"use client"
import GoBack from '@/components/shared/GoBack';
import useNewInventoryData from '@/mutations/NewInventoryMutation';
import { useSuccessModal } from '@/store/inventory/UseInventoryModal';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { HiBellAlert } from 'react-icons/hi2';

const NewInventory = () => {
    const onOpen = useSuccessModal((state) => state.onOpen);
    const {create, isSuccess} = useNewInventoryData()
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        type: '',
        quantity: '',
        unit_price: '',
        comment: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // Handle form submission here
        console.log(formData);
        create(formData);
         // Example usage of opening success modal
    };

    useEffect(()=>{
        if(isSuccess){
            onOpen();
        }
    }, [isSuccess])

    return (
        <div>
            <GoBack />

            <div className="w-[80%] mx-auto my-10 rounded-lg border border-outline bg-white p-[29px]">
                <div className="flex gap-2 items-center border-b border-b-gray-200 py-3">
                    <HiBellAlert />

                    <h2 className="text-[#101928] font-[600] text-[22px]">New Inventory</h2>
                </div>

                <div className="grid grid-cols-2 gap-5 my-5 edit">
                    <div className="flex flex-col">
                        <p className="value">
                            Description
                        </p>

                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                    </div>

                    <div className="flex flex-col">
                        <p className="value">
                            Type
                        </p>

                        {/* <input type="text" name="type"  /> */}
                        <select name="type" id="" onChange={handleInputChange} value={formData.type} >
                            <option value="Tools">Tools</option>
                            <option value="Machines">Machines</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <p className="value">
                            Quantity
                        </p>

                        <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} />
                    </div>

                    <div className="flex flex-col">
                        <p className="value">
                            Unit Price
                        </p>

                        <input type="number" name="unit_price" value={formData.unit_price} onChange={handleInputChange} />
                    </div>

                    <div className="flex flex-col col-span-2">
                        <div className="value">
                            Comment
                        </div>

                        <textarea name="comment" value={formData.comment} onChange={handleInputChange} />
                    </div>

                    <button className="bg-[#EBEBEB] text-textColor rounded-md" onClick={() => router.back()} >Cancel</button>
                    <button className="bg-primaryLight text-white  p-3 rounded-md" onClick={handleSubmit} >Submit</button>
                </div>
            </div>
        </div>
    )
}

export default NewInventory;
