import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowUpDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ActiveShipmentsTable({ shipments }) {
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedShipments = [...shipments].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const filteredShipments = sortedShipments.filter(s => 
    s.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskColor = (risk) => {
    if (risk === "Critical") return "border-destructive text-destructive bg-destructive/10";
    if (risk === "Medium") return "border-amber-500 text-amber-500 bg-amber-500/10";
    return "border-emerald-500 text-emerald-500 bg-emerald-500/10";
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="lg:col-span-full">
      <Card className="border-border">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4">
          <div>
            <CardTitle>Active Shipments Tracking</CardTitle>
            <CardDescription>Real-time monitoring of all global freight movements.</CardDescription>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter shipments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-secondary/50 border-transparent focus-visible:ring-1 transition-all"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[120px]">
                    <Button variant="ghost" onClick={() => handleSort("id")} className="font-semibold -ml-4 hover:bg-transparent flex items-center gap-1">
                      Shipment ID <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("source")} className="font-semibold -ml-4 hover:bg-transparent flex items-center gap-1">
                      Source <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("destination")} className="font-semibold -ml-4 hover:bg-transparent flex items-center gap-1">
                      Destination <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("eta")} className="font-semibold -ml-4 hover:bg-transparent flex items-center gap-1">
                      ETA <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="w-[150px]">
                    <Button variant="ghost" onClick={() => handleSort("delayProbability")} className="font-semibold -ml-4 hover:bg-transparent flex items-center gap-1">
                      Delay Prob. <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("risk")} className="font-semibold -ml-4 hover:bg-transparent flex items-center gap-1">
                      Risk Level <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right pr-6">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShipments.map((shipment) => (
                  <TableRow key={shipment.id} className="group transition-colors">
                    <TableCell className="font-medium pl-6">{shipment.id}</TableCell>
                    <TableCell className="text-muted-foreground">{shipment.source}</TableCell>
                    <TableCell className="text-foreground">{shipment.destination}</TableCell>
                    <TableCell>{shipment.eta}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-xs w-6">{shipment.delayProbability}%</span>
                        <Progress 
                          value={shipment.delayProbability} 
                          className="h-1.5 w-16" 
                          indicatorColor={shipment.delayProbability > 70 ? "bg-destructive" : shipment.delayProbability > 30 ? "bg-amber-500" : "bg-emerald-500"} 
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getRiskColor(shipment.risk)} font-semibold uppercase tracking-wider text-[10px]`}>
                        {shipment.risk}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Badge variant={shipment.status === "Delayed" || shipment.status === "At Risk" ? "destructive" : "secondary"}>
                        {shipment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredShipments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      No shipments found matching your criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
