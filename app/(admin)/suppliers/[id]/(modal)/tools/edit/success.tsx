import { useModal } from "@/utils/modalContext";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { opacityVariant } from "@/utils/variants";

const EditToolsSuccessContent = () => {
  const { hideModal } = useModal();

  return (
    <motion.div {...opacityVariant} className="min-w-[25rem] md:max-w-[28rem] bg-zinc-100 rounded-xl overflow-hidden">
      <div className="p-5 flex items-center justify-between">
        <p className="font-semibold text-xl">Successful</p>

        <div
          className="size-8 grid place-content-center bg-blue-100 rounded-full text-blue-600 cursor-pointer"
          onClick={hideModal}
        >
          <IoMdClose />
        </div>
      </div>

      <div className="bg-white px-5 py-6 space-y-4">
        <div className="grid place-content-center">
          <Image src={"/truck.svg"} alt="truck" width={150} height={100} />
        </div>

        <div className="space-y-2 text-center">
          <p className="font-semibold text-xl capitalize max-w-[15rem] mx-auto">Tool & Machinery added successfully</p>
          <p className="text-zinc-600">
            The you have successfully edit the inventory and the new information has be effected
          </p>
        </div>

        <button className="w-full py-2 rounded-lg bg-primaryLight text-white" onClick={hideModal}>
          Done
        </button>
      </div>
    </motion.div>
  );
};

export default EditToolsSuccessContent;
