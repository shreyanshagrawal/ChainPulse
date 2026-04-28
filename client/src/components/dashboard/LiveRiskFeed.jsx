import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function LiveRiskFeed({ alerts }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Live Risk Feed</span>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto max-h-[350px] pr-4 space-y-4 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div 
              key={alert.id} 
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, scale: 0.9, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start space-x-4 border-b pb-4 last:border-0 last:pb-0 ${alert.type === 'critical' ? 'bg-destructive/10 -mx-2 px-2 py-2 rounded-md border-b-0 mb-2' : ''}`}
            >
              <div className={`mt-0.5 p-2 rounded-full ${
                alert.type === "critical" ? "bg-destructive/20 text-destructive" :
                alert.type === "warning" ? "bg-amber-500/20 text-amber-500" :
                "bg-blue-500/20 text-blue-500"
              }`}>
                {alert.type === "critical" ? <AlertTriangle className="h-4 w-4" /> : 
                 alert.type === "warning" ? <Activity className="h-4 w-4" /> : 
                 <Info className="h-4 w-4" />}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant={alert.type === "critical" ? "destructive" : alert.type === "warning" ? "secondary" : "outline"} className="text-[10px] uppercase tracking-wider font-bold">
                    {alert.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-medium">{alert.time}</span>
                </div>
                <p className={`text-sm leading-snug pt-1 ${alert.type === 'critical' ? 'font-semibold text-foreground' : 'text-foreground/80'}`}>
                  {alert.message}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
