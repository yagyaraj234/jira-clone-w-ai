import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc";

type responseType = InferResponseType<(typeof client.api.auth.signup)["$post"]>;
type requestType = InferRequestType<(typeof client.api.auth.signup)["$post"]>;

export const useSignup = () => {
  const mutate = useMutation<responseType, Error, requestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.signup["$post"]({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Signup successful");
    },
    onError: () => {
      toast.error(`Failed to signup`);
    },
  });
  return mutate;
};
