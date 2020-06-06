import React from "react";
import { useQuery, gql } from "@apollo/client";
import OrgsListingsTable from "../OrgListingsTable";

const LISTINGS_FOR_USER_ORG = gql`
  query ListingsForUserOrg($filter: ListingFilterInput) {
    listingsForUserOrg(filter: $filter) {
      _id
      title
      description
      category
      status
      createdAt
    }
  }
`;

const OrgListingsEmptyState = () => {
  return (
    <div>
      You haven't created any listings yet! Add a listing now and find
      volunteers to take you to the next level!
    </div>
  );
};

const OrgListings = () => {
  const { data, loading, error } = useQuery(LISTINGS_FOR_USER_ORG, {
    variables: { filter: { category: [], status: [] } },
  });
  if (loading) return <p>Loading listings...</p>;

  return (
    <>
      {data && data.listingsForUserOrg && data.listingsForUserOrg.length > 0 ? (
        <OrgsListingsTable data={data.listingsForUserOrg} />
      ) : (
        <OrgListingsEmptyState />
      )}
    </>
  );
};

export default OrgListings;
