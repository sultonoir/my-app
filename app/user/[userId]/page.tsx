import getCurrentUser from "@/components/actions/getCurrentUser";
import UserClient from "./UserClient";
import EmptyState from "@/components/shared/EmptyState";
import PropertiesClient from "./PropertiesClient";
import getProperties from "@/components/actions/getProperties";

interface Iparams {
  userId: string;
}

export const generateMetadata = async () => {
  const user = await getCurrentUser();
  return {
    title: user?.name,
    description: user?.description,
  };
};

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
