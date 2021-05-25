import { Fragment, lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router';
import { DashboardLayout } from '../layouts';
import { AuthGuard } from '../shared/components/AuthGuard';
import { LoadingScreen } from '../shared/components/LoadingScreen';
import { urls } from './urls';

const routesConfig = [
    {
        exact: true,
        path: `${urls.login}`,
        component: lazy(() => import('../views/pages/AuthPage').then(module => ({
            default: module.LoginView
        })))
    },
    {
        path: '/',
        guard: AuthGuard,
        layout: DashboardLayout,
        routes: [
            {
                exact: true,
                path: '/',
                component: () => <Redirect to={urls.home} />
            },
            {
                exact: true,
                path: `${urls.home}`,
                component: lazy(() => import('../shared/components/HomeView').then(module => ({
                    default: module.HomeView
                })))
            }
        ]
    }
];

const renderRoutes = (routes: any) => (routes ? (
    <Suspense fallback={<LoadingScreen />}>
        <Switch>
            {routes.map((route: any, i: number) => {

                const Guard = route.guard || Fragment;
                const Layout = route.layout || Fragment;
                const Component = route.component;

                return (
                    <Route
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        render={(props: any) => (
                            <Guard>
                                <Layout>
                                    {route.routes ? (
                                        renderRoutes(route.routes)
                                    ) : (
                                        <Component {...props} />
                                    )}
                                </Layout>
                            </Guard>
                        )}
                    />
                );
            })}
        </Switch>
    </Suspense>
) : null);

export const Routes = () => {
    return renderRoutes(routesConfig);
}