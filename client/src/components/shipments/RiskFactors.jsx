import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CloudRain, Truck, AlertTriangle, Building } from "lucide-react";
import { motion } from "framer-motion";

export function RiskFactors({ riskLevel }) {
  const isCritical = riskLevel === "Critical";

  const factors = isCritical ? [
    { name: "Severe Flooding", impact: "High", icon: CloudRain, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Port Congestion", impact: "High", icon: Building, color: "text-amber-500", bg: "bg-amber-500/10" },
    { name: "Local Traffic", impact: "Medium", icon: Truck, color: "text-orange-500", bg: "bg-orange-500/10" },
  ] : [
    { name: "Customs Delay", impact: "Low", icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { name: "Light Traffic", impact: "Low", icon: Truck, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="h-full">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg">External Risk Factors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {factors.map((factor, index) => (
            <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md ${factor.bg} ${factor.color}`}>
                  <factor.icon className="h-4 w-4" />
                </div>
                <span className="font-medium text-sm">{factor.name}</span>
              </div>
              <Badge variant={factor.impact === "High" ? "destructive" : factor.impact === "Medium" ? "secondary" : "outline"}>
                {factor.impact} Impact
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
