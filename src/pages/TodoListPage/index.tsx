import { Col, Row } from 'antd';
import Layout from '../../components/Layout';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TODO } from '../../graphql/mutations/todo';
import { GET_TODOS } from '../../graphql/queries/todo';
import TodoList from './TodoList';

const TodoListPage: React.FC<{}> = () => {
  const [todo, setTodo] = useState<any>('');
  const [createTodo, { data: createTodoData, error: createTodoError }] = useMutation(CREATE_TODO);
  const { data: todosData, refetch } = useQuery(GET_TODOS);

  const handleCreateTodo = () => {
    createTodo({ variables: { content: todo } });
  };

  useEffect(() => {
    if (createTodoData && !createTodoError) {
      setTodo('');
      refetch();
    }
  }, [createTodoData]);

  return (
    <Layout>
      <Col>
        <>My Todos</>
        <InputField
          placeholder="Create a todo ..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Row
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}
        >
          <Col span={12}>
            <InputField placeholder="search todos ..." />
          </Col>
          <Col span={12} style={{ alignItems: 'center' }}>
            <Row style={{ justifyContent: 'flex-end' }}>
              <Button label="Log in" />
              <Button label="Create" primary={+true} onClick={handleCreateTodo} />
            </Row>
          </Col>
        </Row>
        <TodoList todos={todosData?.userTodos} />
      </Col>
      <>sdasd</>
    </Layout>
  );
};

export default TodoListPage;
