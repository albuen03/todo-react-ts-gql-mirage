import { Input, InputProps } from 'antd';
import { styled } from 'styled-components';

type InputFieldProps = InputProps;

const StyledInput = styled(Input)`
  height: 45px;
  border-radius: 16px;
`;

const Circle = styled.div`
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid #df2060;
  height: 16px;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  width: 16px;
`;

const InputField: React.FC<InputFieldProps> = ({ ...restprops }) => {
  return <StyledInput prefix={<Circle />} {...restprops} />;
};

export default InputField;
