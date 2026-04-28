import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Activity, Info, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function AlertCard({ alert, onMarkAsRead }) {
  const isCritical = alert.type === "critical";
  const isWarning = alert.type === "warning";
  
  const handleMarkAsRead = () => {
    onMarkAsRead(alert.id);
    toast.success("Alert resolved", {
      description: "This alert has been marked as read and archived.",
    });
  };

  const getIcon = () => {
    if (isCritical) return <AlertTriangle className="h-5 w-5" />;
    if (isWarning) return <Activity className="h-5 w-5" />;
    return <Info className="h-5 w-5" />;
  };

  const getStyles = () => {
    if (isCritical) return "border-destructive/30 bg-destructive/5 text-destructive";
    if (isWarning) return "border-amber-500/30 bg-amber-500/5 text-amber-500";
    return "border-blue-500/20 bg-blue-500/5 text-blue-500";
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
      <Card className={`relative overflow-hidden transition-all ${alert.read ? "opacity-60 grayscale-[0.5]" : "shadow-sm"} ${getStyles()}`}>
        {isCritical && !alert.read && (
          <div className="absolute top-0 left-0 w-1 h-full bg-destructive animate-pulse" />
        )}
        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-4 items-start">
            <div className={`p-3 rounded-full shrink-0 ${
              isCritical ? "bg-destructive/20" : isWarning ? "bg-amber-500/20" : "bg-blue-500/20"
            }`}>
              {getIcon()}
            </div>
            <div className="space-y-1 mt-1">
              <div className="flex items-center gap-2">
                <Badge variant={isCritical ? "destructive" : isWarning ? "secondary" : "outline"} className="uppercase text-[10px] tracking-wider font-bold">
                  {alert.type}
                </Badge>
                <span className="text-xs text-muted-foreground font-medium">{alert.time}</span>
              </div>
              <p className={`text-sm sm:text-base ${alert.read ? "text-muted-foreground" : "text-foreground font-medium"}`}>
                {alert.message}
              </p>
            </div>
          </div>
          
          {!alert.read && (
            <Button variant="outline" size="sm" onClick={handleMarkAsRead} className="w-full sm:w-auto mt-2 sm:mt-0 bg-background/50 hover:bg-background shrink-0">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark as Read
            </Button>
          )}
          {alert.read && (
            <div className="flex items-center text-xs text-muted-foreground bg-background/50 px-3 py-1.5 rounded-full mt-2 sm:mt-0">
              <CheckCircle2 className="mr-1.5 h-3 w-3" /> Resolved
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
