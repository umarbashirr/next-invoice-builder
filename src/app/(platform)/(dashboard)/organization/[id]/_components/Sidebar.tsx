"use client";

import Logo from "@/app/(marketing)/_components/Logo";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const { orgId } = useAuth();
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      href: `/organization/${orgId}`,
    },
    {
      label: "Clients",
      href: `/organization/${orgId}/clients`,
    },
    {
      label: "Vendors",
      href: `/organization/${orgId}/vendors`,
    },
    {
      label: "Products",
      href: `/organization/${orgId}/products`,
    },
    {
      label: "Invoices",
      href: `/organization/${orgId}/invoices`,
    },
    {
      label: "Payments",
      href: `/organization/${orgId}/payments`,
    },
  ];

  return (
    <div className="fixed w-56 h-full border-r">
      <div className="px-4 h-16 flex items-center justify-start border-b">
        <Logo />
      </div>
      <nav className="flex flex-col gap-2 px-2 mt-4">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "p-2 rounded text-base text-primary",
              pathname === route.href
                ? "bg-primary text-white shadow-sm"
                : "hover:bg-slate-100 duration-200 ease-in-out tranision-all"
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
