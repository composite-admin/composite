import { getStuffTyped } from "@/hooks/useSelectOptions";
import useCashAdvanceStore, {
  CashAdvanceFormTypes,
} from "@/store/cash-advance/useCashAdvanceStore";
import { ICashAdvanceData } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { data } from "../../../contractors/pending-project/data";

interface Props {
  children?: React.ReactNode;
  currentFormType: CashAdvanceFormTypes;
  formType: CashAdvanceFormTypes;
  cash_id: string; // Update this line
  onActionClick: () => void;
}

export default function TableAction({
  children,
  formType,
  onActionClick,
  cash_id,
}: Props) {
  const { setFormTypes, onOpen, setCashAdvanceDetails } = useCashAdvanceStore();

  const showModal = (formType: CashAdvanceFormTypes) => {
    setFormTypes(formType);
    onOpen();
    const GetDetails = async () => {
      const res = await getStuffTyped<ICashAdvanceData>(
        `/cash-advances/${cash_id}`
      );
      setCashAdvanceDetails(res);
      return res;
    };

    GetDetails();
  };

  return <div onClick={() => showModal(formType)}>{children}</div>;
}
