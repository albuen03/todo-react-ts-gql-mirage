import { styled } from 'styled-components';
import { PaginatedTodos, Todo } from '../../../types/global';
import colors from '../../../colors';
import TodoItem from '../TodoItem';
import { Col, Pagination } from 'antd';

interface Props {
  currentPage: number;
  todos: PaginatedTodos;
  handleChangePage: (value: number) => void;
}

const Card = styled.div`
  border-radius: 16px;
  background-color: ${colors.offWhite};
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledParagraph = styled.p`
  margin: 0px;
  color: ${colors.fontGray};
  font: 400 16px Helvetica Neue;
`;

const TodoList: React.FC<Props> = ({ todos, handleChangePage, currentPage }) => {
  const todosData: Todo[] = todos?.edges;
  const showList: boolean = todosData && todosData.length > 0;
  return (
    <Card>
      {!showList && (
        <Col style={{ width: '70%', textAlign: 'center' }}>
          <StyledParagraph>You have no todo now.</StyledParagraph>
          <StyledParagraph>Did you just get everything done?</StyledParagraph>
        </Col>
      )}
      {showList && todosData.map((item: Todo) => <TodoItem todo={item} key={item.id} />)}
      {showList && (
        <Pagination
          responsive
          style={{ marginTop: '15px' }}
          defaultCurrent={currentPage}
          total={todos.totalCount}
          showSizeChanger={false}
          onChange={(value: any) => handleChangePage(value)}
          pageSize={5}
        />
      )}
    </Card>
  );
};

export default TodoList;
