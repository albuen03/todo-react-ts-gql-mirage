import { Col, Row, Select } from 'antd';
import Layout from '../../components/Layout';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TODO } from '../../graphql/mutations/todo';
import { GET_TODOS } from '../../graphql/queries/todo';
import TodoList from './TodoList';

const TodoListPage: React.FC<{}> = () => {
  const [todo, setTodo] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [sortByCreatedDate, setSortByCreatedDate] = useState<string | null>(null);
  const [createTodo, { data: createTodoData, error: createTodoError }] = useMutation(CREATE_TODO);
  const { data: todosData, refetch } = useQuery(GET_TODOS);

  const handleCreateTodo: VoidFunction = () => {
    createTodo({ variables: { content: todo } });
  };

  const handleSearch: VoidFunction  = () => {
    refetch({
      search,
      sortByCreatedDate
    });
  };

  const handleFilter: (value: string) => void = (value) => {
    setSortByCreatedDate(value);
    refetch({
      search,
      sortByCreatedDate: value
    });
  };

  useEffect(() => {
    if (createTodoData && !createTodoError) {
      setTodo('');
      refetch({
        search,
        sortByCreatedDate
      });
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
            <InputField
              placeholder="search todos ..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col span={12} style={{ alignItems: 'center' }}>
            <Row style={{ justifyContent: 'flex-end' }}>
              <Button label="Search" onClick={handleSearch} />
              <Button label="Create" primary={+true} onClick={handleCreateTodo} />
            </Row>
          </Col>
        </Row>
        <Select
          style={{ width: '120px' }}
          placeholder="Filter todos"
          onChange={(value) => handleFilter(value)}
          options={[
            {
              value: '',
              label: 'All'
            },
            {
              value: 'desc',
              label: 'Newest'
            },
            {
              value: 'asc',
              label: 'Oldest'
            }
          ]}
        />
        <TodoList todos={todosData?.userTodos} />
      </Col>
      <>sdasd</>
    </Layout>
  );
};

export default TodoListPage;
