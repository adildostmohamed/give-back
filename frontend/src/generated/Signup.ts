/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignupInput, ProfileType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Signup
// ====================================================

export interface Signup_signup_user {
  __typename: "User";
  profileType: ProfileType;
}

export interface Signup_signup {
  __typename: "AuthPayload";
  user: Signup_signup_user;
  token: string;
}

export interface Signup {
  signup: Signup_signup;
}

export interface SignupVariables {
  input: SignupInput;
}
