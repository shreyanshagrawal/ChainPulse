import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

export function HealthScoreCard({ healthScore }) {
  const healthData = [
    { name: "Health", value: healthScore },
    { name: "Risk", value: 100 - healthScore }
  ];
  
  let statusText = "Healthy";
  let statusColor = "#10b981"; // emerald-500
  let textColorClass = "text-emerald-500";

  if (healthScore < 50) {
    statusText = "Critical";
    statusColor = "#ef4444"; // red-500
    textColorClass = "text-destructive";
  } else if (healthScore < 75) {
    statusText = "Warning";
    statusColor = "#f59e0b"; // amber-500
    textColorClass = "text-amber-500";
  }
  
  const COLORS = [statusColor, "hsl(var(--secondary))"];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="flex flex-col items-center justify-center p-6 relative overflow-hidden h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0" />
        <div className="z-10 text-center w-full flex flex-col items-center">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Global Health Score</h3>
          <div className="h-36 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={healthData}
                  cx="50%"
                  cy="100%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                  animationDuration={1000}
                >
                  {healthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={healthScore}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-5xl font-bold tracking-tighter"
                >
                  {healthScore}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <motion.div 
            key={statusText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-4 font-semibold text-sm uppercase tracking-wider ${textColorClass}`}
          >
            System Status: {statusText}
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
