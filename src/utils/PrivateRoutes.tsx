import { Outlet, Navigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import routes from '../routes';
import { TOKEN_KEY } from '../contstants';

const PrivateRoutes = () => {
  console.log('localStorage.getItem(TOKEN_KEY): ', localStorage.getItem(TOKEN_KEY));
  const isLogin = !isEmpty(localStorage.getItem(TOKEN_KEY));
  console.log('typeof ', typeof localStorage.getItem(TOKEN_KEY));
  console.log('PrivateRoutes: ', isEmpty(localStorage.getItem(TOKEN_KEY)));
  return isLogin ? <Outlet /> : <Navigate to={routes.authentication} />;
};

export default PrivateRoutes;
