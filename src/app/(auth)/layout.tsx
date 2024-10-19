"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  const path = usePathname();
  const isSignIn = path === "/sign-in";
  return (
    <main className="bg-neutral-100 min-h-screen max-h-screen">
      <div className="max-w-screen-2xl p-4 w-auto mx-auto min-h-screen max-h-screen">
        <nav className="flex justify-between items-center">
          <Image src="/logo.svg" alt="Logo" width={152} height={56} />
          <Button asChild variant="secondary">
            <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </Button>
        </nav>
        <div className="flex items-center justify-center p-7  my-4 scrollbar  scrollbar-none overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
};
export default AuthLayout;
