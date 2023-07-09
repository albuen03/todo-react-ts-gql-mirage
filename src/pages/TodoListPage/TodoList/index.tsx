import { styled } from 'styled-components';
import { PaginatedTodos, Todo } from '../../../types/global';
import colors from '../../../colors';
import TodoItem from '../TodoItem';
import { Pagination, Row } from 'antd';

interface Props {
  currentPage: number;
  todos: PaginatedTodos;
  handleChangePage: (value: number) => void;
}

const Card = styled.div`
  width: 100%;
  border-radius: 16px;
  background-color: ${colors.offWhite};
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TodoList: React.FC<Props> = ({ todos, handleChangePage, currentPage }) => {
  console.log('todos: ', todos);
  const todosData = todos?.edges;
  const showList = todosData && todosData.length > 0;
  return (
    <Card>
      {!showList && (
        <Row style={{ width: '50%' }}>You have no todo now. Did you just get everything done?</Row>
      )}
      {showList && todosData.map((item: Todo) => <TodoItem todo={item} key={item.id} />)}
      {showList && (
        <Pagination
          defaultCurrent={currentPage}
          total={todos.totalCount}
          size="small"
          showSizeChanger={false}
          onChange={(value) => handleChangePage(value)}
          pageSize={5}
        />
      )}
    </Card>
  );
};

export default TodoList;
