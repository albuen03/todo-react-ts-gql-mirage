import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query GetTodos {
    userTodos {
      id
      content
      status
    }
  }
`;
