import { Input, InputProps } from 'antd';
import { styled } from 'styled-components';

type InputFieldProps = InputProps;

const Circle = styled.div<{ size: number }>`
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid #df2060;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  width: ${(props) => props.size}px;
`;

const InputField: React.FC<InputFieldProps> = ({ ...restprops }) => {
  return <Input prefix={<Circle size={12} />} {...restprops} />;
};

export default InputField;
