"use client";
import ApproveContractorForm from "@/components/forms/ApproveContractorForm";

interface Props {
  params: { id: string };
}
export default function ApproveContractorPage({ params }: Props) {
  const id = params.id;
  return <ApproveContractorForm id={id} />;
}
