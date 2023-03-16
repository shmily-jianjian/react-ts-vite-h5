import { useLayoutEffect } from 'react';
import {
  Route,
  Routes,
  unstable_HistoryRouter as Router,
} from 'react-router-dom';
import { routesConfig } from '@/routes';
import type { RouteType } from './routes';
import KeepAlive from '@/components/KeepAlive';
import { useStore } from '@/store';
import Permission from '@/components/Permission';
import ErrorBoundary from '@/components/ErrorBoundary';
import { customHistory } from './utils/history';

const App = () => {
  const { requestUserInfo } = useStore();
  useLayoutEffect(() => {
    requestUserInfo();
  }, []);

  const renderRoutes = (routes: RouteType[]) => {
    return routes.map((item, index) => {
      if (item.element) {
        return (
          <Route
            key={index}
            path={item.path}
            element={
              ['*', '/'].includes(item.path!) ? (
                item.element
              ) : (
                <Permission code={item.code}>{item.element}</Permission>
              )
            }
          >
            {item.children ? renderRoutes(item.children) : null}
          </Route>
        );
      }
    });
  };

  return (
    <ErrorBoundary>
      <KeepAlive keepalive={['/list']}>
        <Router history={customHistory} basename="/">
          <Routes>{renderRoutes(routesConfig)}</Routes>
        </Router>
      </KeepAlive>
    </ErrorBoundary>
  );
};

export default App;
