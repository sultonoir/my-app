import getCurrentUser from "@/components/actions/getCurrentUser";
import UserClient from "./UserClient";
import EmptyState from "@/components/shared/EmptyState";
import getListings from "@/components/actions/getListings";
import PropertiesClient from "./PropertiesClient";
import getProperties from "@/components/actions/getProperties";

interface Iparams {
  userId: string;
}

const page = async ({ params }: { params: Iparams }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState />;
  }
  const listings = await getProperties({ userId: currentUser.id });
  return (
    <div className="flex flex-col gap-y-8">
      <UserClient user={currentUser} />;
      <PropertiesClient
        currentUser={currentUser}
        listings={listings}
      />
    </div>
  );
};

export default page;
