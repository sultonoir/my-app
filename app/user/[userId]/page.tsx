import getCurrentUser from "@/components/actions/getCurrentUser";
import UserClient from "./UserClient";
import EmptyState from "@/components/shared/EmptyState";
import getListings from "@/components/actions/getListings";
import PropertiesClient from "./PropertiesClient";

interface Iparams {
  userId: string;
}

const page = async ({ params }: { params: Iparams }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState />;
  }
  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="Anda tidak memiliki property"
        subtitle="buat Terlebih dahulu property anda"
      />
    );
  }

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
