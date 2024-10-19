import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc";

type responseType = InferResponseType<
  (typeof client.api.workspaces.create)["$post"]
>;
type requestType = InferRequestType<
  (typeof client.api.workspaces.create)["$post"]
>;
export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation<responseType, Error, requestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.workspaces.create["$post"]({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Workspace created successfully");
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
    onError: () => {
      toast.error(`Failed to create workspace`);
    },
  });

  return mutate;
};
