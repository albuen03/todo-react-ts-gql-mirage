import { ReactNode } from 'react';
import { styled } from 'styled-components';

interface Props {
  children: ReactNode[]
}

const WrapperComponent = styled.div`
  background-color: #dcd6d8;
  height: 800px;
`;

const Layout = ({ children }: Props) => {
  return <WrapperComponent>{...children}</WrapperComponent>;
};

export default Layout;
