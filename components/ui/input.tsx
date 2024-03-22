import * as React from "react";

import { cn } from "@/lib/utils";
import { RiMailCloseLine } from "react-icons/ri";
import { type VariantProps, cva } from "class-variance-authority";

const inputVariants = cva(
  "flex h-[40px] w-full rounded-md placeholder:text-[14px] border border-[#D0D5DD] bg-white pl-8 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-[#626262]  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        icon: "rounded-md border-slate-200 bg-slate-50 p-2 text-slate-900 dark:bg-slate-950 dark:text-slate-50",
      },
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  withIcon?: boolean;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, withIcon, icon, variant, type, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(inputVariants({ variant, className }))}
          ref={ref}
          {...props}
        />
        {withIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
