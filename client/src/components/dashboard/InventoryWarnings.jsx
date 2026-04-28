import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export function InventoryWarnings() {
  const warehouses = [
    { name: "Whse B (LA)", stock: 35, warning: "Critical: 2 days left" },
    { name: "Whse D (TEX)", stock: 65, warning: "Low buffer stock" },
    { name: "Whse A (NY)", stock: 85, warning: "Healthy" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Inventory Shortage Warnings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {warehouses.map((wh) => (
            <div key={wh.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{wh.name}</span>
                <span className={wh.stock < 50 ? "text-destructive font-semibold" : "text-muted-foreground"}>{wh.warning}</span>
              </div>
              <Progress value={wh.stock} className="h-2" indicatorColor={wh.stock < 50 ? "bg-destructive" : wh.stock < 75 ? "bg-amber-500" : "bg-emerald-500"} />
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
