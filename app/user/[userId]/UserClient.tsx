"use client";

import AvatarCom from "@/components/shared/Avatar";
import Container from "@/components/shared/Container";
import useProfile from "@/hooks/UseProfile";
import { SafeUser } from "@/types";
import { IconType } from "react-icons";

interface UserClientProps {
  user: SafeUser | null;
}

const UserClient: React.FC<UserClientProps> = ({ user }) => {
  const profileModal = useProfile();
  return (
    <Container>
      <div className="flex justify-between">
        <span className="text-2xl font-semibold text-neutral-900">Profile</span>
        <span className="w-8">
          <button onClick={profileModal.onOpen}>Edit</button>
        </span>
      </div>
      <div className="flex flex-row gap-5 justify-center">
        <div className="border-[5px] border-rose-500 rounded-full relative">
          <AvatarCom
            src={user?.image}
            alt={user?.name}
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-xl font-semibold text-neutral-900">
            {user?.name}
          </h1>
          <p className="text-neutral-500 font-light text-justify indent-5">
            {user?.description}
          </p>
        </div>
      </div>
    </Container>
  );
};

export default UserClient;
