import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  const reservation = await getReservations({ authorId: currentUser?.id });
  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please Login"
      />
    );
  }
  if (reservation.length === 0) {
    return (
      <EmptyState
        title="No Reservation found"
        subtitle="Looks like you have no reservation on your profile"
      />
    );
  }
  return (
    <ReservationsClient
      currentUser={currentUser}
      reservations={reservation}
    />
  );
};

export default ReservationsPage;
