import { ReactNode } from 'react';
import { styled } from 'styled-components';

interface Props {
  children: ReactNode[];
}

const WrapperComponent = styled.div`
  background-color: #dcd6d8;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Layout: React.FC<Props> = ({ children }) => {
  return <WrapperComponent>{...children}</WrapperComponent>;
};

export default Layout;
