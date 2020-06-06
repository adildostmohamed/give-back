/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_currentUser_volunteer_viewedListings {
  __typename: "Listing";
  id: string;
}

export interface CurrentUser_currentUser_volunteer_shortlistedListings {
  __typename: "Listing";
  id: string;
}

export interface CurrentUser_currentUser_volunteer {
  __typename: "Volunteer";
  id: string;
  interests: (ListingCategory | null)[];
  viewedListings: (CurrentUser_currentUser_volunteer_viewedListings | null)[];
  shortlistedListings: (CurrentUser_currentUser_volunteer_shortlistedListings | null)[];
}

export interface CurrentUser_currentUser {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  volunteer: CurrentUser_currentUser_volunteer | null;
}

export interface CurrentUser {
  currentUser: CurrentUser_currentUser;
}
