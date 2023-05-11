import getCurrentUser from "../actions/getCurrentUser";
import getListing from "../actions/getListings";
import EmptyState from "../components/EmptyState";
import PropertiesClient from "./PropertiesClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login"
      />
    );
  }

  const listings = await getListing({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks loke you havent reserved any trips"
      />
    );
  }
  return (
    <PropertiesClient
      currentUser={currentUser}
      listings={listings}
    />
  );
};

export default TripsPage;
