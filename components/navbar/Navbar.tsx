"use client";
import React from "react";
import Container from "../shared/Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeNotifications, SafeReservation, SafeUser } from "@/types";
import Categories from "./Categories";

interface navbarProps {
  currentUser: SafeUser | null;
  notifications: SafeNotifications[];
}

const navbar: React.FC<navbarProps> = ({ currentUser, notifications }) => {
  return (
    <div className="fixed w-full bg-white z-50 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <span className="flex gap-2 items-center">
              <Logo />
              <Search />
            </span>
            <UserMenu
              currentUser={currentUser}
              notifications={notifications}
            />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default navbar;
