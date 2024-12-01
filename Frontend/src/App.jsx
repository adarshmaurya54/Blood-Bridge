import { Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout/Layout"; // Import your Layout component
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Define a route for the layout */}
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="inventory"
            element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            }
          />
          <Route
            path="donor"
            element={
              <ProtectedRoute>
                <Donor />
              </ProtectedRoute>
            }
          />
          <Route
            path="hospital"
            element={
              <ProtectedRoute>
                <Hospital />
              </ProtectedRoute>
            }
          />
          <Route
            path="organisation"
            element={
              <ProtectedRoute>
                <Organisation />
              </ProtectedRoute>
            }
          />
          <Route
            path="consumer"
            element={
              <ProtectedRoute>
                <Consumer />
              </ProtectedRoute>
            }
          />
          <Route
            path="donation"
            element={
              <ProtectedRoute>
                <Donation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donor-list"
            element={
              <ProtectedRoute>
                <DonorList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hospital-list"
            element={
              <ProtectedRoute>
                <HospitalList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organisation-list"
            element={
              <ProtectedRoute>
                <OrganisationList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventories"
            element={
              <ProtectedRoute>
                <Inventories />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Public routes outside the layout */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
