import { Outlet, Navigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import routes from '../routes';
import { TOKEN_KEY } from '../contstants';

const PrivateRoutes: React.FC<{}> = () => {
  const isLogin = !isEmpty(localStorage.getItem(TOKEN_KEY));
  return isLogin ? <Outlet /> : <Navigate to={routes.authentication} />;
};

export default PrivateRoutes;
