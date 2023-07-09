import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query GetTodos($search: String, $sortByCreatedDate: String, $page: Int) {
    userTodos(search: $search, sortByCreatedDate: $sortByCreatedDate, page: $page) {
      edges {
        id
        content
        status
      }
      totalCount
    }
  }
`;
