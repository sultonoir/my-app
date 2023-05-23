"use client";

import { SafeNotifications, SafeReservation, SafeUser } from "@/types";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SlLogout } from "react-icons/sl";
import { BsBookmarkHeart } from "react-icons/bs";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../shared/Avatar";
import useRentModal from "@/hooks/useRentModal";
import { BiPlus, BiUser } from "react-icons/bi";
import { MdOutlinePayments } from "react-icons/md";
import { RiCalendarCheckLine } from "react-icons/ri";
import Notifications from "../shared/Notifications";
import { HiOutlinePaperAirplane } from "react-icons/hi2";

interface UserMenuProps {
  currentUser: SafeUser | null;
  notifications: SafeNotifications[];
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser, notifications }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal]);
  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
    >
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Mode tuan rumah
        </div>
        <div
          onClick={rentModal.onOpen}
          className="md:hidden p-3 border border-neutral-200 hover:shadow-md transition cursor-pointer rounded-full"
        >
          <BiPlus size={20} />
        </div>
        {currentUser && (
          <Notifications
            notifications={notifications}
            currentUser={currentUser}
          />
        )}
        <Menu.Button className="p-3 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition relative">
          <AiOutlineMenu size={20} />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute mt-2 right-0 w-30 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="p-1">
            {currentUser ? (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => router.push("/payment")}
                      className={`${
                        active ? "bg-rose-500 text-white" : "text-primary"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <MdOutlinePayments
                        size={24}
                        className="pr-2"
                      />
                      Paymet
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => router.push(`/reservations`)}
                      className={`${
                        active ? "bg-rose-500 text-white" : "text-primary"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <RiCalendarCheckLine
                        size={24}
                        className="pr-2"
                      />
                      Reservations
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => router.push(`/trips`)}
                      className={`${
                        active ? "bg-rose-500 text-white" : "text-primary"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <HiOutlinePaperAirplane
                        size={24}
                        className="pr-2"
                      />
                      Perjalanan
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => router.push(`/user/${currentUser.name}`)}
                      className={`${
                        active ? "bg-rose-500 text-white" : "text-primary"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <BiUser
                        size={24}
                        className="pr-2"
                      />
                      Account
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => router.push("/favorites")}
                      className={`${
                        active ? "bg-rose-500 text-white" : "text-primary"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <BsBookmarkHeart
                        size={24}
                        className="pr-2"
                      />
                      Favorite
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => signOut()}
                      className={`${
                        active ? "bg-rose-500 text-white" : "text-primary"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <SlLogout
                        className="pr-2"
                        size={24}
                      />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={loginModal.onOpen}
                      className={`${
                        active ? "bg-rose-500 text-white" : "text-primary"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Signin
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={registerModal.onOpen}
                      className={`${
                        active ? "bg-rose-500 text-white" : "text-primary"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Signup
                    </button>
                  )}
                </Menu.Item>
              </>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
