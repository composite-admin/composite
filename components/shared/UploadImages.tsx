"use client";
import { useSuccessModal } from '@/store/inventory/UseInventoryModal';
import { useRouter } from 'next/navigation';
import { HiCloudUpload } from 'react-icons/hi'

const UploadImages = () => {
    const onOpen = useSuccessModal(state => state.onOpen)
    const router = useRouter()
    return (
        <div>
            <p>Upload Images</p>

            <div className='flex-center flex-col gap-5 p-20 border border-dashed rounded-2xl my-2'>
                <div className='p-3 bg-outline rounded-full w-fit'>
                    <HiCloudUpload size={30} />
                </div>

                <div>
                    <p className='text-[#475367]'><span className='text-primaryLight font-[600]'>Click to upload</span> or drag and drop</p>
                    <p className='text-[#98A2B3] text-[12px]'>SVG, PNG, JPG or GIF (max. 800x400px)</p>
                </div>


            </div>

            <div className="grid grid-cols-2 gap-5 mt-5">
                <button className="bg-[#EBEBEB] text-textColor rounded-md" onClick={()=> router.back()}>Cancel</button>
                <button className="bg-primaryLight text-white  p-3 rounded-md" onClick={onOpen}>Submit</button>
            </div>

            
        </div>
    )
}

export default UploadImages