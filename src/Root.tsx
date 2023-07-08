import { AuthenticatedApp } from './AuthenticatedApp';
import { TOKEN_KEY } from './contstants';
import { Authentication } from './pages/Authentication';

export const Root = () => {
  const isLogin = localStorage.getItem(TOKEN_KEY) !== null;
  return <>{isLogin ? <AuthenticatedApp /> : <Authentication />}</>;
};
