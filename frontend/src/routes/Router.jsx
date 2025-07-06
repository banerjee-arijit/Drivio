import { createBrowserRouter } from "react-router-dom";
import Homepage from "./../pages/Homepage";
import UserLoginpage from "./../pages/UserLoginpage";
import UserSignUppage from "./../pages/UserSignUppage";
import DriverLoginPage from "./../pages/DriverLoginPage";
import DriverSignUpPage from "@/pages/DriverSignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    // exact: true,
  },
  {
    path: "/login",
    element: <UserLoginpage />,
    exact: true,
  },
  {
    path: "/signup",
    element: <UserSignUppage />,
    exact: true,
  },
  {
    path: "/driver/login",
    element: <DriverLoginPage />,
    exact: true,
  },
  {
    path: "/driver/signup",
    element: <DriverSignUpPage />,
    exact: true,
  },
  {
    path: "*",
    element: <h1>Page Not Found</h1>,
    status: 404,
    exact: true,
  },
]);

export default router;
