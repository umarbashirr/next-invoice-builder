"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <Image src="/images/logo.svg" alt="App Logo" width={120} height={40} />
    </Link>
  );
};

export default Logo;
