/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NewOrganisationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateOrganisation
// ====================================================

export interface CreateOrganisation_createOrganisation {
  __typename: "Organisation";
  id: string;
}

export interface CreateOrganisation {
  createOrganisation: CreateOrganisation_createOrganisation;
}

export interface CreateOrganisationVariables {
  input: NewOrganisationInput;
}
