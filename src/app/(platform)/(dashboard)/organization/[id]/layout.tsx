import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import OrgHeader from "./_components/OrgHeader";

const OrganizationLayout = ({ children }: { children: ReactNode }) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  return (
    <div className="w-full h-full">
      <Sidebar />
      <div className="pl-56">
        <OrgHeader />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default OrganizationLayout;
