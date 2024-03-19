"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { Button } from "../ui/button";

type props = {
  btnText?: string;
  onClick?: () => void;
  withBtn?: boolean;
};

const GoBack = ({ btnText, onClick, withBtn }: props) => {
  const router = useRouter();

  return (
    <div className="mb-10 flex justify-between">
      <div className="flex items-center gap-3" onClick={() => router.back()}>
        <div className="p-2 bg-white rounded-md border border-outline cursor-pointer">
          <HiArrowLeft />
        </div>

        <p className="text-textColor">Go Back</p>
      </div>
      <div>{withBtn ? <Button onClick={onClick} >{btnText}</Button> : null}</div>
    </div>
  );
};

export default GoBack;
