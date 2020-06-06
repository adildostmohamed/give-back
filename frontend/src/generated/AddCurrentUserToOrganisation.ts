/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddCurrentUserToOrganisation
// ====================================================

export interface AddCurrentUserToOrganisation_addCurrentUserToOrganisation_organisation {
  __typename: "Organisation";
  id: string;
  name: string;
}

export interface AddCurrentUserToOrganisation_addCurrentUserToOrganisation {
  __typename: "User";
  id: string;
  organisation: AddCurrentUserToOrganisation_addCurrentUserToOrganisation_organisation | null;
}

export interface AddCurrentUserToOrganisation {
  addCurrentUserToOrganisation: AddCurrentUserToOrganisation_addCurrentUserToOrganisation;
}

export interface AddCurrentUserToOrganisationVariables {
  organisationId: string;
}
