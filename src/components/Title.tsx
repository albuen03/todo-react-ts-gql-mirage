import { styled } from 'styled-components';
import colors from '../colors';

const Title = styled.span`
  text-rendering: auto;
  letter-spacing: normal;
  align-items: flex-start;
  cursor: default;
  font: 700 16px Helvetica Neue;
  padding: 0px;
  line-height: 19px;
  color: ${colors.fontBlack};
`;

export default Title;
