import getCurrentUser from "@/components/actions/getCurrentUser";
import UserClient from "./UserClient";
import EmptyState from "@/components/shared/EmptyState";

interface Iparams {
  userId: string;
}

const page = async ({ params }: { params: Iparams }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState />;
  }

  return <UserClient user={currentUser} />;
};

export default page;
