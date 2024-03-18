"use client";

import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi2";

const GoBack = (props: any) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3" onClick={() => router.back()}>
      <div
        className="p-2 bg-white rounded-md border border-outline cursor-pointer"
      >
        <HiArrowLeft />
      </div>

      <p className="text-textColor">Go Back</p>
    </div>
  );
};

export default GoBack;
