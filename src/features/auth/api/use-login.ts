import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type responseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type requestType = InferRequestType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = () => {
  const router = useRouter();
  const mutate = useMutation<responseType, Error, requestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login["$post"]({ json });
      return await response.json();
    },
    onSuccess: () => {
      router.refresh();
    },
  });
  return mutate;
};
