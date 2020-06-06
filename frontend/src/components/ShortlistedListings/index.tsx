import React from "react";
import { useQuery, gql } from "@apollo/client";
import ListingCard, { IListing } from "../ListingCard";
import { Typography, Row, Col } from "antd";

const GET_SHORTLISTED_LISTINGS = gql`
  query GetShortlistedListings {
    currentUser {
      volunteer {
        shortlistedListings {
          _id
          title
          description
          category
          createdAt
        }
      }
    }
  }
`;

const ShortlistedListings = () => {
  const { data, error, loading } = useQuery(GET_SHORTLISTED_LISTINGS);
  if (error) return <p>{error.message}</p>;
  if (loading) return <p>Loading...</p>;
  const { shortlistedListings } = data.currentUser.volunteer;
  return (
    <div className="shortlisted-listings">
      <Typography.Title>Shortlisted listings:</Typography.Title>
      <Row gutter={16}>
        {shortlistedListings.map((listing: IListing) => {
          return (
            <Col key={listing._id} span={8}>
              <ListingCard listing={listing} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ShortlistedListings;
