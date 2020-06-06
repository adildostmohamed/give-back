import React from "react";
import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { Card, Tag, Tooltip, Button } from "antd";
import {
  StarOutlined,
  LoadingOutlined,
  FormatPainterOutlined,
  CodeOutlined,
  BulbOutlined,
  AreaChartOutlined,
  AuditOutlined,
  TagOutlined,
} from "@ant-design/icons";
import "./index.scss";

interface IProps {
  listing: IListing;
}
export interface IListing {
  _id?: string;
  title?: string;
  description?: string;
  status?: string;
  category?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  organisation?: IOrganisation;
}
export interface IOrganisation {
  _id?: string;
  name?: string;
  contactEmail?: string;
  createdAt?: Date;
  updatedAt?: Date;
  listings: IListing[];
}

const SHORTLIST_LISTING_MUTATION = gql`
  mutation VolunteerShortlistListing($listingId: ID!) {
    volunteerShortlistListing(listingId: $listingId) {
      _id
    }
  }
`;

const ListingCardShortlistButton = ({ _id }: IListing) => {
  const [volunteerShortlistListing, { loading }] = useMutation(
    SHORTLIST_LISTING_MUTATION,
    {
      refetchQueries: ["CurrentUserVolunteer"],
    }
  );
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await volunteerShortlistListing({ variables: { listingId: _id } });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Tooltip title="Add to your favourites">
      <Button
        type="ghost"
        size="large"
        shape="circle-outline"
        className="listing-card__fav-btn"
        onClick={handleClick}
      >
        {loading ? (
          <LoadingOutlined className="listing-card__fav-icon" />
        ) : (
          <StarOutlined className="listing-card__fav-icon" />
        )}
      </Button>
    </Tooltip>
  );
};

const ListingCardHeader = ({ title, _id, createdAt }: IListing) => {
  return (
    <div className="listing-card__header">
      <div className="listing-card__inner">
        <h3 className="listing-card__title">{title}</h3>
        <ListingCardShortlistButton _id={_id} />
      </div>
      {createdAt && (
        <p className="listing-card__date">
          <b>Posted on:</b> {new Date(createdAt).toDateString()}
        </p>
      )}
    </div>
  );
};

const ListingCategoryTags = ({ category }: IListing) => {
  const renderCategoryTag = (categoryString: String): any => {
    switch (categoryString) {
      case "DESIGN":
        return <FormatPainterOutlined />;
      case "DATA":
        return <AreaChartOutlined />;
      case "TECHNOLOGY":
        return <CodeOutlined />;
      case "CONSULTING":
        return <BulbOutlined />;
      case "ADMIN":
        return <AuditOutlined />;
      case "OTHER":
        return <TagOutlined />;
      default:
    }
  };
  if (category && category.length === 0) return null;
  return (
    <div className="listing-card__categories">
      {category?.map((category) => {
        return (
          <Tag
            color="blue"
            className="category-tag"
            icon={renderCategoryTag(category)}
          >
            {category}
          </Tag>
        );
      })}
    </div>
  );
};

const ListingCard = ({ listing }: IProps) => {
  return (
    <div className="listing-card__wrapper">
      <Link to={`/profile/listings/${listing._id}`}>
        <Card className="listing-card" hoverable>
          <ListingCardHeader
            title={listing.title}
            _id={listing._id}
            createdAt={listing.createdAt}
          />
          <p>{listing.description}</p>
          <ListingCategoryTags category={listing.category} />
        </Card>
      </Link>
    </div>
  );
};

export default ListingCard;
