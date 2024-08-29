import { getStuffTyped } from "@/hooks/useSelectOptions";
import useClientStore from "@/store/client/useClientStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

interface ProjectImage {
  id: number;
  client_id: string;
  image: string;
  project_id: string;
  project_code: string;
  createdAt: string;
  updatedAt: string;
  added_by: string;
}

export default function ProjectImages() {
  const { projectDetails } = useClientStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const { data } = useQuery({
    queryKey: ["Get Project Images", projectDetails?.id],
    queryFn: () =>
      getStuffTyped<ProjectImage[]>(`/client/images/${projectDetails?.id}`),
    enabled: !!projectDetails?.id,
    refetchOnMount: "always",
  });

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg mt-5 py-10">
      <h2 className="font-semibold md:text-lg">Project Images</h2>

      <div>
        {data?.length === 0 ? (
          <p>No images found</p>
        ) : (
          <div className="flex gap-3 flex-wrap">
            {data?.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleImageClick(index)}>
                <Image
                  width={120}
                  unoptimized
                  height={120}
                  className="aspect-square cursor-pointer rounded-lg"
                  src={item.image}
                  alt=""
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedImageIndex !== null && data && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative">
            <Image
              width={600}
              height={600}
              unoptimized
              src={data[selectedImageIndex].image}
              alt="Selected Image"
              className="max-w-full max-h-full rounded-lg"
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl bg-red-500 rounded-full p-2"
              onClick={handleCloseModal}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
