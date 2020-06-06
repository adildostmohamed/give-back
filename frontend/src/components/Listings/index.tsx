import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Col, Row, Typography } from "antd";
import ListingCard, { IListing } from "../ListingCard";

const GET_LISTINGS = gql`
  query Listings {
    listings {
      _id
      title
      description
      category
      createdAt
      organisation {
        name
      }
    }
  }
`;

const Listings = () => {
  const { data, error, loading } = useQuery(GET_LISTINGS);
  if (error) return <p>Error {error.message}</p>;
  if (loading) return <p>Loading...</p>;
  return (
    <div className="listings">
      <Typography.Title>Listings</Typography.Title>
      <Row gutter={16}>
        {data?.listings.map((listing: IListing) => {
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

export default Listings;
