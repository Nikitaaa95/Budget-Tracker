import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
query Profiles {
  profiles {
    _id
    name
    email
    password
    income {
      _id
      label
      amount
    }
  }
}
`;

export const QUERY_SINGLE_PROFILE = gql`
query Profile($profileId: ID!) {
  profile(profileId: $profileId) {
    _id
    name
    email
    password
    income {
      _id
      label
      amount
    }
  }
}
`;

export const QUERY_ME = gql`
query Me {
  me {
    _id
    name
    email
    income {
      _id
      label
      amount
    }
  }
}`;
