import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login"
      />
    );
  }

  const reservation = await getReservations({ userId: currentUser.id });

  if (reservation.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks loke you havent reserved any trips"
      />
    );
  }
  return (
    <TripsClient
      currentUser={currentUser}
      reservations={reservation}
    />
  );
};

export default TripsPage;
