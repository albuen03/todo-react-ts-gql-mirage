import { gql } from '@apollo/client';

export const CREATE_TODO = gql`
  mutation CreateTodo($content: String!) {
    createTodo(content: $content) {
      id
      content
      status
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($todo: TodoInput!) {
    updateTodo(todo: $todo) {
      id
      content
      status
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
