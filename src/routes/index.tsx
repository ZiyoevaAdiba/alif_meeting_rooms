import { Fragment, lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router';
import { DashboardLayout } from '../layouts';
import { AuthGuard } from '../shared/components/AuthGuard';
import { LoadingScreen } from '../shared/components/LoadingScreen';
import { urls } from './urls';
import { LoginView } from '../views/pages/AuthPage';

const routesConfig = [
    {
        path: urls.authPage,
        layout: LoginView,
        routes: [
            {
                exact: true,
                path: urls.login,
                component: lazy(() => import('../shared/components/Auth/LoginForm').then(module => ({
                    default: module.LoginForm
                })))
            },
            {
                exact: true,
                path: urls.signUp,
                component: lazy(() => import('../shared/components/Auth/SignUpForm').then(module => ({
                    default: module.SignUpForm
                })))
            },
            {
                exact: true,
                path: urls.forget,
                component: lazy(() => import('../shared/components/Auth/ForgetPassword').then(module => ({
                    default: module.ForgetPasswordForm
                })))
            },
        ]
    },
    {
        path: '/',
        guard: AuthGuard,
        layout: DashboardLayout,
        routes: [
            {
                exact: true,
                path: '/',
                component: () => <Redirect to={urls.reservations} />
            },
            // {
            //     exact: true,
            //     path: '/calendar',
            //     component: lazy(() => import('../shared/components/CalendarView/CalendarPage').then(module => ({
            //         default: module.CalendarPage
            //     })))
            // },
            {
                exact: true,
                path: urls.users,
                component: lazy(() => import('../shared/components/Users/AllUsers').then(module => ({
                    default: module.AllUsers
                })))
            },
            {
                exact: true,
                path: urls.meetingRooms,
                component: lazy(() => import('../shared/components/Rooms/MeetingRooms').then(module => ({
                    default: module.MeetingRooms
                })))
            },
            {
                exact: true,
                path: urls.departments,
                component: lazy(() => import('../shared/components/Departments/Departments').then(module => ({
                    default: module.Departments
                })))
            },
            {
                exact: true,
                path: urls.cities,
                component: lazy(() => import('../shared/components/Cities/Cities').then(module => ({
                    default: module.Cities
                })))
            },
            {
                exact: true,
                path: urls.buildings,
                component: lazy(() => import('../shared/components/Buildings/Buildings').then(module => ({
                    default: module.Buildings
                })))
            },
            {
                exact: true,
                path: urls.reservations,
                component: lazy(() => import('../shared/components/Reservations/ReservationPage').then(module => ({
                    default: module.ReservationPage
                })))
            },
            {
                exact: true,
                path: urls.profile,
                component: lazy(() => import('../shared/components/UserProfile').then(module => ({
                    default: module.UserProfile
                })))
            },
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