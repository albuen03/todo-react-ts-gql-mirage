import { styled } from 'styled-components';
import { Todo } from '../../../types/global';
import colors from '../../../colors';
import TodoItem from '../TodoItem';
import { Row } from 'antd';

interface Props {
  todos: Todo[];
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

const TodoList: React.FC<Props> = ({ todos }) => {
  console.log('TodoList: ', todos);
  const showList = todos && todos.length > 0;
  return (
    <Card>
      {!showList && (
        <Row style={{ width: '50%' }}>You have no todo now. Did you just get everything done?</Row>
      )}
      {showList && todos.map((item: Todo) => <TodoItem todo={item} key={item.id} />)}
    </Card>
  );
};

export default TodoList;
