export type Todo = {
  id: string;
  status: string;
  content: string;
  __typename: string;
};

export type PaginatedTodos = {
  edges: [Todo];
  totalCount: number;
  __typename: string;
};

export type VoidFunction = () => void;
