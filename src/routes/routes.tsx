import {createBrowserRouter} from "react-router-dom";
import App from "../app/App";
import { SignIn} from "../pages/sign-in";
import {AboutUs} from "../pages/about-us";
import {Profile} from "../pages/profile";
import { ProtectedRoute } from './protected-route-component';

export const router = createBrowserRouter([
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
    ]
  },
]);