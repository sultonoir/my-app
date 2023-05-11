import getCurrentUser from "../actions/getCurrentUser";
import getFavotiteListing from "../actions/getFavoriteListing";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

const favoriteListing = async () => {
  const listings = await getFavotiteListing();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorite found"
        subtitle="Look like you have no favorite listings"
      />
    );
  }

  return (
    <FavoritesClient
      currentUser={currentUser}
      listings={listings}
    />
  );
};

export default favoriteListing;
