"use client";
import { useCallback, useState } from "react";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Container from "@/components/shared/Container";
import Heading from "@/components/shared/Heading";
import ListingCard from "@/components/listing/Listingcard";
import EmptyState from "@/components/shared/EmptyState";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  if (listings.length === 0) {
    return (
      <EmptyState
        title="Anda tidak memiliki property"
        subtitle="buat Terlebih dahulu property anda"
        rentmodal
      />
    );
  }
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Properties deleted");
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

  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="List of your properties"
      />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete Property"
            currentUser={currentUser}
            properties
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
