"use client";
import FillNewDetails from '@/components/shared/FillNewDetails'
import GoBack from '@/components/shared/GoBack';
import UploadImages from '@/components/shared/UploadImages'
import React, { useState } from 'react'
import { HiChevronRight } from 'react-icons/hi2';
import NewReportForm from "./forms/NewReportForm";

const NewReportsPage = () => {
  const [index, setIndex] = useState(1);
  const [form, setForm] = useState<any>();
  return (
    <>
      <GoBack />
      <div>
        <NewReportForm />
      </div>
    </>
  );
};

export default NewReportsPage