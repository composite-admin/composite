import { CustomFormTextareaField } from "@/components/shared/FormComponent";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/config/api";
import { useRequestStore } from "@/store/requests/RequestStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
// "request_code": "req-58284",
// "comment": "This is not a comment about the request."

// api endpoint
// /request-comments

export const CommentSchema = z.object({
  comment: z.string({
    required_error: "Comment is required",
  }),
});

type CommentFormType = z.infer<typeof CommentSchema>;

export default function AddCommentForm() {
  const { requestDetails } = useRequestStore();
  const { toast } = useToast();

  const form = useForm<CommentFormType>({
    resolver: zodResolver(CommentSchema),
  });

  const { mutate } = useMutation({
    mutationKey: ["add request comment"],
    mutationFn: async (data: CommentFormType) => {
      try {
        const response = await api.post("/request-comments", {
          ...data,
          request_code: requestDetails?.request_code,
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },

    onSuccess: () => {
      toast({
        title: "Comment added successfully",
        variant: "success",
      });
      form.reset();
    },

    onError: () => {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const submit = (data: CommentFormType) => {
    mutate(data);
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <div className="space-y-1.5 pb-2">
            <h3 className="capitalize font-semibold text-lg">
              Make addition comment
            </h3>
            <p>Write addition information about this request</p>
          </div>
          <CustomFormTextareaField
            name="comment"
            label="Comment"
            control={form.control}
            placeholder="Enter comment here"
          />
          <div className="pt-5">
            <Button className="w-full">Done</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
