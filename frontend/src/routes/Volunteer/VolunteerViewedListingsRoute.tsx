import React from "react";
import ProfilePageLayout from "../../components/ProfilePageLayout";
import ViewedListings from "../../components/ViewedListings";

const VolunteerViewedListingsRoute = () => {
  return (
    <ProfilePageLayout>
      <ViewedListings />
    </ProfilePageLayout>
  );
};

export default VolunteerViewedListingsRoute;
