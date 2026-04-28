import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Clock, MapPin, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export function ShipmentTimeline({ isCritical }) {
  const events = [
    { title: "Order Processed", time: "Oct 12, 08:00 AM", status: "completed", icon: CheckCircle2 },
    { title: "Departed Origin Facility", time: "Oct 13, 10:30 AM", status: "completed", icon: CheckCircle2 },
    { title: "Arrived at Port", time: "Oct 15, 02:15 PM", status: "completed", icon: CheckCircle2 },
    { title: "Customs Clearance", time: "Oct 16, 09:00 AM", status: isCritical ? "warning" : "completed", icon: isCritical ? AlertCircle : CheckCircle2, desc: isCritical ? "Held up due to port congestion." : "" },
    { title: "In Transit to Destination", time: "Pending", status: isCritical ? "pending-critical" : "pending", icon: isCritical ? Clock : Clock },
    { title: "Expected Delivery", time: isCritical ? "Unknown" : "Oct 20", status: "pending", icon: MapPin },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Shipment Timeline</CardTitle>
          <CardDescription>Historical tracking and predicted future nodes.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {events.map((event, index) => (
              <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow ${
                  event.status === "completed" ? "bg-primary text-primary-foreground" :
                  event.status === "warning" ? "bg-amber-500 text-primary-foreground" :
                  event.status === "pending-critical" ? "bg-destructive text-destructive-foreground animate-pulse" :
                  "bg-secondary text-muted-foreground"
                }`}>
                  <event.icon className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-bold ${event.status === "warning" ? "text-amber-500" : event.status === "pending-critical" ? "text-destructive" : ""}`}>{event.title}</h4>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{event.time}</div>
                  {event.desc && <div className="text-sm text-muted-foreground mt-2">{event.desc}</div>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
