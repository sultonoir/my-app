"use client";

import ChangPassModal from "@/components/modal/ChangPassModal";
import ChangeProfileModal from "@/components/modal/ChangeProfileModal";
import AvatarCom from "@/components/shared/Avatar";
import Container from "@/components/shared/Container";
import EditProfile from "@/components/shared/EditProfile";
import { SafeListing, SafeUser } from "@/types";
import PropertiesClient from "./PropertiesClient";

interface UserClientProps {
  user: SafeUser | null;
  listings: SafeListing[];
}

const UserClient: React.FC<UserClientProps> = ({ user, listings }) => {
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
        <div className="border-[5px] border-rose-500 rounded-full w-[210px] h-[210px] relative mx-auto md:mx-0">
          <AvatarCom
            src={user?.image}
            alt={user?.name}
            width={200}
            height={200}
          />
        </div>
        <div className="flex flex-col gap-5 md:w-[500px]">
          <h1 className="text-xl font-semibold text-neutral-900 text-center md:text-start">
            {user?.name}
          </h1>
          <p className="text-neutral-500 font-light text-justify indent-5 max-w-sm">
            {user?.description ||
              "Orang ini sangat malas dan tidak menulis biografi apapun."}
          </p>
        </div>
      </div>

      <PropertiesClient
        currentUser={user}
        listings={listings}
      />
    </Container>
  );
};

export default UserClient;
