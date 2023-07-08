import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';
import AuthenticationPage from './pages/AuthenticationPage';
import TodoListPage from './pages/TodoListPage';
import PrivateRoutes from './utils/PrivateRoutes';

export const Root: React.FC<{}> = () => (
  <Router>
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<TodoListPage />} path={routes.todoList} />
      </Route>
      <Route element={<AuthenticationPage />} path={routes.authentication} />
    </Routes>
  </Router>
);
