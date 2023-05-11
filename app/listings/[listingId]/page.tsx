import getCurrentUser from "@/app/actions/getCurrentUser";
import getLIstingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface Iparams {
  listingId?: string;
}

const page = async ({ params }: { params: Iparams }) => {
  const listing = await getLIstingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);
  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
};

export default page;
