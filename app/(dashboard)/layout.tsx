import { existUser } from "@/lib/services/user";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";
type Props = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const user = await existUser(userId);
  if (!user) {
    return redirect("/");
  }
  if (!user.introInfo) {
    return redirect("/intro");
  }
  return (
    <main className="size-full bg-colorGrisDash flex">
      <Sidebar />
      <section className="w-full flex flex-col flex-1 transition-all duration-500">
        <Navbar user={user} />
        <section className="w-full flex items-start justify-center flex-col max-w-[1264px] px-8">
          {children}
        </section>
      </section>
    </main>
  );
}
