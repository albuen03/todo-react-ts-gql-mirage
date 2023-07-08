import { gql } from '@apollo/client';

export const GET_TOKEN = gql`
  mutation GetToken($email: String!, $password: String!) {
    token(email: $email, password: $password)
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
    }
  }
`;
