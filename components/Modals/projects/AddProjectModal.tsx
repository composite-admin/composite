"use client"
import { Modal } from '@/components/shared/Modal'
import { useAddProjectModal, useSuccessModal } from '@/store/inventory/UseInventoryModal';
import React, { useState } from "react";
import { HiHome } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import useProjectActionsStore from "@/store/actions/projectActions";
import useStaffActionsStore from "@/store/actions/staffActions";
import { nigerianStates } from "@/utils/types";
import { Form } from "@/components/ui/form";
import { AddProjectFormSchema, AddProjectFormType } from "./formTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CustomDatePicker,
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";

const AddProjectModal = () => {
  const isOpen = useAddProjectModal((state) => state.isOpen);
  const onClose = useAddProjectModal((state) => state.onClose);

  const isSucessOpen = useSuccessModal((state) => state.onOpen);

  const form = useForm<AddProjectFormType>({
    resolver: zodResolver(AddProjectFormSchema),
  });

  function onSubmit(formValues: AddProjectFormType) {
    const startDateString = formValues.start_date
      ? formValues.start_date.toISOString().slice(0, 19).replace("T", " ")
      : "";
    const endDateString = formValues.end_date
      ? formValues.end_date.toISOString().slice(0, 19).replace("T", " ")
      : "";

    console.log(formValues);
  }

  return (
    <Modal
      title={
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex gap-2 items-center">
            <div className="p-2 rounded-full bg-[#52a7f226] w-[50px] h-[50px] flex items-center justify-center">
              <HiHome />
            </div>
            <p className="text-[22px] font-[600] text-[#101928]">Add Project</p>
          </div>
        </div>
      }
      description={""}
      isOpen={isOpen}
      onClose={onClose}
      classname=" rounded-lg border border-outline bg-white p-[20px] w-3/6 focus max-h-[90vh] overflow-auto"
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CustomFormField
              name="project_name"
              control={form.control}
              placeholder="Enter project name"
              label="Project Name"
            />
            <div className="grid grid-cols-2 gap-2 my-5  ">
              <div className="space-y-4">
                <CustomDatePicker
                  control={form.control}
                  name="start_date"
                  label="Start Date"
                />
                <CustomFormField
                  name="address"
                  control={form.control}
                  placeholder="Enter Address"
                  label="Address"
                />{" "}
                <CustomFormField
                  name="city"
                  control={form.control}
                  placeholder="Enter city"
                  label="City"
                />{" "}
                <CustomFormField
                  name="role"
                  control={form.control}
                  placeholder="Select role"
                  label="Role"
                />
              </div>

              <div className="space-y-4">
                <CustomDatePicker
                  control={form.control}
                  name="end_date"
                  label="End Date"
                />
                <CustomFormSelect
                  control={form.control}
                  name="state"
                  label="State"
                  items={nigerianStates}
                />
                <CustomFormField
                  name="lga"
                  control={form.control}
                  placeholder="Enter LGA"
                  label="LGA"
                />
                <CustomFormField
                  name="team_member"
                  control={form.control}
                  placeholder="Add member"
                  label="Team MEmeber"
                />
              </div>
            </div>
            <div>
              <CustomFormTextareaField
                label="Description"
                name="project_description"
                control={form.control}
                placeholder="Enter description"
              />
            </div>
            <div className="my-5 flex gap-6 justify-center items-center">
              <Button variant="secondary" onClick={onClose} className="w-full">
                Cancel
              </Button>
              <Button className="w-full">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default AddProjectModal