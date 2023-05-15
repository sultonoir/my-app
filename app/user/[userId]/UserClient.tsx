"use client";

import ChangPassModal from "@/components/modal/ChangPassModal";
import ChangeProfileModal from "@/components/modal/ChangeProfileModal";
import AvatarCom from "@/components/shared/Avatar";
import Container from "@/components/shared/Container";
import EditProfile from "@/components/shared/EditProfile";
import { SafeUser } from "@/types";

interface UserClientProps {
  user: SafeUser | null;
}

const UserClient: React.FC<UserClientProps> = ({ user }) => {
  return (
    <Container>
      <div className="flex justify-between">
        <span className="text-2xl font-semibold text-neutral-900">Profile</span>
        <span>
          <EditProfile />
          <ChangeProfileModal />
          <ChangPassModal />
        </span>
      </div>
      <div className="flex flex-col md:flex-row gap-5 justify-center">
        <div className="border-[5px] border-rose-500 rounded-full relative">
          <AvatarCom
            src={user?.image}
            alt={user?.name}
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col gap-5 md:w-[500px]">
          <h1 className="text-xl font-semibold text-neutral-900">
            {user?.name}
          </h1>
          <p className="text-neutral-500 font-light text-justify indent-5 max-w-sm">
            {user?.description ||
              "Orang ini sangat malas dan tidak menulis biografi apapun."}
          </p>
        </div>
      </div>
    </Container>
  );
};

export default UserClient;
