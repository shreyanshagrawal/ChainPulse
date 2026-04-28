import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Weather", events: 24, color: "hsl(var(--blue-500))" },
  { name: "Traffic", events: 45, color: "hsl(var(--amber-500))" },
  { name: "Customs", events: 18, color: "hsl(var(--purple-500))" },
  { name: "Port Strike", events: 8, color: "hsl(var(--destructive))" },
  { name: "Shortage", events: 12, color: "hsl(var(--emerald-500))" },
];

export function DisruptionFrequencyChart() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Disruption Frequency Analytics</CardTitle>
          <CardDescription>Historical cause breakdown of supply chain delays.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} width={80} />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--secondary))', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                />
                <Bar dataKey="events" radius={[0, 4, 4, 0]} barSize={24}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || "hsl(var(--primary))"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
