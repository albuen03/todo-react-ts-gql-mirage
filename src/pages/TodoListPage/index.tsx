import { Col, Row, Select } from 'antd';
import Layout from '../../components/Layout';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TODO } from '../../graphql/mutations/todo';
import { GET_TODOS } from '../../graphql/queries/todo';
import TodoList from './TodoList';
import Title from '../../components/Title';

const TodoListPage: React.FC<{}> = () => {
  const [todo, setTodo] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortByCreatedDate, setSortByCreatedDate] = useState<string | null>(null);
  const [createTodo, { data: createTodoData, error: createTodoError }] = useMutation(CREATE_TODO);
  const { data: todosData, refetch } = useQuery(GET_TODOS, {
    variables: {
      search,
      sortByCreatedDate,
      page: currentPage
    },
    fetchPolicy: 'cache-and-network'
  });

  const handleCreateTodo: VoidFunction = () => {
    createTodo({ variables: { content: todo } });
  };

  const handleSearch: VoidFunction = () => {
    refetch({
      search,
      sortByCreatedDate,
      page: currentPage
    });
  };

  const handleFilter: (value: string) => void = (value) => {
    setSortByCreatedDate(value);
    refetch({
      search,
      sortByCreatedDate: value,
      page: currentPage
    });
  };

  const handleChangePage: (value: number) => void = (value) => {
    setCurrentPage(value);
    refetch({
      search,
      sortByCreatedDate,
      page: value
    });
  };

  useEffect(() => {
    if (createTodoData && !createTodoError) {
      setTodo('');
      refetch({
        search,
        sortByCreatedDate,
        page: currentPage
      });
    }
  }, [createTodoData]);

  return (
    <Layout>
      <Title>My Todos</Title>
      <InputField
        style={{ marginTop: '8px' }}
        placeholder="Create a todo ..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <Row
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginTop: '8px'
        }}
      >
        <Col span={15}>
          <InputField placeholder="Search todos ..." onChange={(e) => setSearch(e.target.value)} />
        </Col>
        <Col span={9} style={{ alignItems: 'center' }}>
          <Row
            style={{
              justifyContent: 'space-between',
              alignItems: 'space-evenly',
              paddingLeft: '10px'
            }}
          >
            <Col span={12}>
              <Button label="Search" onClick={handleSearch} />
            </Col>
            <Col span={12}>
              <Button label="Create" primary={+true} onClick={handleCreateTodo} />
            </Col>
          </Row>
        </Col>
      </Row>
      <Select
        style={{ width: '120px', marginTop: '8px', marginBottom: '8px' }}
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
      <TodoList
        todos={todosData?.userTodos}
        currentPage={currentPage}
        handleChangePage={handleChangePage}
      />
    </Layout>
  );
};

export default TodoListPage;
