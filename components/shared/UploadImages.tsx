"use client";
import { useSuccessModal } from '@/store/inventory/UseInventoryModal';
import { useRouter } from 'next/navigation';
import { HiCloudUpload } from 'react-icons/hi'
import { FileUploader } from "react-drag-drop-files";
import { useState } from 'react';
import Image from 'next/image';

const fileTypes = ["JPG", "PNG", "GIF"];

const UploadImages = (props: any) => {
    const onOpen = useSuccessModal(state => state.onOpen)
    const router = useRouter()

    const [file, setFile] = useState(null);
    const handleChange = (file: any) => {
        console.log(file)
        setFile(file);
    };

    function fileToBase64(file: File): any{
        let result =  new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result.split(',')[1]);
            } else {
              reject(new Error('Failed to read file as data URL'));
            }
          };
          reader.onerror = error => reject(error);
          reader.readAsDataURL(file);
        });
        // console.log(result);
        return result
      }

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

                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                {
                    file && <Image width={100} height={100} src={String(fileToBase64(file[0]))} alt="" />
                }

            </div>

            <div className="grid grid-cols-2 gap-5 mt-5">
                <button className="bg-[#EBEBEB] text-textColor rounded-md" onClick={() => router.back()}>Cancel</button>
                <button className="bg-primaryLight text-white  p-3 rounded-md" onClick={onOpen}>Submit</button>
            </div>


        </div>
    )
}

export default UploadImages