import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { App } from '../app/App';
import { AboutUs } from '../pages/about-us';
import { Profile } from '../pages/profile';
import { ProtectedRoute } from './protected-route.component';
import { SignInRedirect } from './sign-in-redirect.component';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <App />,
    children: [
      { path: '', element: <AboutUs /> },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      { path: 'sign-in', element: <SignInRedirect /> }
    ]
  }
];

export const router = createBrowserRouter(routes);