import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function ShipmentMapPlaceholder() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="lg:col-span-2">
      <Card className="h-full overflow-hidden">
        <CardHeader className="bg-muted/30 border-b">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Global Operations Map
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[300px] w-full bg-secondary/20 relative flex flex-col items-center justify-center">
            {/* Faux map background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#888_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <MapPin className="h-10 w-10 text-muted-foreground mb-3 animate-pulse" />
              <p className="text-sm text-muted-foreground font-medium">Live Map Rendering Context</p>
              <p className="text-xs text-muted-foreground mt-1 text-center max-w-[250px]">
                Shipment routing and global node connections will be visualized here.
              </p>
            </div>
            
            {/* Fake active nodes */}
            <div className="absolute top-1/4 left-1/4 h-3 w-3 rounded-full bg-primary shadow-[0_0_15px_rgba(var(--primary),0.5)] animate-ping"></div>
            <div className="absolute top-1/2 right-1/4 h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
            <div className="absolute bottom-1/3 left-1/2 h-3 w-3 rounded-full bg-destructive shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
