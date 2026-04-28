import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export function DelayPrediction({ delayProbability }) {
  const isHighRisk = delayProbability > 50;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg">AI Delay Prediction</CardTitle>
          <CardDescription>Probability of missing the delivery window.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center py-6">
          <div className="relative flex items-center justify-center w-32 h-32 mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="60" fill="transparent" stroke="hsl(var(--secondary))" strokeWidth="8" />
              <motion.circle 
                cx="64" cy="64" r="60" fill="transparent" 
                stroke={isHighRisk ? "hsl(var(--destructive))" : "hsl(var(--emerald-500))"} 
                strokeWidth="8" strokeDasharray="377" 
                initial={{ strokeDashoffset: 377 }}
                animate={{ strokeDashoffset: 377 - (377 * delayProbability) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-bold">{delayProbability}%</span>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground px-4">
            {isHighRisk 
              ? "High probability of delay detected due to recent compounding external events."
              : "Shipment is currently tracking to arrive on schedule with minimal risk factors."}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
