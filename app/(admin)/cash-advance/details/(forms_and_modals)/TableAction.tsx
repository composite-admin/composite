import useCashAdvanceStore, {
  CashAdvanceFormTypes,
} from "@/store/cash-advance/useCashAdvanceStore";

interface Props {
  children?: React.ReactNode;
  currentFormType: CashAdvanceFormTypes;
}

export default function TableAction({ children }: Props) {
  const { currentFormType, setFormTypes, onOpen } = useCashAdvanceStore();

  const showModal = (formType: CashAdvanceFormTypes) => {
    setFormTypes(formType);
    onOpen();
  };

  return <div onClick={() => showModal("request")}>{children}</div>;
}
