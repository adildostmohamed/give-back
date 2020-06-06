import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import ListingCard, { IListing, IOrganisation } from "../ListingCard";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Typography, Row, Col } from "antd";

const GET_LISTING_DETAILS = gql`
  query Listing($_id: ID!) {
    listing(_id: $_id) {
      _id
      title
      description
      category
      organisation {
        _id
        name
        listings {
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

const VOLUNTEER_VIEW_LISTING = gql`
  mutation VolunteerViewListing($listingId: ID!) {
    volunteerViewListing(listingId: $listingId) {
      _id
    }
  }
`;

const ListingDetailHeader = ({ title, description }: IListing) => {
  return (
    <>
      <Typography.Title level={2}>{title}</Typography.Title>
      <p>{description}</p>
    </>
  );
};

const RelatedListings = (props: any) => {
  const otherListingsFromOrg = props.listings?.filter(
    (listing: IListing) => listing._id !== props.currentListingId
  );
  if (otherListingsFromOrg.length > 0) {
    return (
      <>
        <Typography.Title level={3}>
          More listings from {props.organisation.name}:
        </Typography.Title>
        <Row gutter={16}>
          {otherListingsFromOrg.map((listing: IListing) => {
            return (
              <Col key={listing._id} span={8}>
                <ListingCard listing={listing} />
              </Col>
            );
          })}
        </Row>
      </>
    );
  }
  return null;
};

const ListingDetails = () => {
  const { listingId } = useParams();
  const [volunteerViewListing] = useMutation(VOLUNTEER_VIEW_LISTING);
  const { data, error, loading } = useQuery(GET_LISTING_DETAILS, {
    variables: { _id: listingId },
    onCompleted: async () => {
      try {
        await volunteerViewListing({ variables: { listingId } });
      } catch (error) {
        console.error(error);
      }
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const { listing } = data;
  return (
    <div className="listingDetails">
      <header>
        <Link to={"/profile/listings"}>
          <ArrowLeftOutlined /> Back to all listings
        </Link>
      </header>
      <ListingDetailHeader
        title={listing.title}
        description={listing.description}
      />
      <RelatedListings
        currentListingId={listing._id}
        listings={listing.organisation.listings}
        organisation={listing.organisation}
      />
    </div>
  );
};

export default ListingDetails;
