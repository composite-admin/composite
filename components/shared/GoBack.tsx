"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { Button } from "../ui/button";

type props = {
  btnText?: string;
  onclick?: () => void;
  withBtn?: boolean;
};

const GoBack = ({ btnText, onclick, withBtn }: props) => {
  const router = useRouter();

  return (
    <div className="mb-4 flex justify-between">
      <div className="flex items-center gap-3" onClick={() => router.back()}>
        <div className="p-2 bg-white rounded-md border border-outline cursor-pointer">
          <HiArrowLeft />
        </div>

        <p className="text-textColor">Go Back</p>
      </div>
      <div>{withBtn ? <Button onClick={onclick} >{btnText}</Button> : null}</div>
    </div>
  );
};

export default GoBack;
