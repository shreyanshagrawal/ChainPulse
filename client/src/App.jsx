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

function App() {
  return (
    <SimulationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
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
