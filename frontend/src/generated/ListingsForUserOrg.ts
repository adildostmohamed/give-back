/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingFilterInput, ListingCategory, ListingStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: ListingsForUserOrg
// ====================================================

export interface ListingsForUserOrg_listingsForUserOrg {
  __typename: "Listing";
  id: string;
  title: string;
  description: string;
  category: ListingCategory[];
  status: ListingStatus;
  createdAt: Date;
}

export interface ListingsForUserOrg {
  listingsForUserOrg: (ListingsForUserOrg_listingsForUserOrg | null)[];
}

export interface ListingsForUserOrgVariables {
  filter?: ListingFilterInput | null;
}
