import {
  CustomFormField,
  CustomFormSelect,
  CustomFormTextareaField,
} from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config/api";
import { useStaffRoles } from "@/hooks/useSelectOptions";
import {
  useProjectDetails,
  useProjectDetailsPageFormModal,
} from "@/store/project/useProjectModal";
import { useProjectStore } from "@/store/project/useProjectStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddProjectTeamMemberSchema = z.object({
  project_name: z.string(),
  role: z.string(),
  staff_name: z.string(),
});

type AddProjectTeamMemberType = z.infer<typeof AddProjectTeamMemberSchema>;

export default function AddProjectTeamMember() {
  const { setTeamMemberData, teamMemberData } = useProjectStore();
  const { staffRoles } = useStaffRoles();
  const queryClient = useQueryClient();
  const allRoles = staffRoles?.map((role: any) => role.role);
  const { onClose } = useProjectDetailsPageFormModal();
  let staff_id: string | undefined;
  const { projectCode, projectName } = useProjectDetails();
  const { toast } = useToast();
  const form = useForm<AddProjectTeamMemberType>({
    resolver: zodResolver(AddProjectTeamMemberSchema),
    defaultValues: {
      project_name: projectName,
    },
  });
  const { watch, setValue } = form;
  const watchtTeamMember = watch("staff_name");
  if (watchtTeamMember && teamMemberData) {
    staff_id = teamMemberData?.find(
      (member: any) =>
        member.firstname + " " + member.middlename + " " + member.lastname ===
        watchtTeamMember
    )?.userid;
  }

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
    mutationKey: ["add management member"],
    mutationFn: async (data: {
      [Key in keyof AddProjectTeamMemberType]: string;
    }) => {
      try {
        const response = await api.post("/project-teams", {
          project_code: projectCode,
          staff_id: staff_id,
          ...data,
        });
        // if (response.data) {
        //   router.push("/project");
        //   window.location.reload();
        // }
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
        title: "Management member created successfully",
        variant: "success",
      });

      queryClient.invalidateQueries({
        queryKey: ["get all project team members by project code", projectCode],
      });
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: AddProjectTeamMemberType) => {
    mutate(data);
    console.log(data, projectCode);
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <CustomFormField
          control={form.control}
          name="project_name"
          label="Project Name"
          placeholder={projectName}
          disabled
        />
        <CustomFormSelect
          name="role"
          control={form.control}
          placeholder="Select role"
          labelText="Role"
          items={allRoles || []}
        />
        <CustomFormSelect
          name="staff_name"
          control={form.control}
          placeholder="Select Staff"
          labelText="Staff"
          items={teamMemberList || []}
        />

        <div className="flex gap-4 flex-col lg:flex-row">
          <Button variant={"secondary"} className="w-full" onClick={onClose}>
            Cancel
          </Button>
          <Button className="w-full">Add</Button>
        </div>
      </form>
    </Form>
  );
}
