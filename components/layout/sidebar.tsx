"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart, 
  Calendar, 
  ChevronLeft, 
  ClipboardList, 
  Folders, 
  Home, 
  Settings, 
  Users 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface SidebarItemProps {
  href: string;
  icon: React.ElementType;
  title: string;
  active?: boolean;
}

function SidebarItem({ href, icon: Icon, title, active }: SidebarItemProps) {
  return (
    <Link href={href} passHref>
      <Button
        variant={active ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start",
          active && "bg-secondary/50"
        )}
      >
        <Icon className="mr-2 h-5 w-5" />
        {title}
      </Button>
    </Link>
  );
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { href: "/", icon: Home, title: "Dashboard" },
    { href: "/projects", icon: Folders, title: "Projects" },
    { href: "/tasks", icon: ClipboardList, title: "Tasks" },
    { href: "/meetings", icon: Calendar, title: "Meetings" },
    { href: "/team", icon: Users, title: "Team" },
    { href: "/analytics", icon: BarChart, title: "Analytics" }
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out md:relative",
        !open && "-translate-x-full md:translate-x-0 md:w-16"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 py-4">
        {open ? (
          <span className="text-xl font-bold">Quantum</span>
        ) : (
          <span className="mx-auto text-xl font-bold">Q</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex"
          onClick={() => setOpen(!open)}
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 transition-transform",
              !open && "rotate-180"
            )}
          />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 px-2">
          {navigation.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              title={open ? item.title : ""}
              active={pathname === item.href}
            />
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          {open && (
            <>
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5 text-sm">
                <span className="font-medium">Anurag</span>
                <span className="text-xs text-muted-foreground">Project Manager</span>
              </div>
            </>
          )}
          {!open && (
            <Avatar className="h-8 w-8 mx-auto">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </aside>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";