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
// use these for the privileges....
// consultant
// project
// inventory
// contractor
// staff
// supplier
// client

const privileges = [
  "Inventory",
  "Project",
  "Suppliers",
  "Contractor",
  "Consultant",
  "Staff",
  "Client",
];

const actions = ["can_view", "can_edit", "can_create", "can_delete"];

export default function AddPrivilegeModal() {
  const { isOpen, onClose } = useAddPrivilegeModal();
  const { toast } = useToast();
  const { staffDetails } = useManageStaffStore();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      privileges: privileges.reduce(
        (acc: { [key: string]: any }, privilege) => {
          acc[privilege] = {
            selected: false,
            actions: actions.reduce(
              (actionAcc: { [key: string]: any }, action) => {
                actionAcc[action] = false;
                return actionAcc;
              },
              {}
            ),
          };
          return acc;
        },
        {}
      ),
    },
  });

  const formatActionLabel = (action: string) => {
    return action.replace("can_", "Can ").replace("_", " ");
  };

  interface FormData {
    privileges: Record<string, PrivilegeData>;
  }

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

  const submit = (data: FormData) => {
    const formattedData = Object.entries(data.privileges)
      .filter(([_, value]) => value.selected)
      .map(([type, { actions }]) => ({
        staff_id: staffDetails?.userid,
        type: type.toLowerCase(),
        ...Object.fromEntries(
          Object.entries(actions).map(([action, value]) => [
            action,
            value ? 1 : 0,
          ])
        ),
      }));

    if (formattedData.length === 0) {
      console.error("No privileges selected");
      toast({ title: "No privileges selected", variant: "destructive" });
      return;
    }

    mutate(formattedData);
  };

  return (
    <Modal
      title="Grant Privilege(s)"
      isOpen={isOpen}
      onClose={onClose}
      classname="max-w-2xl"
    >
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex flex-col w-full gap-5">
          <Controller
            name="privileges"
            control={control}
            render={({ field }) => (
              <div className="gap-2 grid lg:grid-cols-2 ">
                {privileges.map((privilege) => (
                  <div key={privilege} className="mb-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`${privilege}-selected`}
                        checked={field.value[privilege].selected}
                        onCheckedChange={(checked) => {
                          const updatedPrivileges = {
                            ...field.value,
                            [privilege]: {
                              ...field.value[privilege],
                              selected: checked,
                            },
                          };
                          field.onChange(updatedPrivileges);
                        }}
                      />
                      <label
                        htmlFor={`${privilege}-selected`}
                        className="font-bold"
                      >
                        {privilege}
                      </label>
                    </div>
                    {field.value[privilege].selected && (
                      <div className="ml-6 mt-2 flex flex-wrap gap-2">
                        {actions.map((action) => (
                          <div
                            key={action}
                            className="flex items-center space-x-2"
                          >
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
                                      [action]: checked,
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
                    )}
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
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
