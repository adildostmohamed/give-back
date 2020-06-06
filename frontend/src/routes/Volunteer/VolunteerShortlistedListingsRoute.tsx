import React from "react";
import ProfilePageLayout from "../../components/ProfilePageLayout";
import ShortlistedListings from "../../components/ShortlistedListings";

const VolunteerShortlistedListingsRoute = () => {
  return (
    <ProfilePageLayout>
      <ShortlistedListings />
    </ProfilePageLayout>
  );
};

export default VolunteerShortlistedListingsRoute;
