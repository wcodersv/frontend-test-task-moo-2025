import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { App } from '../app/App';
import { SignIn } from '../pages/sign-in';
import { AboutUs } from '../pages/about-us';
import { Profile } from '../pages/profile';
import { ProtectedRoute } from './protected-route-component';

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <AboutUs /> },
      {
        path: 'profile',
        element: <ProtectedRoute element={<Profile />} />,
      },
      { path: "sign-in", element: <SignIn /> },
    ],
  },
];

export const router = createBrowserRouter(routes);