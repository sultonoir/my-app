"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return <Image onClick={() => router.push("/")} src={`/logo.svg`} height={40} width={40} className="hidden md:block cursor-pointer rounded-full" alt="logo" />;
};

export default Logo;
