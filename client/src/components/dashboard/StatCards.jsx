import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Clock, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export function StatCards({ activeShipments, delayedShipments, atRiskShipments }) {
  const stats = [
    { title: "Active Shipments", value: activeShipments, icon: Package, desc: "+4% from last week", color: "text-blue-500" },
    { title: "Delayed Shipments", value: delayedShipments, icon: Clock, desc: "Requires immediate attention", color: "text-destructive" },
    { title: "At Risk Shipments", value: atRiskShipments, icon: AlertTriangle, desc: "High probability of disruption", color: "text-amber-500" }
  ];

  return (
    <>
      {stats.map((stat, i) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.desc}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </>
  );
}
