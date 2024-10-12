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
