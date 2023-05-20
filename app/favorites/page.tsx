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
        title="Buat daftar favorit pertama Anda"
        subtitle="Saat Anda mencari, ketuk ikon hati untuk menyimpan tempat dan Pengalaman yang Anda sukai ke favorit."
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
