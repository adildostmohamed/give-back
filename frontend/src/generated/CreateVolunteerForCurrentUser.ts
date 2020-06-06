/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CurrentUserVolunteerInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateVolunteerForCurrentUser
// ====================================================

export interface CreateVolunteerForCurrentUser_createVolunteerForCurrentUser {
  __typename: "Volunteer";
  id: string;
}

export interface CreateVolunteerForCurrentUser {
  createVolunteerForCurrentUser: CreateVolunteerForCurrentUser_createVolunteerForCurrentUser;
}

export interface CreateVolunteerForCurrentUserVariables {
  input: CurrentUserVolunteerInput;
}
