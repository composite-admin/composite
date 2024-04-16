import { fadeToBottomVariant } from "@/utils/variants";
import { motion } from "framer-motion";
import { FC, ReactNode, useEffect, useRef } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};

const DropContent: FC<Props> = ({ isOpen, onClose, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose;
      }
    };

    if (isOpen) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-[600]">
          <div onClick={onClose} className="fixed top-0 left-0 w-full h-full"></div>

          <motion.div ref={ref} {...fadeToBottomVariant}>
            {children}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default DropContent;
