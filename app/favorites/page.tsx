import getCurrentUser from "../../components/actions/getCurrentUser";
import getFavotiteListing from "../../components/actions/getFavoriteListing";
import EmptyState from "../../components/shared/EmptyState";
import FavoritesClient from "./FavoritesClient";

const favoriteListing = async () => {
  const listings = await getFavotiteListing();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="Favorite tidak ditemukan"
        subtitle="Sepertinya Anda tidak memiliki daftar favorit"
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
