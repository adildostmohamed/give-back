import React from "react";
import { useQuery, gql } from "@apollo/client";
import ListingCard, { IListing } from "../ListingCard";
import { Typography, Row, Col } from "antd";

const GET_VIEWED_LISTINGS = gql`
  query GetViewedListings {
    currentUser {
      volunteer {
        viewedListings {
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

const ViewedListings = () => {
  const { data, error, loading } = useQuery(GET_VIEWED_LISTINGS);
  if (error) return <p>{error.message}</p>;
  if (loading) return <p>Loading...</p>;
  const { viewedListings } = data.currentUser.volunteer;
  return (
    <div className="viewed-listings">
      <Typography.Title>Recently viewed listings:</Typography.Title>
      <Row gutter={16}>
        {viewedListings.map((listing: IListing) => {
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

export default ViewedListings;
