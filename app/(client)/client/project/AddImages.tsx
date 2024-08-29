"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config/api";
import { userStore } from "@/store/auth/AuthStore";
import useClientStore, {
  useClientStoreModal,
} from "@/store/client/useClientStore";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddImages() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const { onClose } = useClientStoreModal();
  const { projectDetails } = useClientStore();
  const { userId, id } = userStore();
  const router = useRouter();
  const { toast } = useToast();

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
    const newFiles = [...files, ...droppedFiles].slice(0, 5);
    setFiles(newFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles = [...files, ...selectedFiles].slice(0, 5);
    setFiles(newFiles);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectDetails?.id || !projectDetails?.project_code) {
      toast({
        title: "Missing project details",
        description: "Project ID or code is missing. Please try again.",
        variant: "destructive",
      });
      return;
    }

    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`images`, file);
      });
      formData.append("project_id", projectDetails.id.toString());
      formData.append("project_code", projectDetails.project_code);

      const uploadUrl = `/client/images`;

      const response = await api.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setFiles([]);
        toast({
          title: "Images uploaded successfully",
          variant: "success",
        });
      } else {
        console.error("Failed to upload files");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };
  

  return (
    <form onSubmit={handleUpload}>
      <div>
        <div className="flex flex-col items-center justify-between">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed  ${
              isDragOver ? "border-blue-500" : "border-gray-300"
            } p-6 rounded-md w-full max-w-md`}
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
              <span className="text-lg font-semibold">
                Drag and drop files here or click to select
              </span>
              <p className="text-sm">
                Maximum {5} files allowed. Supported types: images.
              </p>
            </label>
          </div>

          <div className="mt-4">
            <ul className="list-none space-y-2 flex gap-3">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-sm text-gray-500 relative"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="w-32 h-32 object-cover rounded-md aspect-square"
                  />
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 absolute -top-1 -right-1"
                    onClick={() =>
                      setFiles(files.filter((_, i) => i !== index))
                    }
                  >
                    <X color="white" className="bg-red-500 rounded-full p-1" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="py-5 flex flex-col lg:flex-row gap-6 lg:absolute bottom-0 left-0 right-0 w-full px-6">
        <Button
          className="w-full"
          variant="secondary"
          type="button"
          onClick={onClose}
        >
          Cancel
        </Button>
        {files.length > 0 && (
          <Button className="w-full" type="submit">
            Done
          </Button>
        )}
      </div>
    </form>
  );
}
