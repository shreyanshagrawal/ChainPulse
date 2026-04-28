import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const SimulationContext = createContext();

export function useSimulation() {
  return useContext(SimulationContext);
}

export function SimulationProvider({ children }) {
  const [healthScore, setHealthScore] = useState(94);
  const [activeShipments, setActiveShipments] = useState(124);
  const [delayedShipments, setDelayedShipments] = useState(3);
  const [atRiskShipments, setAtRiskShipments] = useState(5);
  
  const [alerts, setAlerts] = useState([
    { id: 1, type: "warning", message: "Traffic congestion on Route 4A", time: "10m ago", read: false },
    { id: 2, type: "info", message: "Supplier Alpha updated ETA for S-102", time: "1h ago", read: true }
  ]);

  const markAsRead = (id) => {
    setAlerts((prev) => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const [shipments, setShipments] = useState([
    { id: "S-101", source: "Shanghai", destination: "Los Angeles", status: "In Transit", risk: "Low", delayProbability: 12, eta: "2 days" },
    { id: "S-102", source: "Berlin", destination: "London", status: "Delayed", risk: "Medium", delayProbability: 65, eta: "5 hours" },
    { id: "S-103", source: "Mumbai", destination: "New York", status: "In Transit", risk: "Low", delayProbability: 18, eta: "4 days" },
    { id: "S-104", source: "Shenzhen", destination: "Rotterdam", status: "In Transit", risk: "Low", delayProbability: 8, eta: "14 days" },
    { id: "S-105", source: "Tokyo", destination: "Seattle", status: "At Risk", risk: "Medium", delayProbability: 45, eta: "8 days" },
  ]);

  const triggerDisruption = () => {
    toast.error("Critical Disruption Detected!", {
      description: "Severe flooding reported in Mumbai region.",
      duration: 10000,
    });
    
    setHealthScore(68);
    setDelayedShipments((prev) => prev + 12);
    setAtRiskShipments((prev) => prev + 24);
    
    setAlerts((prev) => [
      { id: Date.now(), type: "critical", message: "Flooding in Mumbai severely impacting Route M-NY.", time: "Just now", read: false },
      { id: Date.now() + 1, type: "critical", message: "Inventory shortage predicted for Warehouse B in 48h.", time: "Just now", read: false },
      ...prev
    ]);

    setShipments((prev) => prev.map(s => {
      if(s.id === "S-103") return { ...s, status: "At Risk", risk: "Critical", delayProbability: 98, eta: "Unknown (+4 days)" }
      if(s.source === "Tokyo" || s.source === "Shanghai") return { ...s, delayProbability: s.delayProbability + 20, risk: "Medium" }
      return s;
    }));
  };

  const value = {
    healthScore,
    activeShipments,
    delayedShipments,
    atRiskShipments,
    alerts,
    shipments,
    triggerDisruption,
    markAsRead
  };

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
}
