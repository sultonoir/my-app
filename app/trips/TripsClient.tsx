"use client";
import { useCallback, useState, useEffect } from "react";
import { SafeReservation, SafeUser } from "../../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Container from "../../components/shared/Container";
import Heading from "../../components/shared/Heading";
import ListingCard from "../../components/listing/Listingcard";

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation canceled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  useEffect(() => {
    const countdownStartedPreviously = localStorage.getItem("countdownStarted");
    if (!countdownStartedPreviously) {
      localStorage.setItem("countdownStarted", "true");
    }

    return () => {
      localStorage.removeItem("countdownStarted");
    };
  }, []);

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => {
          const [countdownStarted, setCountdownStarted] = useState(false);

          useEffect(() => {
            if (!countdownStarted) {
              setCountdownStarted(true);
              const countdown = setInterval(() => {
                const waktuAkhir = new Date();
                waktuAkhir.setMinutes(waktuAkhir.getMinutes() + 1);
                const waktuSekarang = new Date().getTime();
                const selisih = waktuAkhir.getTime() - waktuSekarang;
                const menit = Math.floor(selisih / (1000 * 60));
                const detik = Math.floor((selisih % (1000 * 60)) / 1000);
                console.log(`${menit}:${detik}`);
                if (selisih <= 0) {
                  clearInterval(countdown);
                  axios
                    .delete(`/api/reservations/${reservation.id}`)
                    .then((response) => {
                      console.log("Permintaan DELETE berhasil.");
                    })
                    .catch((error) => {
                      console.error("Permintaan DELETE gagal:", error);
                    });
                }
              }, 1000);
            }
          }, [countdownStarted, reservation.id]);

          return (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default TripsClient;
