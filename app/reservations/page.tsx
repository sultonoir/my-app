import getCurrentUser from "../../components/actions/getCurrentUser";
import getReservations from "../../components/actions/getReservations";
import EmptyState from "../../components/shared/EmptyState";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  const reservation = await getReservations({ authorId: currentUser?.id });
  if (!currentUser) {
    return (
      <EmptyState
        title="Tidak terhubung"
        subtitle="Login terlebih dahulu"
      />
    );
  }
  if (reservation.length === 0) {
    return (
      <EmptyState
        title="Reservasi tidak ditemukan"
        subtitle="Sepertinya Anda tidak memiliki reservasi di profil Anda"
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
