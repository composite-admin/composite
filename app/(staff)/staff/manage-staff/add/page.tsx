"use client";

import AddStaffForm from "@/components/forms/ManageStaffForms/AddStaffForm";
import FormContainer from "@/components/shared/FormContainer";
import GoBack from "@/components/shared/GoBack";
import { useState } from "react";
import { HiChevronRight } from "react-icons/hi2";

export default function AddStaffpage() {
  const [index, setIndex] = useState(1);
  return (
    <>
      <GoBack />
      <div>
        <AddStaffForm />
      </div>
    </>
  );
}

