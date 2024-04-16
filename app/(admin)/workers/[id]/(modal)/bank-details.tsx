import FramerModal from "@/components/shared/FramerModal";
import { useModal } from "@/utils/modalContext";
import { FC } from "react";
import { IoMdClose } from "react-icons/io";
import { string } from "zod";

type Props = {
  bankName: string;
  accountName: string;
  accountNumber: string;
};

const BankDetailsModal: FC<Props> = (props) => {
  const { hideModal } = useModal();

  const { bankName, accountName, accountNumber } = props;

  return (
    <FramerModal isOpen={true} onClose={hideModal} isAutomatic={false}>
      <div className="min-w-[25rem] md:max-w-[28rem] bg-zinc-100 rounded-xl overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <p className="font-bold text-xl">View</p>

          <div
            className="size-8 grid place-content-center bg-blue-100 rounded-full text-blue-600 cursor-pointer"
            onClick={hideModal}
          >
            <IoMdClose />
          </div>
        </div>

        <div className="bg-white p-4 space-y-4">
          <div>
            <p className="font-bold text-xl">Bank Details</p>
            <p className="text-[15px] text-zinc-600">This is the available bank details as submitted by the worker</p>
          </div>

          <div className="p-5 space-y-1 bg-blue-100 rounded-lg">
            <div className="flex items-center justify-between">
              <p className="capitalize text-zinc-600">Bank Name</p>
              <p className="text-blue-500 font-semibold">{bankName}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="capitalize text-zinc-600">Account No:</p>
              <p className="text-blue-500 font-semibold">{accountNumber}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="capitalize text-zinc-600">Account Name:</p>
              <p className="text-blue-500 font-semibold">{accountName}</p>
            </div>
          </div>

          <button className="w-full rounded-lg py-[10px] font-medium bg-primaryLight text-white" onClick={hideModal}>
            Done
          </button>
        </div>
      </div>
    </FramerModal>
  );
};

export default BankDetailsModal;
