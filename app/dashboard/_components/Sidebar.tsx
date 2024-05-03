"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLayoutStore } from "@/lib/store/layoutStore";
import { cn } from "@/lib/utils";
import {
  CalendarDaysIcon,
  ChevronDown,
  ChevronsLeftIcon,
  Clock,
  Contact2Icon,
  CrownIcon,
  Gem,
  Info,
  Layout,
  LayoutGrid,
  LineChart,
  LinkIcon,
  List,
  ListTodo,
  LucideIcon,
  Plus,
  RouteIcon,
  Share2,
  Timer,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

type TypeLinks = {
  title: string;
  href: string;
  icon: LucideIcon;
  isNew?: boolean;
};

const links1: Array<TypeLinks> = [
  {
    href: "/dashboard",
    title: "Event types",
    icon: LinkIcon,
  },
  {
    href: "/dashboard/scheduled-events-user",
    title: "Scheduled events",
    icon: CalendarDaysIcon,
  },
  {
    href: "/dashboard/avaliability-user",
    title: "Availability",
    icon: Clock,
  },
];

const links2: Array<TypeLinks> = [
  {
    href: "/dashboard/contacts-user",
    title: "Contacts",
    icon: Contact2Icon,
    isNew: true,
  },
  {
    href: "/workflows-user",
    title: "Workflows",
    icon: Share2,
  },
  {
    href: "/integrations-user",
    title: "Integrations & apps",
    icon: LayoutGrid,
  },
  {
    href: "/routing-forms-user",
    title: "Routing",
    icon: RouteIcon,
  },
];

const links3: Array<TypeLinks> = [
  {
    title: "Analytics",
    href: "/dashboard/organization-reporting",
    icon: LineChart,
  },
  {
    title: "Admin center",
    href: "/dashboard/admin-center",
    icon: CrownIcon,
  },
];

export default function Sidebar({}: Props) {
  const pathName = usePathname();

  const { onClose, onOpen, open } = useLayoutStore();
  const onOpCloseOpen = () => {
    if (open) {
      onClose();
    } else {
      onOpen();
    }
  };
  return (
    <div
      className={cn(
        "w-[260px] transition-all duration-500 h-full bg-white border-r border-gray-300 flex flex-col  group ",
        !open && "w-[65px] hover:w-[260px]"
      )}
    >
      <div className="w-full h-[72px] p-5 flex items-center justify-between">
        <div className="flex items-center gap-2 ">
          <Image
            alt="logo"
            src="https://assets.calendly.com/assets/frontend/media/calendly-33a0809afc4c21162dd7.svg"
            width={40}
            height={28}
            priority={true}
          />
          <Image
            alt="logo"
            src="https://assets.calendly.com/assets/frontend/media/calendly-wordmark-0da6c58d9a06b08c975f.svg"
            width={100}
            height={28}
            priority={true}
            className={cn(!open && "w-0", "group-hover:w-[100px]")}
          />
        </div>
        {open && (
          <button
            onClick={onOpCloseOpen}
            type="button"
            className="flex items-center hover:bg-colorCelesteHover rounded-sm outline-none p-1"
          >
            <ChevronsLeftIcon className="text-colorTextBlack" />
          </button>
        )}
        <button
          onClick={onOpCloseOpen}
          type="button"
          className={cn(
            "hidden items-center hover:bg-colorCelesteHover rounded-sm outline-none p-1",
            !open && "group-hover:flex"
          )}
        >
          <Layout className="text-colorTextBlack" />
        </button>
      </div>
      <div className="w-full flex items-center justify-center  p-[10px]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="w-full text-white font-girloySemiBold text-lg bg-colorAzul rounded-full flex items-center gap-2 justify-center py-2 hover:bg-colorTextAzulOther outline-none"
            >
              <Plus className="text-white" />
              <span
                className={cn(
                  "hidden",
                  open && "block",
                  !open && "group-hover:block"
                )}
              >
                Create
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[320px]">
            <DropdownMenuItem className="flex items-center  cursor-pointer">
              <div className="w-[10%] h-auto flex items-start justify-start">
                <List className="text-colorTextGris" />
              </div>
              <div className="w-[90%] flex flex-col">
                <span className="text-colorTextBlack font-girloySemiBold text-lg">
                  Event type
                </span>
                <span className="text-colorTextGris font-girloyRegular text-sm">
                  Create a new template for your regularly scheduled events.
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center  cursor-pointer">
              <div className="w-[10%] h-auto flex items-start justify-start">
                <Timer className="text-colorTextGris" />
              </div>
              <div className="w-[90%] flex flex-col">
                <span className="text-colorTextBlack font-girloySemiBold text-lg">
                  One-off meeting
                </span>
                <span className="text-colorTextGris font-girloyRegular text-sm">
                  Invite someone to pick a time to meet with you.
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center cursor-pointer">
              <div className="w-[10%] h-auto flex items-start justify-start">
                <ListTodo className="text-colorTextGris" />
              </div>
              <div className="w-[90%] flex flex-col">
                <span className="text-colorTextBlack font-girloySemiBold text-lg">
                  Meeting poll
                </span>
                <span className="text-colorTextGris font-girloyRegular text-sm">
                  Schedule a group meeting after offering times for a vote.{" "}
                </span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full flex-1 flex flex-col gap-1 justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1 py-1 px-2">
            {links1.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-lg hover:bg-colorCelesteHover flex items-center justify-start gap-3 h-11 py-[2px] px-[8px]",
                  pathName === l.href && "bg-colorCelesteHover text-colorAzul"
                )}
              >
                {
                  <l.icon
                    className={cn(
                      "text-colorTextBlack",
                      pathName === l.href &&
                        "bg-colorCelesteHover text-colorAzul"
                    )}
                  ></l.icon>
                }
                <span
                  className={cn(
                    "text-colorTextBlack font-girloySemiBold hidden",
                    pathName === l.href &&
                      "bg-colorCelesteHover text-colorAzul",
                    open && "block",
                    !open && "group-hover:block"
                  )}
                >
                  {l.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-2 border-t border-gray-300 sidebarLinks2">
          {links2.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-lg hover:bg-colorCelesteHover flex items-center justify-start gap-3 h-11 py-[2px] px-[8px]",
                pathName === l.href && "bg-colorCelesteHover text-colorAzul"
              )}
            >
              {
                <l.icon
                  className={cn(
                    "text-colorTextBlack",
                    pathName === l.href && "bg-colorCelesteHover text-colorAzul"
                  )}
                ></l.icon>
              }
              <span
                className={cn(
                  "text-colorTextBlack font-girloySemiBold hidden gap-4",
                  pathName === l.href && "bg-colorCelesteHover text-colorAzul",
                  open && "flex",
                  !open && "group-hover:flex"
                )}
              >
                {l.title}
                {l.isNew && (
                  <div className="rounded-sm bg-colorAzul text-white text-sm flex items-center justify-center px-2">
                    NEW
                  </div>
                )}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex flex-col flex-1 gap-1 justify-end pb-4 sidebarLinks2">
          <button
            type="button"
            className="rounded-lg bg-colorCelesteHover border border-colorAzul flex items-center h-14 py-[2px] px-[8px] gap-3 text-colorTextBlack font-semibold"
          >
            <Gem className="text-colorAzul" />
            <span
              className={cn(
                "hidden",
                open && "block",
                !open && "group-hover:block"
              )}
            >
              Upgrade Plann
            </span>
          </button>
          {links3.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-lg hover:bg-colorCelesteHover flex items-center justify-start gap-3 h-11 py-[2px] px-[8px]",
                pathName === l.href && "bg-colorCelesteHover text-colorAzul"
              )}
            >
              {
                <l.icon
                  className={cn(
                    "text-colorTextBlack",
                    pathName === l.href && "bg-colorCelesteHover text-colorAzul"
                  )}
                ></l.icon>
              }
              <span
                className={cn(
                  "text-colorTextBlack font-girloySemiBold hidden",
                  pathName === l.href && "bg-colorCelesteHover text-colorAzul",
                  open && "block",
                  !open && "group-hover:block"
                )}
              >
                {l.title}
              </span>
            </Link>
          ))}
          <button
            className={cn(
              "rounded-lg hover:bg-colorCelesteHover flex items-center justify-start gap-3 h-11 py-[2px] px-[8px]"
            )}
          >
            {<Info className={cn("text-colorTextBlack")}></Info>}
            <div
              className={cn(
                "hidden gap-2 ",
                open && "flex",
                !open && "group-hover:flex"
              )}
            >
              <span className={cn("text-colorTextBlack font-girloySemiBold")}>
                Help
              </span>
              <ChevronDown className="text-colorTextBlack" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
