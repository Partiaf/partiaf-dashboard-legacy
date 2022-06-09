import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation signup(
    $name: String
    $type: String
    $nit: String
    $email: String!
    $password: String!
    $mobile: String
    $employes: String
    $address: String
  ) {
    signup(
      name: $name
      type: $type
      nit: $nit
      email: $email
      password: $password
      mobile: $mobile
      employes: $employes
      address: $address
    )
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      name
      lastname
      email
      identification
      age
      mobile
      address
      token
    }
  }
`;
