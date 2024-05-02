"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import React from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
type Props = {};

export default function Logout({}: Props) {
  const { signOut } = useClerk();
  const router = useRouter();
  const handleClick = () => {
    signOut(() => router.push("/"));
  };
  return (
    <DropdownMenuItem
      onClick={handleClick}
      className="cursor-pointer hover:bg-colorAzul/10 pt-4 pb-4"
    >
      <div className="flex gap-4 items-center text-colorTextBlack font-girloySemiBold">
        <LogOut className="text-colorTextBlack -rotate-180" />
        <span>Logout</span>
      </div>
    </DropdownMenuItem>
  );
}
