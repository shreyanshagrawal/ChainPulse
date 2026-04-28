import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

const data = [
  { subject: "On-Time", Alpha: 98, Metro: 85, North: 45, fullMark: 100 },
  { subject: "Quality", Alpha: 95, Metro: 90, North: 65, fullMark: 100 },
  { subject: "Communication", Alpha: 90, Metro: 80, North: 50, fullMark: 100 },
  { subject: "Cost", Alpha: 85, Metro: 75, North: 80, fullMark: 100 },
  { subject: "Compliance", Alpha: 100, Metro: 95, North: 70, fullMark: 100 },
];

export function SupplierReliabilityChart() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Supplier Reliability Comparison</CardTitle>
          <CardDescription>Multi-dimensional analysis of vendor performance.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                />
                <Radar name="Alpha Logistics" dataKey="Alpha" stroke="#34d399" fill="#34d399" fillOpacity={0.25} />
                <Radar name="North Freight" dataKey="North" stroke="#f87171" fill="#f87171" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
