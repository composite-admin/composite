"use client";
import ApproveStakeholderForm from "@/components/forms/ApproveStakeholderForm";

interface Props {
  params: { id: string };
}
export default function ApproveStakeholderPage({ params }: Props) {
  const id = params.id;
  return <ApproveStakeholderForm id={id} />;
}
