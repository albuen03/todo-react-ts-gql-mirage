import { styled } from 'styled-components';
import colors from '../colors';

const StyledButton = styled.button`
  -webkit-appearance: button;
  -webkit-writing-mode: horizontal-tb !important;
  text-rendering: auto;
  letter-spacing: normal;
  display: inline-block;
  text-align: center;
  align-items: flex-start;
  cursor: default;
  box-sizing: border-box;
  margin: 0em;
  font: 400 16px helvetica;
  padding: 0px;
  border-width: 0px;
  line-height: 19px;
  color: ${colors.fontGray};
`;

export default StyledButton;
