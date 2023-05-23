"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <span className="w-[52px] h-[52px] block">
        <Image
          src={`/logo.svg`}
          height={50}
          priority
          width={50}
          className="block cursor-pointer rounded-full"
          alt="logo"
        />
      </span>
    </Link>
  );
};

export default Logo;
