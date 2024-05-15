import { getAllContacts } from "@/actions/contacts";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import Contact from "./_components/Contact";

type Props = {};

export default async function ContactUserPage({}: Props) {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const contacts = await getAllContacts(userId);
  return (
    <div className="w-full">
      <h1 className="text-colorTextBlack font-girloyBold text-3xl">Contacts</h1>
      <Contact data={contacts} />
    </div>
  );
}
