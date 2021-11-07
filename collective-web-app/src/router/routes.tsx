import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router';
import LoadingScreen from '../components/LoadingScreen';

const Loadable = (Component) => (props) => (
    <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
    </Suspense>
);

const HomePage = Loadable(lazy(() => import('../pages/Homepage')));


const routes = [
    {
        element: <HomePage />,
        path: '/',
    },
    {
        path: '*',
        element: <HomePage />,
        children: [
            {
                path: '404',
                element: <Navigate to="/" />
            },
            {
                path: '*',
                element: <Navigate to="/" />
            }
        ]
    }
];

export default routes;
