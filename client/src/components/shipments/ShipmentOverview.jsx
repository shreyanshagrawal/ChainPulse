import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, Navigation, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export function ShipmentOverview({ shipment }) {
  if (!shipment) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Shipment Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Carrier</p>
                <p className="font-semibold">Oceanic Freight Ltd.</p>
              </div>
            </div>
            <Badge variant={shipment.status === "Delayed" || shipment.status === "At Risk" ? "destructive" : "secondary"} className="text-sm px-3 py-1">
              {shipment.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" /> Source</p>
              <p className="font-semibold text-base">{shipment.source}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground flex items-center gap-2"><Navigation className="h-4 w-4" /> Destination</p>
              <p className="font-semibold text-base">{shipment.destination}</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground flex items-center gap-2 mb-1"><Calendar className="h-4 w-4" /> Predicted ETA</p>
            <p className={`text-xl font-bold ${shipment.risk === "Critical" ? "text-destructive" : ""}`}>{shipment.eta}</p>
            {shipment.risk === "Critical" && (
              <p className="text-sm text-destructive mt-1">Originally scheduled for 2 days ago.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
