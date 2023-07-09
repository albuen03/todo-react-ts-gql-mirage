import { styled } from 'styled-components';
import { Button as AntdButton, ButtonProps } from 'antd';
import colors from '../colors';

type AdditionalButtonProps = {
  label: string;
  primary?: number;
};

type Props = ButtonProps & AdditionalButtonProps;

const StyledButton = styled(AntdButton)<{ primary?: number }>`
  border-radius: 16px;
  background-color: ${(props) => (props.primary ? colors.red : colors.offWhite)};
  height: 47px;
  padding: 12px 16px;
  color: ${(props) => (props.primary ? colors.offWhite : colors.fontBlack)};
`;

const Button: React.FC<Props> = ({ label, ...restprops }) => (
  <StyledButton {...restprops}>{label}</StyledButton>
);

export default Button;
