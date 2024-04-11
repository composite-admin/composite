"use client";
import { useSuccessModal } from '@/store/inventory/UseInventoryModal';
import { useRouter } from 'next/navigation';
import { HiCloudUpload, HiX } from 'react-icons/hi'
import { FileUploader } from "react-drag-drop-files";
import { useState, useRef } from 'react';
import Image from 'next/image';

const fileTypes = ["JPG", "PNG", "GIF"];

const UploadImages = (props: any) => {
  const onOpen = useSuccessModal(state => state.onOpen)
  const router = useRouter()

  const [file, setFile] = useState(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (file: any) => {
    console.log(file)
    setFile(file);
  };

  function fileToBase64(file: File): any {
    let result = new Promise((resolve, reject) => {
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


  // Function to handle file selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const selectedFiles = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prevSelectedImages => [...prevSelectedImages, ...selectedFiles]);
  };

  // Function to remove selected image
  const removeImage = (index: number) => {
    const newSelectedImages = [...selectedImages];
    newSelectedImages.splice(index, 1);
    setSelectedImages(newSelectedImages);
  };
  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <p>Upload Images</p>

      <div className='flex-center flex-col gap-5 p-20 border border-dashed rounded-2xl my-2' >
        <div className='p-3 bg-outline rounded-full w-fit cursor-pointer' onClick={openFileInput}>
          <HiCloudUpload size={30} />
        </div>

        <div onClick={openFileInput} className='cursor-pointer'>
          <p className='text-[#475367]'><span className='text-primaryLight font-[600]'>Click to upload</span> or drag and drop</p>
          <p className='text-[#98A2B3] text-[12px]'>SVG, PNG, JPG or GIF (max. 800x400px)</p>
        </div>

        <div>
          <input type="file" onChange={handleImageChange}
            ref={fileInputRef}
            accept="image/*" multiple className="hidden" />
          <div>
            {selectedImages.map((image, index) => (
              <div key={index} style={{ display: 'inline-block', margin: '10px' }} className="relative m-2">
                <img src={image} alt={`Selected ${index + 1}`} style={{ maxWidth: '150px', maxHeight: '150px' }} />
                <HiX className='text-red-500 absolute top-1 right-1 cursor-pointer' onClick={() => removeImage(index)}/>
                
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-5 mt-5">
        <button className="bg-[#EBEBEB] text-textColor rounded-md" onClick={() => router.back()}>Cancel</button>
        <button className="bg-primaryLight text-white  p-3 rounded-md" onClick={onOpen}>Submit</button>
      </div>


    </div>
  )
}

export default UploadImages