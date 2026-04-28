import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Shipments from "./pages/Shipments";
import ShipmentDetails from "./pages/ShipmentDetails";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import Builder from "./pages/Builder";
import Settings from "./pages/Settings";
import { SimulationProvider } from "./context/SimulationContext";

// Public (onboarding) pages
import Landing from "./pages/onboarding/Landing";
import Auth from "./pages/onboarding/Auth";
import Onboarding from "./pages/onboarding/Onboarding";

/** Redirects to /signin if user is not authenticated */
function ProtectedRoute({ children }) {
  const user = localStorage.getItem("chainpulse_user");
  if (!user) return <Navigate to="/signin" replace />;
  return children;
}

function App() {
  return (
    <SimulationProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Public routes (no AppLayout) ── */}
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Auth mode="signin" />} />
          <Route path="/signup" element={<Auth mode="signup" />} />
          <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />

          {/* ── Protected app routes (with AppLayout) ── */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
          </Route>

          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="shipments" element={<Shipments />} />
            <Route path="shipments/:id" element={<ShipmentDetails />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="builder" element={<Builder />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Legacy /shipments etc. routes kept working */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="shipments" element={<Shipments />} />
            <Route path="shipments/:id" element={<ShipmentDetails />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="builder" element={<Builder />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SimulationProvider>
  );
}

export default App;
