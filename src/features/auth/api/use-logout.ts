import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

type responseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutate = useMutation<responseType, Error>({
    mutationFn: async () => {
      const response = await client.api.auth.logout["$post"]();
      return response.json();
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
      router.refresh();
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: () => {
      toast.error("Failed to logout");
    },
  });
  return mutate;
};
