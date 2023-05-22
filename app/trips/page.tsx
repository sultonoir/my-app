import getResrvStatus from "@/components/actions/getResrvStatus";
import getCurrentUser from "../../components/actions/getCurrentUser";
import EmptyState from "../../components/shared/EmptyState";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState
        title="Tidak terhubung"
        subtitle="Login terlebih dahulu"
      />
    );
  }

  const reservation = await getResrvStatus({ userSucces: currentUser.id });
  const completedByhost = await getResrvStatus({
    userCompletedByHost: currentUser.id,
  });
  const completed = await getResrvStatus({ userCompleted: currentUser.id });

  return (
    <TripsClient
      currentUser={currentUser}
      reservations={reservation}
      completedByhost={completedByhost}
      completed={completed}
    />
  );
};

export default TripsPage;
