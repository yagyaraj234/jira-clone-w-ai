"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useUser } from "./api/use-user";
import { Loader, LogOut } from "lucide-react";
import { useLogout } from "./api/use-logout";

export const UserButton = () => {
  const { data: user, isLoading } = useUser();
  const { mutate } = useLogout();

  if (isLoading) {
    return (
      <div className="bg-neutral-300 rounded-full size-10 flex items-center justify-center">
        <Loader className="animate-spin size-4 text-muted-foreground" />
      </div>
    );
  }

  if (!user) return null;
  const { name, email } = user;

  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "U";
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 border border-neutral-200 transition">
          <AvatarFallback className=" bg-neutral-200 flex items-center justify-center text-neutral-500 font-medium ">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={10}
        align="end"
        side="bottom"
        className=" w-60"
      >
        <div className="flex items-center justify-center gap-2 flex-col px-2.5 py-1">
          <Avatar className="size-[52px] hover:opacity-75 border border-neutral-200 transition">
            <AvatarFallback className=" bg-neutral-200 flex items-center justify-center text-xl text-neutral-500 font-medium ">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {name || "User"}
            </p>
            <p className="text-xs font-medium text-neutral-900 ">{email}</p>
          </div>
        </div>
        <Separator className="my-2" />
        <DropdownMenuItem
          className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer"
          onClick={() => mutate()}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
