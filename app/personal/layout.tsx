import React, { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import Navbar from "@/components/global/NavbarDashboard";
import { existUser } from "@/lib/services/user";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type Props = {
  children: ReactNode;
};

export default async function PersonalLayout({ children }: Props) {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const user = await existUser(userId);
  if (!user) {
    return redirect("/");
  }
  return (
    <main className="size-full bg-colorGrisDash flex">
      <Sidebar />
      <section className="w-full flex flex-col ">
        <Navbar user={user} />
        <div className="w-full overflow-y-auto">{children}</div>
      </section>
    </main>
  );
}
