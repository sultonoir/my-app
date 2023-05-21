import getResrvStatus from "@/components/actions/getResrvStatus";
import getCurrentUser from "../../components/actions/getCurrentUser";
import getReservations from "../../components/actions/getReservations";
import EmptyState from "../../components/shared/EmptyState";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState
        title="Tidak terhubung"
        subtitle="Login terlebih dahulu"
      />
    );
  }
  const reservation = await getResrvStatus({ authorId: currentUser.id });
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
