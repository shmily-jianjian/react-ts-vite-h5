import { lazy, Suspense } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import ErrorBoundary from '@/components/ErrorBoundary';
import Layout from '@/pages/layout';

// TODO 增加路由权限控制
const Home = lazy(() => import('@/pages/home'));
const List = lazy(() => import('@/pages/list'));
const Error = lazy(() => import('@/pages/error'));
const NoFind = lazy(() => import('@/pages/noFind'));
const NoPermission = lazy(() => import('@/pages/noPermission'));

const lazyLoad = (Component: any) => {
  return (
    <Suspense fallback={<div>页面加载中...</div>}>
      <Component />
    </Suspense>
  );
};

export type RouteOther = {
  // 用来判断权限， 可以自己去定义
  code?: string;
  children?: RouteType[];
};

export type RouteType = RouteObject & RouteOther;

// errorElement  loader 只能作用在 createBrowserRouter！！！！！

export const routesConfig: RouteType[] = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/home',
        element: lazyLoad(Home),
        code: 'home',
      },
      {
        path: '/list',
        code: 'list',
        element: lazyLoad(List),
      },
      {
        path: '/error',
        element: lazyLoad(Error),
      },
      {
        path: '/403',
        element: lazyLoad(NoPermission),
      },
      {
        path: '/404',
        element: lazyLoad(NoFind),
      },
    ],
  },
  {
    path: '*',
    element: lazyLoad(NoFind),
  },
];

// export const routes = createBrowserRouter(routesConfig);
