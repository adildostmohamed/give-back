/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: Listings
// ====================================================

export interface Listings_listings_organisation {
  __typename: "Organisation";
  name: string;
}

export interface Listings_listings {
  __typename: "Listing";
  id: string;
  title: string;
  description: string;
  category: ListingCategory[];
  createdAt: Date;
  organisation: Listings_listings_organisation;
}

export interface Listings {
  listings: (Listings_listings | null)[];
}
