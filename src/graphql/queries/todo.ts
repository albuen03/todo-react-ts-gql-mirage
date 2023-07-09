import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query GetTodos($search: String, $sortByCreatedDate: String) {
    userTodos(search: $search, sortByCreatedDate: $sortByCreatedDate) {
      id
      content
      status
    }
  }
`;
