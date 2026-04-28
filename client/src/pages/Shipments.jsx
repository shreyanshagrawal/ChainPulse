import { useSimulation } from "@/context/SimulationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShipmentMap } from "@/components/dashboard/ShipmentMap";

export default function Shipments() {
  const { shipments } = useSimulation();

  const locations = {
    "Shanghai": [31.2304, 121.4737],
    "Los Angeles": [34.0522, -118.2437],
    "Berlin": [52.5200, 13.4050],
    "London": [51.5074, -0.1278],
    "Mumbai": [19.0760, 72.8777],
    "New York": [40.7128, -74.0060]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Active Shipments Map</h1>
        <p className="text-muted-foreground">Track all active and past shipments globally.</p>
      </div>

      <Card className="overflow-hidden">
        <div className="h-[400px] w-full relative z-0">
          <ShipmentMap shipments={shipments} />
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shipment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shipment ID</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead className="text-right">ETA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-medium">{shipment.id}</TableCell>
                  <TableCell>{shipment.source} → {shipment.destination}</TableCell>
                  <TableCell>
                    <Badge variant={shipment.status === "Delayed" ? "destructive" : shipment.status === "At Risk" ? "destructive" : "secondary"}>
                      {shipment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      shipment.risk === "Critical" ? "border-destructive text-destructive" :
                      shipment.risk === "Medium" ? "border-amber-500 text-amber-500" :
                      "border-emerald-500 text-emerald-500"
                    }>
                      {shipment.risk}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{shipment.eta}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
