"use client";

import Container from "../components/Container";
import ListingCard from "../components/listing/Listingcard";
import { SafeListing, SafeUser } from "../types";

interface FavoritesClientProps {
  currentUser: SafeUser | null;
  listings: SafeListing[];
}

const favoritesClient: React.FC<FavoritesClientProps> = ({
  currentUser,
  listings,
}) => {
  return (
    <Container>
      <div className="mt-10 grid grid-cols-1 md:fridco2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default favoritesClient;
