import { ChevronDown, ChevronLeft, Info, LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";
import ItemSidebar from "./ItemSidebar";

export default function Sidebar() {
  return (
    <aside className="min-w-[260px] flex flex-col bg-white border-r border-gray-300 px-6 pt-3">
      <div className="w-full flex items-center justify-start mt-2">
        <Link href="/dashboard">
          <picture>
            <img className="w-full h-9" src="/logo.svg" alt="calendy" />
          </picture>
        </Link>
      </div>
      <Link href="/dashboard">
        <div className="flex items-center gap-3 font-girloyBold text-colorAzul mt-5 hover:underline cursor-pointer">
          <ChevronLeft className="text-colorAzul" />
          <p>Back to home</p>
        </div>
      </Link>
      <div className="w-full mt-2 flex flex-col gap-3 flex-1">
        <h1 className="Account Settings text-2xl font-girloyBold">
          Account settings
        </h1>
        <div className="flex-1 w-full flex flex-col">
          <ItemSidebar />
        </div>
        <div className="w-full flex flex-col items-start gap-1 pb-3 font-girloyBold">
          <div className="flex  items-center gap-3 rounded-lg hover:bg-colorCeleste w-full min-h-11 cursor-pointer">
            <Info />
            <div className="flex items-center gap-3">
              <span>Help</span>
              <ChevronDown />
            </div>
          </div>
          <div className="flex  items-center gap-3 rounded-lg hover:bg-colorCeleste w-full min-h-11 cursor-pointer">
            <LogOut className="-rotate-180" />
            <div className="flex items-center gap-3">
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
