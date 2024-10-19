// import { useMutation } from "@tanstack/react-query";
// import { InferRequestType, InferResponseType } from "hono";

// import { client } from "@/lib/rpc";

// type responseType = InferRequestType<
//   (typeof client.api.workspaces.delete)["$delete"]
// >;

// type requestType = InferRequestType<
//   typeof client.api.workspaces.delete
// >["$delete"];

// export const useDeleteWorkspace = () => {
//   const mutate = useMutation<responseType, Error, requestType>({
//     mutationFn: async ({ json }) => {
//       const response = await client.api.workspaces.delete["$delete"]({ json });
//       return await response.json();
//     },
//   });

//   return mutate;
// };
