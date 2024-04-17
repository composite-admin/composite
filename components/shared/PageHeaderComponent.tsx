"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export interface PageHeaderComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subTitle: string;
  onclick?: () => void;
  buttonText?: string;
  href?: string;
}

export default function PageHeaderComponent({
  title,
  subTitle,
  buttonText,
  onclick,
  href,
  ...props
}: PageHeaderComponentProps) {
  return (
    <div {...props} className={`pb-5 flex justify-between items-center ${props.className}`}>
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-[#475367] text-[1rem]">{subTitle}</p>
      </div>
      <div>
        {buttonText ? (
          <Link href={href || " "}>
            <Button onClick={onclick}>{buttonText ? buttonText : "Create"}</Button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
