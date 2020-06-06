import React from "react";
import ProfilePageLayout from "../../components/ProfilePageLayout";
import OrgListings from "../../components/OrgListings";

const OrgListingsRoute = () => {
  return (
    <ProfilePageLayout>
      <OrgListings />
    </ProfilePageLayout>
  );
};

export default OrgListingsRoute;
