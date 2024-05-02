import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import {
  BookType,
  Calendar,
  ChevronDown,
  InfoIcon,
  LinkIcon,
  LogOut,
  MoreVertical,
  Star,
  UserPlus2Icon,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import Logout from "./Logout";

type Props = {
  user: User;
};

export default function Navbar({ user }: Props) {
  return (
    <header className="w-full flex items-center justify-center gap-2 py-3">
      <div className="w-full max-w-7xl flex items-center justify-end px-8 gap-4">
        <button className="rounded-full px-6 py-2 bg-white border border-colorAzul flex items-center justify-center text-colorAzul font-girloySemiBold gap-2 hover:bg-colorAzul/10">
          <UserPlus2Icon className="text-colorAzul" />
          <span>Invite user</span>
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex gap-2 items-center cursor-pointer outline-none">
              <Avatar>
                <AvatarImage src={user.imageUrl ?? ""} />
                <AvatarFallback>{user.name ?? ""}</AvatarFallback>
              </Avatar>

              <ChevronDown className="text-colorText" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="gap-6 outline-none min-w-[280px] "
            side="top"
            sideOffset={10}
          >
            <DropdownMenuLabel>
              <div className="w-full flex flex-col">
                <p className="text-colorTextBlack font-girloyBold text-lg">
                  {user.name}
                </p>
                <p className="text-colorTextGris font-girloyLight text-sm">
                  Teams free trial
                  <Link href="#">
                    <span className="text-colorAzul ml-1 hover:underline">
                      Upgrade
                    </span>
                  </Link>
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-300" />
            <DropdownMenuLabel className="text-colorTextGris font-girloySemiBold">
              ACCOUNT SETTINGS
            </DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer hover:bg-colorAzul/10 pt-4 pb-4">
              <div className="flex gap-4 items-center text-colorTextBlack font-girloySemiBold">
                <Users className="text-colorTextBlack" />
                <span>Profile</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-colorAzul/10 pt-4 pb-4">
              <div className="flex gap-4 items-center text-colorTextBlack font-girloySemiBold">
                <Star className="text-colorTextBlack" />
                <span>Branding</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-colorAzul/10 pt-4 pb-4">
              <div className="flex gap-4 items-center text-colorTextBlack font-girloySemiBold">
                <LinkIcon className="text-colorTextBlack" />
                <span>My Link</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-colorAzul/10 pt-4 pb-4">
              <div className="flex gap-4 items-center text-colorTextBlack font-girloySemiBold">
                <Calendar className="text-colorTextBlack" />
                <span>Calendar sync</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-colorAzul/10 pt-4 pb-4">
              <div className="flex gap-4 items-center text-colorTextBlack font-girloySemiBold">
                <MoreVertical className="text-colorTextBlack" />
                <span>All settings</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-300" />
            <DropdownMenuLabel className="text-colorTextGris font-girloySemiBold">
              RESOURCES
            </DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer hover:bg-colorAzul/10 pt-4 pb-4">
              <div className="flex gap-4 items-center text-colorTextBlack font-girloySemiBold">
                <BookType className="text-colorTextBlack" />
                <span>Getting started guide</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-colorAzul/10 pt-4 pb-4">
              <div className="flex gap-4 items-center text-colorTextBlack font-girloySemiBold">
                <InfoIcon className="text-colorTextBlack" />
                <span>Community</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-300" />
            <Logout />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
