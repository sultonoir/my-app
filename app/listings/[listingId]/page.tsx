import getCurrentUser from "@/components/actions/getCurrentUser";
import getLIstingById from "@/components/actions/getListingById";
import EmptyState from "@/components/shared/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";
import getReservations from "@/components/actions/getReservations";

interface Iparams {
  listingId?: string;
}

export const metadata = async ({ params }: { params: Iparams }) => {
  const listing = await getLIstingById(params);
  return {
    title: listing?.title,
    description: listing?.description,
  };
};

export interface latlngProp {
  latlng: number[];
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
