/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetShortlistedListings
// ====================================================

export interface GetShortlistedListings_currentUser_volunteer_shortlistedListings {
  __typename: "Listing";
  id: string;
  title: string;
  description: string;
}

export interface GetShortlistedListings_currentUser_volunteer {
  __typename: "Volunteer";
  shortlistedListings: (GetShortlistedListings_currentUser_volunteer_shortlistedListings | null)[];
}

export interface GetShortlistedListings_currentUser {
  __typename: "User";
  volunteer: GetShortlistedListings_currentUser_volunteer | null;
}

export interface GetShortlistedListings {
  currentUser: GetShortlistedListings_currentUser;
}
