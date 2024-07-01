"use client";

import { OrganizationSwitcher, SignedIn, UserButton } from "@clerk/clerk-react";

const OrgHeader = () => {
  return (
    <header className="h-16 w-full flex items-center justify-between gap-4 border-b px-4">
      <h2 className="font-semibold">Welcome back!</h2>
      <div className="flex items-center justify-end gap-4">
        <OrganizationSwitcher hidePersonal={true} />
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
      </div>
    </header>
  );
};

export default OrgHeader;
