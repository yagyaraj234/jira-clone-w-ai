import { redirect } from "next/navigation";

import { useCurrent } from "@/features/auth/action";
import { CreateWorkspace } from "@/features/workspaces/components/create-workspace-form";

const CreateWorkspaceForm = async () => {
  const user = await useCurrent();
  if (!user) redirect("/sign-in");

  return (
    <>
      <CreateWorkspace />
    </>
  );
};

export default CreateWorkspaceForm;
