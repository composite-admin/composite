"use client";

import { Button } from "../ui/button";

export type PageHeaderComponentProps = {
  title: string;
  subTitle: string;
  onclick?: () => void;
  buttonText?: string;
};

export default function PageHeaderComponent({
  title,
  subTitle,
  buttonText,
  onclick,
}: PageHeaderComponentProps) {
  return (
    <div className="pb-5 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-[#475367] text-[1rem]">{subTitle}</p>
      </div>
      <div>
        {buttonText ? (
          <Button onClick={onclick}>
            {buttonText ? buttonText : "Create"}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
