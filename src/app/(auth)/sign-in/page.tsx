import { useCurrent } from "@/features/auth/action";
import { SignInCard } from "@/features/auth/components/sign-in-card";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const user = await useCurrent();
  console.log(user);

  if (user) redirect("/");
  return (
    <div>
      <SignInCard />
    </div>
  );
};

export default SignInPage;
