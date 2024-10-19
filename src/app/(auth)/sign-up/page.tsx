import { redirect } from "next/navigation";
import { useCurrent } from "@/features/auth/action";
import { SignUpCard } from "@/features/auth/components/sign-up-card";

const SignUpPage = async () => {
  const user = await useCurrent();
  console.log(user);

  if (user) redirect("/");
  return (
    <div>
      <SignUpCard />
    </div>
  );
};

export default SignUpPage;
