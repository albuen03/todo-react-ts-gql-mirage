import { Input, InputProps, InputRef } from 'antd';
import Group from 'antd/es/input/Group';
import Password from 'antd/es/input/Password';
import Search from 'antd/es/input/Search';
import TextArea from 'antd/es/input/TextArea';
import { styled } from 'styled-components';

type InputFieldProps = React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<InputRef>
> & {
  Group: typeof Group;
  Search: typeof Search;
  TextArea: typeof TextArea;
  Password: typeof Password;
};

const Circle = styled.div<{ size: number }>`
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid #df2060;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  width: ${(props) => props.size}px;
`;

const InputField = ({ ...restprops }: InputFieldProps) => {
  return <Input prefix={<Circle size={12} />} {...restprops} />;
};

export default InputField;
