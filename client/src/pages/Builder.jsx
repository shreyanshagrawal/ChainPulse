import { useState } from "react";
import { BuilderVisualizer } from "@/components/builder/BuilderVisualizer";
import { NodeCard } from "@/components/builder/NodeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, PackageOpen, Factory, Store } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function Builder() {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: "Alpha Raw Materials", location: "Shanghai, CN" },
    { id: 2, name: "TechParts Inc", location: "Shenzhen, CN" }
  ]);
  const [factories, setFactories] = useState([
    { id: 1, name: "Assembly Plant Alpha", location: "Mumbai, IN" }
  ]);
  const [warehouses, setWarehouses] = useState([
    { id: 1, name: "Whse B (LA)", location: "Los Angeles, USA" },
    { id: 2, name: "Whse EU (Berlin)", location: "Berlin, DE" }
  ]);

  const [newInputs, setNewInputs] = useState({ supplier: "", factory: "", warehouse: "" });

  const handleAdd = (type) => {
    const name = newInputs[type];
    if (!name.trim()) return;

    const newNode = { id: Date.now(), name, location: "New Location" };
    
    if (type === "supplier") setSuppliers([...suppliers, newNode]);
    if (type === "factory") setFactories([...factories, newNode]);
    if (type === "warehouse") setWarehouses([...warehouses, newNode]);

    setNewInputs({ ...newInputs, [type]: "" });
  };

  const handleRemove = (type, id) => {
    if (type === "supplier") setSuppliers(suppliers.filter(n => n.id !== id));
    if (type === "factory") setFactories(factories.filter(n => n.id !== id));
    if (type === "warehouse") setWarehouses(warehouses.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Supply Chain Builder</h1>
        <p className="text-muted-foreground">Architect and map your global operational dependencies.</p>
      </div>

      <BuilderVisualizer suppliers={suppliers} factories={factories} warehouses={warehouses} />

      <div className="grid gap-6 md:grid-cols-3">
        {/* Suppliers Column */}
        <Card className="border-border/50 bg-secondary/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <PackageOpen className="h-5 w-5 text-emerald-500" /> Suppliers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Input 
                placeholder="New Supplier..." 
                value={newInputs.supplier}
                onChange={(e) => setNewInputs({ ...newInputs, supplier: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleAdd("supplier")}
              />
              <Button size="icon" variant="secondary" onClick={() => handleAdd("supplier")}><Plus className="h-4 w-4" /></Button>
            </div>
            <div className="space-y-3">
              <AnimatePresence>
                {suppliers.map(node => (
                  <NodeCard key={node.id} type="supplier" name={node.name} location={node.location} onRemove={() => handleRemove("supplier", node.id)} />
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        {/* Factories Column */}
        <Card className="border-border/50 bg-secondary/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Factory className="h-5 w-5 text-blue-500" /> Factories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Input 
                placeholder="New Factory..." 
                value={newInputs.factory}
                onChange={(e) => setNewInputs({ ...newInputs, factory: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleAdd("factory")}
              />
              <Button size="icon" variant="secondary" onClick={() => handleAdd("factory")}><Plus className="h-4 w-4" /></Button>
            </div>
            <div className="space-y-3">
              <AnimatePresence>
                {factories.map(node => (
                  <NodeCard key={node.id} type="factory" name={node.name} location={node.location} onRemove={() => handleRemove("factory", node.id)} />
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        {/* Warehouses Column */}
        <Card className="border-border/50 bg-secondary/5">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Store className="h-5 w-5 text-purple-500" /> Warehouses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Input 
                placeholder="New Warehouse..." 
                value={newInputs.warehouse}
                onChange={(e) => setNewInputs({ ...newInputs, warehouse: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleAdd("warehouse")}
              />
              <Button size="icon" variant="secondary" onClick={() => handleAdd("warehouse")}><Plus className="h-4 w-4" /></Button>
            </div>
            <div className="space-y-3">
              <AnimatePresence>
                {warehouses.map(node => (
                  <NodeCard key={node.id} type="warehouse" name={node.name} location={node.location} onRemove={() => handleRemove("warehouse", node.id)} />
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
