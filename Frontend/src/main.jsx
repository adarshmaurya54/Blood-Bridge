import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import './index.css';
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { createBrowserRouter } from 'react-router-dom'; // Import createBrowserRouter

// Import your components
import Layout from './components/shared/Layout/Layout'; // Layout component
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import PageNotFound from "./pages/PageNotFound";
import Inventory from "./pages/Inventory";
import Donor from "./pages/Donor";
import Hospital from "./pages/Hospital";
import Organisation from "./pages/Organisation";
import Consumer from "./pages/Consumer";
import Donation from "./pages/Donation";
import Analytics from "./pages/Analytics";
import DonorList from "./pages/Admin/DonorList";
import HospitalList from "./pages/Admin/HospitalList";
import OrganisationList from "./pages/Admin/OrganisationList";
import Inventories from "./pages/Admin/Inventories";

// Create the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "inventory",
        element: (
          <ProtectedRoute>
            <Inventory />
          </ProtectedRoute>
        ),
      },
      {
        path: "donor",
        element: (
          <ProtectedRoute>
            <Donor />
          </ProtectedRoute>
        ),
      },
      {
        path: "hospital",
        element: (
          <ProtectedRoute>
            <Hospital />
          </ProtectedRoute>
        ),
      },
      {
        path: "organisation",
        element: (
          <ProtectedRoute>
            <Organisation />
          </ProtectedRoute>
        ),
      },
      {
        path: "consumer",
        element: (
          <ProtectedRoute>
            <Consumer />
          </ProtectedRoute>
        ),
      },
      {
        path: "donation",
        element: (
          <ProtectedRoute>
            <Donation />
          </ProtectedRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        ),
      },
      {
        path: "donor-list",
        element: (
          <ProtectedRoute>
            <DonorList />
          </ProtectedRoute>
        ),
      },
      {
        path: "hospital-list",
        element: (
          <ProtectedRoute>
            <HospitalList />
          </ProtectedRoute>
        ),
      },
      {
        path: "organisation-list",
        element: (
          <ProtectedRoute>
            <OrganisationList />
          </ProtectedRoute>
        ),
      },
      {
        path: "inventories",
        element: (
          <ProtectedRoute>
            <Inventories />
          </ProtectedRoute>
        ),
      },
    ],
  },
  // Public routes
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  // Catch-all route for 404
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
