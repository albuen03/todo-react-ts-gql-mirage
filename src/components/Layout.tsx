import { Col } from 'antd';
import { ReactNode } from 'react';
import { styled } from 'styled-components';
import colors from '../colors';

interface Props {
  children: ReactNode[];
}

const WrapperComponent = styled.div`
  background-color: ${colors.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <WrapperComponent>
      <Col style={{ width: '500px', padding: '16px' }}>{...children}</Col>
    </WrapperComponent>
  );
};

export default Layout;
