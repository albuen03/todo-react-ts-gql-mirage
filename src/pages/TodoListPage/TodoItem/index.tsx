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
  width: 16px;
  height: 16px;
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

const ContentText = styled.span<{ isDone: number }>`
  font: 400 16px Helvetica Neue;
  line-height: '19px';
  color: ${(props) => (props.isDone ? colors.fontGray : colors.fontBlack)};
  text-decoration: ${(props) => (props.isDone ? 'line-through' : '')};
`;

const CheckboxIndicator: React.FC<any> = ({ className, defaultChecked, ...props }) => {
  const background: string = defaultChecked ? colors.red : colors.offWhite;
  return (
    <CheckboxContainer className={className} style={{ marginRight: '6px' }}>
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
  const isDone: boolean = todo.status === todoStatuses.DONE;
  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [GET_TODOS]
  });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [GET_TODOS]
  });

  const handleUpdateStatus: VoidFunction = () => {
    const status = todo.status === todoStatuses.TODO ? todoStatuses.DONE : todoStatuses.TODO;
    updateTodo({ variables: { todo: { status, id: todo.id } } });
  };

  const handleDelete: VoidFunction = () => {
    deleteTodo({ variables: { id: todo.id } });
  };

  return (
    <Row style={{ width: '100%', alignItems: 'center' }}>
      <Col span={14}>
        <Row style={{ alignItems: 'center', padding: '5px 0px' }}>
          <Col span={3}>
            <CheckboxIndicator defaultChecked={+isDone} />
          </Col>
          <Col span={20}>
            <ContentText isDone={+isDone}>{todo.content}</ContentText>
          </Col>
        </Row>
      </Col>
      <Col span={10}>
        <Row style={{ alignItems: 'center', justifyContent: 'flex-end', padding: '5px 0px' }}>
          <TextButton
            color={colors.red}
            onClick={() => console.log('asdasd')}
            style={{ marginRight: '10px' }}
          >
            Edit
          </TextButton>
          {!isDone && (
            <TextButton color={colors.fontGray} onClick={handleUpdateStatus}>
              Done
            </TextButton>
          )}
          {isDone && (
            <TextButton color={colors.fontGray} onClick={handleDelete}>
              Remove
            </TextButton>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default TodoItem;
