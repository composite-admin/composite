"use client";
import { useForm, Controller } from "react-hook-form";
import { Modal } from "../shared/Modal";
import { Button } from "../ui/button";
import { useAddPrivilegeModal } from "@/store/modals/useCreateModal";
import { Checkbox } from "../ui/checkbox";
import useManageStaffStore from "@/store/manage-staff/useManageStaffStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { api } from "@/config/api";
import { useToast } from "../ui/use-toast";
import { useGetStaffPrivileges } from "@/hooks/useSelectOptions";
import { useEffect } from "react";

interface Action {
  can_view: boolean;
  can_edit: boolean;
  can_create: boolean;
  can_delete: boolean;
}

interface PrivilegeData {
  selected: boolean;
  actions: Action;
}

const privileges = [
  "Inventory",
  "Project",
  "Supplier",
  "Contractor",
  "Consultant",
  "Stakeholder",
  "Staff",
  "Client",
  "Worker",
  "Reports",
  "Facility",
];

const actions: (keyof Action)[] = [
  "can_view",
  "can_edit",
  "can_create",
  "can_delete",
];

export default function AddPrivilegeModal() {
  const { isOpen, onClose } = useAddPrivilegeModal();
  const { toast } = useToast();
  const { staffDetails } = useManageStaffStore();
  const { staffPrivileges, isLoading: isLoadingPrivileges } =
    useGetStaffPrivileges(staffDetails?.userid!);

  const shouldBeChecked = (type: string): boolean => {
    const privilege = staffPrivileges?.find(
      (p: any) => p.type.toLowerCase() === type.toLowerCase()
    );
    return privilege
      ? privilege.can_view === 1 ||
          privilege.can_edit === 1 ||
          privilege.can_create === 1 ||
          privilege.can_delete === 1
      : false;
  };

  const getInitialActions = (type: string): Action => {
    const privilege = staffPrivileges?.find(
      (p: any) => p.type.toLowerCase() === type.toLowerCase()
    );
    if (privilege) {
      return {
        can_view: privilege.can_view === 1,
        can_edit: privilege.can_edit === 1,
        can_create: privilege.can_create === 1,
        can_delete: privilege.can_delete === 1,
      };
    }
    return {
      can_view: false,
      can_edit: false,
      can_create: false,
      can_delete: false,
    };
  };

  const { control, handleSubmit, reset } = useForm<{
    privileges: Record<string, PrivilegeData>;
  }>();

  useEffect(() => {
    if (staffPrivileges && !isLoadingPrivileges) {
      const defaultValues = privileges.reduce((acc, privilege) => {
        acc[privilege] = {
          selected: shouldBeChecked(privilege),
          actions: getInitialActions(privilege),
        };
        return acc;
      }, {} as Record<string, PrivilegeData>);

      reset({ privileges: defaultValues });
    }
  }, [staffPrivileges, reset]);

  // useEffect(() => {
  //   const defaultValues = privileges.reduce((acc, privilege) => {
  //     acc[privilege] = {
  //       selected: true,
  //       actions: {
  //         can_view: false,
  //         can_edit: false,
  //         can_create: false,
  //         can_delete: false,
  //       },
  //     };
  //     return acc;
  //   }, {} as Record<string, PrivilegeData>);

  //   reset({ privileges: defaultValues });
  // }, [reset]);

  const formatActionLabel = (action: string): string => {
    return action.replace("can_", "Can ").replace("_", " ");
  };

  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      try {
        const response = await api.post(`/staffs/privileges`, data);
        return response.data.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
    onSuccess: (data) => {
      onClose();
      toast({ title: "Privileges granted successfully", variant: "success" });
    },
    onError: (error: Error) => {
      return error;
    },
  });

  const submit = (data: { privileges: Record<string, PrivilegeData> }) => {
    const formattedData = Object.entries(data.privileges).map(
      ([type, { actions }]) => ({
        staff_id: staffDetails?.userid,
        type: type.toLowerCase(),
        ...Object.fromEntries(
          Object.entries(actions).map(([action, value]) => [
            action,
            value ? 1 : 0,
          ])
        ),
      })
    );

    mutate(formattedData);
  };

  return (
    <Modal
      title="Grant Privilege(s)"
      isOpen={isOpen}
      onClose={onClose}
      classname="max-w-2xl">
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col w-full gap-5">
          <Controller
            name="privileges"
            control={control}
            render={({ field }) => (
              <div className="gap-2 grid lg:grid-cols-2 ">
                {privileges.map((privilege) => (
                  <div
                    key={privilege}
                    className="mb-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${privilege}-selected`}
                        checked={true}
                        disabled={true}
                      />
                      <label
                        htmlFor={`${privilege}-selected`}
                        className="font-bold">
                        {privilege}
                      </label>
                    </div>
                    <div className="ml-6 mt-2 flex flex-wrap gap-2">
                      {actions.map((action) => (
                        <div
                          key={action}
                          className="flex items-center space-x-2">
                          <Checkbox
                            id={`${privilege}-${action}`}
                            checked={field.value[privilege].actions[action]}
                            onCheckedChange={(checked) => {
                              const updatedPrivileges = {
                                ...field.value,
                                [privilege]: {
                                  ...field.value[privilege],
                                  actions: {
                                    ...field.value[privilege].actions,
                                    [action]: checked as boolean,
                                  },
                                },
                              };
                              field.onChange(updatedPrivileges);
                            }}
                          />
                          <label htmlFor={`${privilege}-${action}`}>
                            {formatActionLabel(action)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          />
          <div className="flex flex-col md:flex-row gap-5">
            <Button
              variant={"secondary"}
              className="w-full"
              type="button"
              onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="w-full"
              type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}