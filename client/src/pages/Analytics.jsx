import { DelayTrendsChart } from "@/components/analytics/DelayTrendsChart";
import { InventoryDepletionChart } from "@/components/analytics/InventoryDepletionChart";
import { SupplierReliabilityChart } from "@/components/analytics/SupplierReliabilityChart";
import { DisruptionFrequencyChart } from "@/components/analytics/DisruptionFrequencyChart";

export default function Analytics() {
  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Predictive Analytics</h1>
        <p className="text-muted-foreground">AI-driven forecasts and historical intelligence for your supply chain.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DelayTrendsChart />
        <InventoryDepletionChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SupplierReliabilityChart />
        <DisruptionFrequencyChart />
      </div>
    </div>
  );
}
