import getCurrentUser from "../../components/actions/getCurrentUser";
import getReservations from "../../components/actions/getReservations";
import EmptyState from "../../components/shared/EmptyState";
import PaymentClient from "./PaymentClinet";

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

  const reservation = await getReservations({ userId: currentUser.id });

  if (reservation.length === 0) {
    return (
      <EmptyState
        title="Tidak ada perjalanan"
        subtitle="Buat perjalanan terlebih dahulu"
      />
    );
  }
  return (
    <PaymentClient
      currentUser={currentUser}
      reservations={reservation}
    />
  );
};

export default TripsPage;
