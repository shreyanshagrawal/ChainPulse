import { useSimulation } from "@/context/SimulationContext";
import { AlertCard } from "@/components/alerts/AlertCard";
import { AnimatePresence } from "framer-motion";
import { BellRing } from "lucide-react";

export default function Alerts() {
  const { alerts, markAsRead } = useSimulation();

  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <BellRing className="h-8 w-8 text-primary" />
            Operational Alerts
            {unreadCount > 0 && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-muted-foreground mt-1">Real-time notifications and AI-detected anomalies.</p>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {alerts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
              No alerts to display. All systems nominal.
            </div>
          ) : (
            alerts.map(alert => (
              <AlertCard key={alert.id} alert={alert} onMarkAsRead={markAsRead} />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
