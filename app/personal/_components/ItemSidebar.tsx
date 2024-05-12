"use client";

import { cn } from "@/lib/utils";
import {
  CalendarCheck2Icon,
  LinkIcon,
  List,
  LucideIcon,
  Settings,
  Star,
  UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const linksUs: Array<{ label: string; href: string; icon: LucideIcon }> = [
  {
    href: "/personal",
    icon: UsersRoundIcon,
    label: "Profile",
  },
  {
    href: "/personal/branding",
    icon: Star,
    label: "Branding",
  },
  {
    href: "/personal/link",
    icon: LinkIcon,
    label: "My Link",
  },
  {
    href: "/personal/login-preferenes",
    icon: List,
    label: "Login preferences",
  },
  {
    href: "#",
    icon: Settings,
    label: "Cookie settings",
  },
  {
    href: "/personal/avialability/connected-calendars",
    icon: CalendarCheck2Icon,
    label: "Calendar sync",
  },
];

export default function ItemSidebar() {
  const pathName = usePathname();

  return (
    <>
      {linksUs.map((v) => (
        <Link
          href={v.href}
          key={v.href}
          className={cn(
            "flex items-center gap-3 min-h-11 rounded-lg hover:bg-colorCeleste mt-1 mb-1 cursor-pointer font-girloyBold",
            pathName === v.href && "bg-colorCeleste text-colorAzul"
          )}
        >
          {<v.icon />}
          <span>{v.label}</span>
        </Link>
      ))}
    </>
  );
}
