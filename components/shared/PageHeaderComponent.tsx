"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export type PageHeaderComponentProps = {
  title: string;
  subTitle: string;
  onclick?: () => void;
  buttonText?: string;
  href?: string;
};

export default function PageHeaderComponent({
  title,
  subTitle,
  buttonText,
  onclick,
  href,
}: PageHeaderComponentProps) {
  return (
    <div className="pb-5 flex justify-between items-center ">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-[#475367] text-[1rem]">{subTitle}</p>
      </div>
      <div>
        {buttonText ? (
        <Link href={href || ' '}>
          <Button onClick={onclick}>
            {buttonText ? buttonText : "Create"}
          </Button>
        </Link>
        ) : null}
      </div>
    </div>
  );
}
