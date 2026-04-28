import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Truck, PhoneCall, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function RecommendedActions({ isCritical }) {
  if (!isCritical) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="h-full">
        <Card className="h-full border-emerald-500/20 bg-emerald-500/5">
          <CardHeader>
            <CardTitle className="text-emerald-500 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" /> All Systems Nominal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No manual intervention required. The shipment is progressing normally according to predictions.</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="h-full">
      <Card className="h-full border-destructive/30 shadow-sm">
        <CardHeader className="bg-destructive/5 border-b pb-4">
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Zap className="h-5 w-5" /> AI Mitigation Actions
          </CardTitle>
          <CardDescription>Recommended steps to resolve the critical delay.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="p-4 border border-amber-500/30 bg-amber-500/5 rounded-lg space-y-3">
            <h4 className="font-semibold text-sm">Action 1: Reroute via Air Freight</h4>
            <p className="text-xs text-muted-foreground">Bypass port congestion by shifting critical cargo to air transport. Estimated cost increase: 15%.</p>
            <Button size="sm" className="w-full bg-amber-500 hover:bg-amber-600 text-white">
              <Truck className="h-4 w-4 mr-2" /> Execute Reroute
            </Button>
          </div>
          <div className="p-4 border rounded-lg space-y-3">
            <h4 className="font-semibold text-sm">Action 2: Contact Supplier</h4>
            <p className="text-xs text-muted-foreground">Request partial shipment delivery or alternative sourcing options.</p>
            <Button variant="outline" size="sm" className="w-full">
              <PhoneCall className="h-4 w-4 mr-2" /> Open Comms Channel
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
