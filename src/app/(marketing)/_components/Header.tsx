"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="h-16 border-b flex items-center justify-start w-full">
      <div className="container w-full flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-4">
          <Link href={"/about-us"} className="text-base font-semibold">
            About Us
          </Link>
          <Link href={"/our-pricing"} className="text-base font-semibold">
            Our Pricing
          </Link>
          <Link href={"/contact-us"} className="text-base font-semibold">
            Contact Us
          </Link>
        </nav>
        <div className="flex items-center justify-end gap-2">
          <Button asChild variant="ghost">
            <Link href={"/sign-in"}>Sign in</Link>
          </Button>
          <Button asChild>
            <Link href={"/sign-up"}>Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
