import React, { ReactNode } from "react";

const ClerkLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-full flex items-center justify-center min-h-screen">
      {children}
    </div>
  );
};

export default ClerkLayout;
