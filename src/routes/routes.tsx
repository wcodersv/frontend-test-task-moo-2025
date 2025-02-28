import {createBrowserRouter} from "react-router-dom";
import App from "../app/App";
// import ErrorPage from "../pages/ErrorPage";
import { SignIn} from "../pages/sign-in";
import {AboutUs} from "../pages/about-us";
import {Profile} from "../pages/profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      { path: "", element: <AboutUs /> },
      { path: "profile", element: <Profile /> },
      { path: "sign-in", element: <SignIn /> },
    ]
  },
]);