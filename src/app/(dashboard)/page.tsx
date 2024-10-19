import { redirect } from "next/navigation";
import { useCurrent } from "@/features/auth/action";

export default async function Home() {
  const user = await useCurrent();

  if (!user) redirect("/sign-in");
  return <div>This is the dashboard</div>;
}
