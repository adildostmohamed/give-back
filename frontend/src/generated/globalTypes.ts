/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ListingCategory {
  ADMIN = "ADMIN",
  CONSULTING = "CONSULTING",
  DATA = "DATA",
  DESIGN = "DESIGN",
  OTHER = "OTHER",
  TECHNOLOGY = "TECHNOLOGY",
}

export enum ListingStatus {
  COMPLETED = "COMPLETED",
  FILLED = "FILLED",
  OPEN = "OPEN",
  PAUSED = "PAUSED",
  REMOVED = "REMOVED",
}

export enum ProfileType {
  ADMIN = "ADMIN",
  ORGANISATION = "ORGANISATION",
  VOLUNTEER = "VOLUNTEER",
}

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface CurrentUserVolunteerInput {
  interests: (ListingCategory | null)[];
}

export interface ListingFilterInput {
  category?: (string | null)[] | null;
  status?: (string | null)[] | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface NewListingInput {
  title: string;
  description: string;
  category: ListingCategory[];
  status?: ListingStatus | null;
}

export interface NewOrganisationInput {
  name: string;
  contactEmail: string;
}

export interface SignupInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileType: ProfileType;
  role?: Role | null;
  organisation?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
