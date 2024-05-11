import {
  CustomFormField,
  CustomFormSelect,
} from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { api } from "@/config/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({});

type FormDataType = z.infer<typeof FormSchema>;

export default function Identification() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const form = useForm<FormDataType>({
    resolver: zodResolver(FormSchema),
  });

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setFile(droppedFiles[0]);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
    }
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        console.error("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);
      const uploadUrl = `/users/upload-file`;

      const response = await api.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("File uploaded successfully");
        // Handle success case
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const onSubmit = (data: FormDataType) => {
    handleUpload();
    console.log(data);
  };
  return (
    <div className="bg-white border-borderColor shadow-lg rounded-lg p-5 max-w-3xl mt-8">
      <div className="space-y-1">
        <h1 className="font-semibold ">Personal Identification</h1>
        <p className="text-textColor">Update your personal details here</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 py-5"
        >
          <CustomFormSelect
            control={form.control}
            labelText="ID Type"
            placeholder="ID Type"
            name="id_type"
            items={
              [
                "Driver's license",
                "National ID card",
                "International passport",
              ] ?? [""]
            }
          />
          <CustomFormField
            control={form.control}
            label="ID number"
            placeholder="Enter number"
            name="id_type"
          />
          <div>
            <p className="font-semibold my-3">Upload ID</p>
            <div className="flex flex-col items-center justify-between">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed w-full py-16 ${
                  isDragOver ? "border-blue-500" : "border-gray-300"
                } p-6 rounded-md w-full `}
              >
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-input"
                />
                <label
                  htmlFor="file-input"
                  className="cursor-pointer text-gray-500 text-center"
                >
                  <div className="flex flex-col items-center justify-center bg-gray-100 mx-auto rounded-full w-14 h-14 ">
                    <UploadCloud />
                  </div>
                  <p className="text-lg font-semibold ">
                    <span className="text-primaryLight font-semibold">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-sm">SVG, PNG, JPG or GIF (max. 2MB)</p>
                </label>
              </div>

              <div className="mt-4">
                <ul className="list-none space-y-2 flex gap-3">
                  {file && (
                    <li className="flex items-center justify-between text-sm text-gray-500 relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        className="w-32 h-32 object-cover rounded-md aspect-square"
                      />
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700 absolute -top-1 -right-1"
                        onClick={() => setFile(null)}
                      >
                        <X
                          color="white"
                          className="bg-red-500 rounded-full p-1"
                        />
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <Button className="w-full">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
