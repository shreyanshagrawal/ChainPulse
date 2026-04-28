import { useParams, Link } from "react-router-dom";
import { useSimulation } from "@/context/SimulationContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

import { ShipmentOverview } from "@/components/shipments/ShipmentOverview";
import { DelayPrediction } from "@/components/shipments/DelayPrediction";
import { RiskFactors } from "@/components/shipments/RiskFactors";
import { ShipmentTimeline } from "@/components/shipments/ShipmentTimeline";
import { RecommendedActions } from "@/components/shipments/RecommendedActions";

export default function ShipmentDetails() {
  const { id } = useParams();
  const { shipments } = useSimulation();

  // Find the shipment or use a fallback if directly navigated
  const shipment = shipments.find(s => s.id === id) || {
    id,
    source: "Unknown",
    destination: "Unknown",
    status: "Unknown",
    risk: "Medium",
    delayProbability: 50,
    eta: "Pending"
  };

  const isCritical = shipment.risk === "Critical" || shipment.delayProbability > 75;

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center gap-4 border-b pb-4">
        <Button variant="ghost" size="icon" className="hover:bg-secondary/80 rounded-full" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            Shipment {id}
            {isCritical && <span className="flex h-3 w-3 rounded-full bg-destructive animate-pulse"></span>}
          </h1>
          <p className="text-muted-foreground">Detailed timeline, intelligence, and risk analysis.</p>
        </div>
      </div>
      
      {/* Top Row: Overview, Delay Prob, Risk Factors */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ShipmentOverview shipment={shipment} />
        <DelayPrediction delayProbability={shipment.delayProbability} />
        <RiskFactors riskLevel={shipment.risk} />
      </div>

      {/* Bottom Row: Timeline and Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <ShipmentTimeline isCritical={isCritical} />
        <div className="lg:col-span-1">
          <RecommendedActions isCritical={isCritical} />
        </div>
      </div>
    </div>
  );
}
