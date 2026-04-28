import { useSimulation } from "@/context/SimulationContext";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

import { HealthScoreCard } from "@/components/dashboard/HealthScoreCard";
import { StatCards } from "@/components/dashboard/StatCards";
import { LiveRiskFeed } from "@/components/dashboard/LiveRiskFeed";
import { PredictionAnalytics } from "@/components/dashboard/PredictionAnalytics";
import { InventoryWarnings } from "@/components/dashboard/InventoryWarnings";
import { SupplierReliability } from "@/components/dashboard/SupplierReliability";
import { ShipmentMap } from "@/components/dashboard/ShipmentMap";
import { ActiveShipmentsTable } from "@/components/dashboard/ActiveShipmentsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const { 
    healthScore, 
    activeShipments, 
    delayedShipments, 
    atRiskShipments, 
    alerts, 
    shipments,
    triggerDisruption 
  } = useSimulation();

  return (
    <div className="space-y-6 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Supply Chain Overview</h1>
          <p className="text-muted-foreground">Monitor real-time shipment health and predict disruptions.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={triggerDisruption} 
            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
          >
            <ShieldAlert className="mr-2 h-4 w-4" /> Simulate Disruption
          </Button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <HealthScoreCard healthScore={healthScore} />
        <StatCards 
          activeShipments={activeShipments} 
          delayedShipments={delayedShipments} 
          atRiskShipments={atRiskShipments} 
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-full overflow-hidden flex flex-col">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-primary hidden" />
                Global Operations Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 min-h-[300px] relative z-0">
              <ShipmentMap shipments={shipments} />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <PredictionAnalytics />
        </div>
      </div>

      {/* Bottom Information Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <LiveRiskFeed alerts={alerts} />
        <InventoryWarnings />
        <SupplierReliability />
      </div>

      {/* Active Shipments Table */}
      <ActiveShipmentsTable shipments={shipments} />
    </div>
  );
}
