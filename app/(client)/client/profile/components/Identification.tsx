import {
  CustomFormField,
  CustomFormSelect,
} from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { api } from "@/config/api";
import useClientStore from "@/store/client/useClientStore";
import { ApiResponse } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ID } from "../../../../../utils/types";
import { useMutation } from "@tanstack/react-query";
import { userStore } from "@/store/auth/AuthStore";
import { toast, useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  id_type: z.string({
    required_error: "ID Type is required",
  }),
  id_number: z.string({
    required_error: "ID Number is required",
  }),
});

type FormDataType = z.infer<typeof FormSchema>;

export default function Identification() {
  const [isLoading, setIsLoading] = useState({
    isLoading: false,
    success: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { setClientImage, clientImage } = useClientStore();
  const { userId } = userStore();
  const form = useForm<FormDataType>({
    resolver: zodResolver(FormSchema),
  });

  const { toast } = useToast();
  const router = useRouter();

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
      setIsLoading({ isLoading: true, success: false });
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
        setIsLoading({ isLoading: false, success: true });
        setClientImage(response.data.data);
        console.log(response.data.data);
        console.log("File uploaded successfully");
        // Handle success case
      } else {
        console.error("Failed to upload file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const { mutate } = useMutation({
    mutationKey: ["client identification", userId],
    mutationFn: (data: FormDataType) =>
      api.put(`/client/${userId}`, {
        data,
        id_image: clientImage,
      }),
    onSuccess: () => {
      toast({
        title: "Client details updated successfully",
        variant: "success",
      });
      router.push("client/dashboard");
      setClientImage(null);
      setFile(null);
      setIsLoading({ isLoading: false, success: false });
    },

    onError: () => {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
      setClientImage(null);
      setFile(null);
      setIsLoading({ isLoading: false, success: false });
      router.refresh();
    },
  });
  const onSubmit = (data: FormDataType) => {
    mutate(data);
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
            name="id_number"
          />
          <div>
            <p className="font-semibold my-3">Upload ID</p>
            <div className="flex flex-col items-center justify-between">
              {!file && !clientImage ? (
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
              ) : null}
              <div className="mt-4">
                <ul className="list-none space-y-2 flex gap-3">
                  {file && !clientImage && (
                    <li className="flex items-center justify-between text-sm text-gray-500 relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        className="w-32 h-32 object-cover rounded-md aspect-square mb-7"
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
                  {clientImage && (
                    <li className="flex items-center justify-between text-sm text-gray-500 relative">
                      <img
                        src={clientImage}
                        alt=""
                        className="w-32 h-32 object-cover rounded-md aspect-square mb-7"
                      />
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700 absolute -top-1 -right-1"
                        onClick={() => setClientImage(null)}
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
              {file && (
                <div className="flex justify-center">
                  <Button
                    type="button"
                    onClick={handleUpload}
                    className="w-full"
                    disabled={!!clientImage || isLoading.isLoading}
                    variant={
                      isLoading.success && clientImage ? "secondary" : "default"
                    }
                  >
                    {isLoading.isLoading
                      ? "Uploading..."
                      : isLoading.success && clientImage
                      ? "Uploaded,  you can now submit"
                      : "Upload"}
                  </Button>
                </div>
              )}{" "}
            </div>
          </div>
          <div>
            <Button className="w-full" type="submit" disabled={!clientImage}>
              {!clientImage ? "Upload ID first" : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
