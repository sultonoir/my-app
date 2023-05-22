"use client";

import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "../../types";
import { useCallback, useState } from "react";
import Container from "../../components/shared/Container";
import Heading from "../../components/shared/Heading";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../../components/listing/Listingcard";
import EmptyState from "@/components/shared/EmptyState";

interface ReservationsClientProps {
  currentUser: SafeUser | null;
  reservations: SafeReservation[];
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  currentUser,
  reservations,
}) => {
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="Reservasi tidak ditemukan"
        subtitle="Sepertinya Anda tidak memiliki reservasi di profil Anda"
      />
    );
  }
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Shometing went wrong");
          console.error(error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Booking on your properties"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            actionId={reservation.id}
            reservation={reservation}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
            guest
            host
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
