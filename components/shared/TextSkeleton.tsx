import { AnimatePresence } from "framer-motion";
import { DetailedHTMLProps, FC, HTMLAttributes } from "react";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  isLoading?: boolean;
  text?: string;
};

const TextSkeleton: FC<Props> = (props) => {
  const { className, isLoading, text, ...rest } = props;

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <div className={`w-full rounded-full py-2 animate-pulse bg-zinc-200 ${className}`} {...rest}></div>
        ) : (
          <div>
            <p className="text-[#101928] text-[16px] font-[600]">{text}</p>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TextSkeleton;
