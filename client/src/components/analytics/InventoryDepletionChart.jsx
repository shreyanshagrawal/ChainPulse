import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const data = [
  { day: "Day 1", stock: 100, buffer: 20 },
  { day: "Day 3", stock: 85, buffer: 20 },
  { day: "Day 5", stock: 60, buffer: 20 },
  { day: "Day 7", stock: 45, buffer: 20 },
  { day: "Day 9", stock: 20, buffer: 20 }, // Hits buffer
  { day: "Day 11", stock: 5, buffer: 20 },  // Critical shortage
  { day: "Day 14", stock: 0, buffer: 20 },
];

export function InventoryDepletionChart() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Inventory Depletion Forecast</CardTitle>
          <CardDescription>Predicted stock out for Critical Warehouse B (LA).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBuffer" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                />
                <Area type="monotone" dataKey="stock" name="Predicted Stock" stroke="#34d399" fillOpacity={1} fill="url(#colorStock)" strokeWidth={2} />
                <Area type="monotone" dataKey="buffer" name="Critical Buffer" stroke="#f87171" fillOpacity={1} fill="url(#colorBuffer)" strokeWidth={2} strokeDasharray="3 3" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
