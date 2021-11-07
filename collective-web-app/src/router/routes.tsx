import { Suspense, lazy } from 'react';
import LoadingScreen from '../components/LoadingScreen';

const Loadable = (Component) => (props) => (
    <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
    </Suspense>
);

const HomePage = Loadable(lazy(() => import('../pages/Homepage')));


const routes = [
    {
        element: <HomePage />, path: '/',
    },
];

export default routes;
