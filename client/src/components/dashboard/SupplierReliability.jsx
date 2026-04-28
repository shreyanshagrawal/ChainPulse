import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export function SupplierReliability() {
  const suppliers = [
    { name: "Alpha Logistics", score: 98, status: "Excellent" },
    { name: "Metro Supply Co.", score: 82, status: "Good" },
    { name: "North Freight", score: 45, status: "Critical" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Supplier Reliability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suppliers.map((sup) => (
              <div key={sup.name} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{sup.name}</p>
                  <p className="text-xs text-muted-foreground">Score: {sup.score}/100</p>
                </div>
                <Badge variant={sup.score > 90 ? "outline" : sup.score > 70 ? "secondary" : "destructive"} className={sup.score > 90 ? "text-emerald-500 border-emerald-500" : ""}>
                  {sup.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
