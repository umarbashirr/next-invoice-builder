import React, { ReactNode } from "react";
import Header from "./_components/Header";

const MarketingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default MarketingLayout;
