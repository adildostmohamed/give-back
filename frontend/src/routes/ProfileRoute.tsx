import React from "react";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import ProfilePageLayout from "../components/ProfilePageLayout";

const GET_CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      _id
      volunteer {
        user {
          _id
        }
      }
    }
  }
`;

const GET_SHORTLISTED_LISTINGS = gql`
  query CurrentUserVolunteer {
    currentUserVolunteer {
      user {
        _id
        firstName
      }
      shortlistedListings {
        _id
        title
        description
      }
    }
  }
`;

const ProfileRoute = () => {
  const history = useHistory();
  const { data } = useQuery(GET_CURRENT_USER, {
    onError: () => {
      history.push("/login");
    },
  });
  const { data: shortlistData } = useQuery(GET_SHORTLISTED_LISTINGS);
  return (
    <ProfilePageLayout>
      <div>
        <pre>{JSON.stringify(data)}</pre>
        <pre>{JSON.stringify(shortlistData)}</pre>
      </div>
    </ProfilePageLayout>
  );
};

export default ProfileRoute;
