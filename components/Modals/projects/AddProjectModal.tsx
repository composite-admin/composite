"use client"
import { Modal } from '@/components/shared/Modal'
import { useAddProjectModal, useSuccessModal } from '@/store/inventory/UseInventoryModal';
import React, { useEffect, useState } from "react";
import { HiHome } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { nigerianStates, selectOptionsForProjectStatus } from "@/utils/types";
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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config/api";
import { useStaffRoles } from "@/hooks/useSelectOptions";
import { useProjectStore } from "@/store/project/useProjectStore";
import { useRouter } from "next/navigation";

const AddProjectModal = () => {
  const isOpen = useAddProjectModal((state) => state.isOpen);
  const onClose = useAddProjectModal((state) => state.onClose);
  const { setTeamMemberData, teamMemberData } = useProjectStore();
  const { staffRoles } = useStaffRoles();
  const { toast } = useToast();
  const router = useRouter();

  const allRoles = staffRoles?.map((role: any) => role.role);

  const isSucessOpen = useSuccessModal((state) => state.onOpen);

  const form = useForm<AddProjectFormType>({
    resolver: zodResolver(AddProjectFormSchema),
  });

  const { watch, setValue } = form;

  const teamMembers = teamMemberData?.map((member: any) => {
    return `${member.firstname} ${member.middlename} ${member.lastname}`;
  });

  const teamMemberList = teamMembers?.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  const watchRole = watch("role");
  useEffect(() => {
    const fetchStaffByRole = async () => {
      if (watchRole) {
        try {
          const response = await api.get(`/staffs/role/all?role=${watchRole}`);

          if (response.data) {
            setTeamMemberData(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching staff by role:", error);
        }
      }
    };

    fetchStaffByRole();
  }, [watchRole, setValue, setTeamMemberData]);

  const { mutate } = useMutation({
    mutationKey: ["add project"],
    mutationFn: async (data: { [Key in keyof AddProjectFormType]: string }) => {
      try {
        const response = await api.post("/projects", {
          supervisor_id: teamMemberData?.find(
            (member: any) =>
              `${member.firstname} ${member.middlename} ${member.lastname}` ===
              data.project_supervisor
            // @ts-ignore next-line
          )?.userid as string,
          ...data,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
    onSuccess: () => {
      toast({
        title: "Staff added successfully",
        variant: "success",
      });

      router.push("/project");
      router.refresh();
    },
    onError: (error: Error) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    },
  });

  //watch for when role changes

  function onSubmit(formValues: AddProjectFormType) {
    const startDateString = formValues.start_date
      ? formValues.start_date.toISOString().slice(0, 19).replace("T", " ")
      : "";
    const endDateString = formValues.end_date
      ? formValues.end_date.toISOString().slice(0, 19).replace("T", " ")
      : "";

    mutate({
      ...formValues,
      start_date: startDateString,
      end_date: endDateString,
    });
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <CustomFormField
              name="project_name"
              control={form.control}
              placeholder="Enter project name"
              label="Project Name"
            />
            <CustomFormSelect
              name="status"
              control={form.control}
              placeholder="Select Project Status"
              labelText="Project Status"
              items={selectOptionsForProjectStatus}
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
                <CustomFormSelect
                  name="role"
                  control={form.control}
                  placeholder="Select role"
                  labelText="Role"
                  items={allRoles || []}
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
                <CustomFormSelect
                  name="project_supervisor"
                  control={form.control}
                  placeholder="Add member"
                  labelText="Team Member"
                  items={teamMemberList || []}
                />
              </div>
            </div>
            <div>
              <CustomFormTextareaField
                label="Project Description"
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