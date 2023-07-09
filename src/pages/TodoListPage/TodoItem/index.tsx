import { Col, Row } from 'antd';
import { Todo } from '../../../types/global';
import { styled } from 'styled-components';
import colors from '../../../colors';
import { todoStatuses } from '../../../constants';
import TextButton from '../../../components/TextButton';
import { useMutation } from '@apollo/client';
import { DELETE_TODO, UPDATE_TODO } from '../../../graphql/mutations/todo';
import { GET_TODOS } from '../../../graphql/queries/todo';

interface Props {
  todo: Todo;
}

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ background: string }>`
  display: inline-block;
  width: 14px;
  height: 14px;
  background: ${(props) => props.background};
  border: 2px solid ${colors.red};
  border-radius: 50%;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: ${colors.offWhite};
  stroke-width: 4px;
`;

const CheckboxIndicator = ({ className, defaultChecked, ...props }: any) => {
  const background = defaultChecked ? colors.red : colors.offWhite;
  return (
    <CheckboxContainer className={className}>
      <HiddenCheckbox background={background} {...props} />
      <StyledCheckbox background={background}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 8 10 16 4 10" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  );
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const isDone = todo.status === todoStatuses.DONE;
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [GET_TODOS]
  });

  const handleUpdateStatus = () => {
    const status = todo.status === todoStatuses.TODO ? todoStatuses.DONE : todoStatuses.TODO;
    updateTodo({ variables: { todo: { status, id: todo.id } } });
  };

  const handleDelete = () => {
    deleteTodo({ variables: { id: todo.id } });
  };

  return (
    <Row style={{ width: '100%' }}>
      <Col span={14}>
        <Row style={{ alignItems: 'center', border: '1px solid black' }}>
          <CheckboxIndicator className="sample" defaultChecked={+isDone} />
          <span
            style={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '19px',
              color: colors.fontBlack,
              fontFamily: 'helvetica',
              marginLeft: '4px'
            }}
          >
            {todo.content}
          </span>
        </Row>
      </Col>
      <Col span={10}>
        <Row style={{ alignItems: 'center', border: '1px solid black', padding: 0 }}>
          {!isDone && <TextButton onClick={handleUpdateStatus}>Done</TextButton>}
          {isDone && (
            <>
              <TextButton onClick={() => console.log('asdasd')}>Edit</TextButton>
              <TextButton onClick={handleDelete}>Remove</TextButton>
            </>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default TodoItem;
