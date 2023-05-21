"use client";
import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { RxBell } from "react-icons/rx";

const Notifications = ({ notification }: any) => {
  console.log(notification);
  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
    >
      <Menu.Button className="hidden md:block text-sm font-semibold p-3 rounded-full hover:bg-neutral-100 transition cursor-pointer">
        <RxBell size={20} />
      </Menu.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      />
      <Menu.Items className="absolute mt-2 right-0 w-30 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"></Menu.Items>
    </Menu>
  );
};

export default Notifications;
