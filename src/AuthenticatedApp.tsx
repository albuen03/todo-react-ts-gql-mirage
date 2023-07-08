import { useQuery } from '@apollo/client';
import { GET_TODOS } from './graphql/queries/todo';

export const AuthenticatedApp = () => {
  const { loading, error, data } = useQuery(GET_TODOS, {
    variables: {}
  });

  console.log('loading: ', loading);
  console.log('error: ', error);
  console.log('data: ', data);

  return <div>AuthenticatedApp</div>;
};
