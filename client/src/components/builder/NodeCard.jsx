import { Card, CardContent } from "@/components/ui/card";
import { Factory, PackageOpen, Store, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function NodeCard({ type, name, location, onRemove }) {
  const getIcon = () => {
    if (type === "supplier") return <PackageOpen className="h-4 w-4 text-emerald-500" />;
    if (type === "factory") return <Factory className="h-4 w-4 text-blue-500" />;
    return <Store className="h-4 w-4 text-purple-500" />;
  };

  const getBorderColor = () => {
    if (type === "supplier") return "border-emerald-500/20";
    if (type === "factory") return "border-blue-500/20";
    return "border-purple-500/20";
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}>
      <Card className={`relative overflow-hidden ${getBorderColor()} shadow-sm group`}>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={onRemove}>
            <X className="h-3 w-3" />
          </Button>
        </div>
        <CardContent className="p-4 flex items-start gap-3">
          <div className="p-2 bg-secondary rounded-md shrink-0">
            {getIcon()}
          </div>
          <div className="space-y-1 overflow-hidden">
            <h4 className="font-semibold text-sm truncate pr-4">{name}</h4>
            <p className="text-xs text-muted-foreground truncate">{location}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
