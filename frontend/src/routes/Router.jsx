import { createBrowserRouter } from "react-router-dom";

// 🔸 Auth Pages
import Homepage from "../pages/Homepage";
import UserLoginpage from "../pages/UserLoginpage";
import UserSignUppage from "../pages/UserSignUppage";
import DriverLoginPage from "../pages/DriverLoginPage";
import DriverSignUpPage from "../pages/DriverSignUpPage";

// 🔸 Protected Route Wrappers
import UserprotectedRoute from "../pages/UserprotectedRoute";
import DriverProtectedRoute from "../pages/DriverProtectedRoute";

// 🔸 User Dashboard & Components
import UserDashboard from "@/pages/userdarboardComponents/UserDashBoard";
import LocalSearchPanel from "@/pages/userdarboardComponents/LocalSearchpanel";
import SelectDrive from "@/pages/userdarboardComponents/SelectDrive";
import SearchingDrive from "@/pages/userdarboardComponents/SearchingDrive";
import ConfirmRide from "@/pages/userdarboardComponents/ConfirmRide";
import RidingPage from "@/pages/userdarboardComponents/RidingPage";

// 🔸 Driver Dashboard
import CaptainDashboard from "@/pages/captaindashboardcomponents/CaptainDashboard";

// 🔹 Router Configuration
const router = createBrowserRouter([
  // 🏠 Public Pages
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <UserLoginpage />,
  },
  {
    path: "/signup",
    element: <UserSignUppage />,
  },
  {
    path: "/driver/login",
    element: <DriverLoginPage />,
  },
  {
    path: "/driver/signup",
    element: <DriverSignUpPage />,
  },

  // 👤 User Protected Pages
  {
    path: "/dashboard",
    element: (
      <UserprotectedRoute>
        <UserDashboard />
      </UserprotectedRoute>
    ),
  },
  {
    path: "/search",
    element: <LocalSearchPanel />,
  },
  {
    path: "/select-drive",
    element: <SelectDrive />,
  },
  {
    path: "/searching",
    element: <SearchingDrive />,
  },
  {
    path: "/confirm",
    element: <ConfirmRide />,
  },
  {
    path: "/riding",
    element: <RidingPage />,
  },

  // 🚖 Driver Protected Pages
  {
    path: "/driver/dashboard",
    element: (
      <DriverProtectedRoute>
        <CaptainDashboard />
      </DriverProtectedRoute>
    ),
  },

  // ❌ 404 - Page Not Found
  {
    path: "*",
    element: (
      <h1 className="text-center mt-20 text-3xl font-bold text-red-600">
        404 | Page Not Found
      </h1>
    ),
  },
]);

export default router;
